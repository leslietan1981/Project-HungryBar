type NavSectionInput = Record<string, string | NavSection<any>> & { index: string; parent: string };

type FullPaths<T extends NavSectionInput> = {
  [K in keyof T as K extends "parent" ? never : T[K] extends string ? K : never]: string;
};

type NavSection<T extends NavSectionInput = NavSectionInput> = T & {
  full: FullPaths<T>;
};

interface NavRoutesShape {
  index: string;
  guest: NavSection<any>;
  staff: NavSection<any>;
  admin: NavSection<any>;
}

const createNavSection = <T extends NavSectionInput>(section: T): NavSection<T> => {
  const base = section.parent.replace(/\/\*$/, "");

  const full = Object.fromEntries(
    Object.entries(section)
      .filter((entry): entry is [string, string] => entry[0] !== "parent" && typeof entry[1] === "string")
      .map(([key, value]) => [key, base + value]),
  ) as FullPaths<T>;

  return { ...section, full };
};

export const NAV_ROUTES = {
  index: "/",
  guest: createNavSection({
    parent: "/guest/*",
    index: "/",
    splash: "/splash",
    home: "/home",
    cart: "/cart",
  }),
  staff: createNavSection({
    parent: "/staff/*",
    index: "/",
    orders_active: "/orders/active",
    orders_history: "/orders/history",
  }),
  admin: createNavSection({
    parent: "/admin/*",
    index: "/",
    products: "/products",
    users: createNavSection({
      parent: "/admin/users/*",
      index: "/",
      members: "/members",
      staff: "/staff",
      admins: "/admins",
    }),
  }),
} satisfies NavRoutesShape;
