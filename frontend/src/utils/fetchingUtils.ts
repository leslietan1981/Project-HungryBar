export const endpoints = {
  getCategories: "/api/categories",
  getProducts: "/api/products",
  submitOrder: "/api/orders",
  getNotes: "/api/notes",
  getOptions: "/api/options",
  addProduct: "/api/products",
  getProduct: "/api/products",
  updateProduct: "/api/products",
  deleteProduct: "/api/products",
  adminLogin: "/api/login",
  adminRegister: "/api/register",
  getOrders: "/api/orders",
};

export const getBearerHeader = (token: string | null) => {
  return { Authorization: "Bearer " + token };
};

export const sharedFetch = () => {
  const fetchData = async (
    endpoint: string,
    method: string,
    { auth, body }: { auth?: Record<string, string>; body?: any },
  ) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      if (auth) Object.assign(headers, auth);

      const res = await fetch(import.meta.env.VITE_SERVER + endpoint, {
        method,
        headers,
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data?.message) {
          if (Array.isArray(data.message)) {
            console.error("Array(data.message)", data.message[0].message);
            return {
              status: res.status,
              ok: false,
              message: data.message[0].message,
            };
          } else {
            console.error("data.message", data.message);
            return { status: res.status, ok: false, message: data.message };
          }
        } else {
          console.error("final", data);
          return {
            status: res.status,
            ok: false,
            message: "an unknown error has occurred, please try again later",
          };
        }
      }

      return { status: res.status, ok: true, data: data };
    } catch (error: unknown) {
      return { ok: false, message: "data error" };
    }
  };

  return fetchData;
};
