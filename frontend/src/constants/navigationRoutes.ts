type NavSectionInput = { [key: string]: string | NavSectionInput };

type NavSectionBase = {
  index: string;
  parent: string;
};

type FullPaths<T> = NavSectionBase & {
  [K in keyof T as T[K] extends string ? K : never]: string;
};

type NavSection<T extends NavSectionInput = NavSectionInput> = {
  [K in keyof T]: T[K] extends string ? T[K] : T[K] extends NavSectionInput ? NavSection<T[K]> : never;
} & NavSectionBase & {
    full: FullPaths<T>;
  };

const createNavSection = <T extends NavSectionInput>(basePath: string, section: T): NavSection<T> => {
  const ownSegment = basePath.split("/").filter(Boolean).pop() ?? "";
  const relativeParent = ownSegment ? `/${ownSegment}/*` : "/*";
  const result = { index: "/", parent: relativeParent } as any;
  const full = {} as any;

  for (const [key, value] of Object.entries(section)) {
    if (typeof value === "object" && value !== null) {
      result[key] = createNavSection(`${basePath}/${key}`, value);
    } else {
      result[key] = value;
      full[key] = basePath + value;
    }
  }
  full.index = basePath + result.index;
  full.parent = basePath + "/*";

  result.full = full;
  return result as NavSection<T>;
};

export const NAV_ROUTES = createNavSection("", {
  guest: {
    splash: "/splash",
    home: "/home",
    cart: "/cart",
  },
  staff: {
    orders_active: "/orders/active",
    orders_history: "/orders/history",
  },
  admin: {
    products: "/products",
    users: {
      members: "/members",
      staff: "/staff",
      admins: "/admins",
    },
  },
});
