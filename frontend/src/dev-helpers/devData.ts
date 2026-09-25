import type { CategoryResponse } from "../types/api/category.types.ts";
import type { OrderItemResponse, OrderResponse } from "../types/api/order.types.ts";
import type { ProductOptionResponse, ProductResponse } from "../types/api/product.types.ts";
import type { UserResponse } from "../types/api/user.types.ts";
import { toFixLength } from "../utils/formatUtils.ts";

export const sample_img = "https://res.cloudinary.com/dgxtlldpx/image/upload/v1781661891/category-sample-1.jpg";

export const dev_categories: CategoryResponse[] = [
  {
    category: "Promotional",
    icon_id: "hot",
  },
  {
    category: "Mains",
    icon_id: "mains",
  },
  {
    category: "Meats",
    icon_id: "meat",
  },
  {
    category: "Seafood",
    icon_id: "fish",
  },
  {
    category: "Vegetables",
    icon_id: "veg",
  },
  {
    category: "Sides",
    icon_id: "sides",
  },
  {
    category: "Beverages",
    icon_id: "beverage",
  },
];

export const dev_productOptions: ProductOptionResponse[] = [
  {
    option_id: 1,
    description: "Add option 1",
    price: 1,
  },
  {
    option_id: 2,
    description: "Add option 2",
    price: 1.5,
  },
  {
    option_id: 3,
    description: "Add option 3",
    price: 2,
  },
];

const generateProducts = (): ProductResponse[] => {
  const image_url = undefined;
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const note = "Meat, Nuts, Milk";

  const results: ProductResponse[] = [];
  const min = 3;
  const max = 5;
  let i = 1;

  const getRandomDescription = () => {
    if (!description) return "No description";
    const words = description?.split(" ");
    const endIndx = Math.floor(words.length / 2) + Math.random() * 0.5 * words.length;
    return words.toSpliced(0, endIndx - 1).join(" ");
  };

  for (const { category } of dev_categories) {
    const total = Math.floor(Math.random() * (max - min) + (max - min));

    for (let j = 0; j < total; j++) {
      results.push({
        id: i,
        name: `Product ${i}`,
        image_url,
        category,
        description: getRandomDescription(),
        note,
        options: dev_productOptions,
        price: Math.floor(Math.random() * 200 + 100) / 10,
      });
      i++;
    }
  }

  return results;
};

export const dev_products: ProductResponse[] = generateProducts();

const dev_generateOrders = (): OrderResponse[] => {
  const seedingCount = Math.floor(Math.random() * 9) + 2;
  const results: OrderResponse[] = [];

  for (let i = 0; i < seedingCount; i++) {
    const items: OrderItemResponse[] = [];
    const itemCount = Math.floor(Math.random() * 3) + 4;
    for (let j = 0; j < itemCount; j++) {
      items.push({
        item_id: `${j}`,
        name: `Product ${j}`,
        options: dev_productOptions,
        quantity: Math.ceil(Math.random() * 4),
        price: 12.9,
        is_served: Math.random() < 0.5,
      });
    }
    results.push({
      id: i,
      table: String(Math.ceil(Math.random() * 10)),
      created_at: "14:45",
      order_status: "new",
      items,
    });
  }
  return results;
};

export const dev_orders: OrderResponse[] = dev_generateOrders();

const dev_generateUsers = (role: string): UserResponse[] => {
  const seedingCount = Math.floor(Math.random() * 9) + 2;
  const results: UserResponse[] = [];

  for (let i = 0; i < seedingCount; i++) {
    results.push({
      id: `${role.charAt(0)}${toFixLength(i, 4)}`,
      name: `User${i + 1}`,
      role,
      email: `user${i + 1}@hungrybar.com`,
      created_at: "2026-09-24",
      updated_at: "2026-09-24",
      last_login_at: "Fri 18 Sep 2026",
    });
  }
  return results;
};

export const dev_users_staff: UserResponse[] = dev_generateUsers("Staff");

export const dev_users_admins: UserResponse[] = dev_generateUsers("Admin");
