// src/api/productApi.ts

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const getAllCategories = async (): Promise<string[]> => {
  const res = await fetch(`${apiUrl}/products/categories`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Lỗi khi lấy danh sách category");
  }
  return res.json();
};

export const getAllItemsByCategory = async (category: string): Promise<any[]> => {
  const res = await fetch(
    `${apiUrl}/products/items?category=${encodeURIComponent(category)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Lỗi khi lấy các item theo category");
  }
  return res.json();
};

export const createBaseProduct = async (
  baseProductInput: { category: string; imageUrl: string },
  token: string
): Promise<number> => {
  const res = await fetch(`${apiUrl}/products/create-base-product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(baseProductInput),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Lỗi khi tạo Base Product");
  }

  const newId: number = await res.json();
  return newId;
};

export const updateBaseProduct = async (
  id: number,
  baseProductInput: { category?: string; imageUrl?: string },
  token: string
): Promise<number> => {
  const res = await fetch(`${apiUrl}/products/update-base-product/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(baseProductInput),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Lỗi khi cập nhật Base Product với ID = ${id}`);
  }
  const updatedId: number = await res.json();
  return updatedId;
};

export const deleteBaseProduct = async (
  id: number,
  token: string
): Promise<number> => {
  const res = await fetch(`${apiUrl}/products/delete-base-product/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Lỗi khi xóa Base Product với ID = ${id}`);
  }
  const deletedId: number = await res.json();
  return deletedId;
};



// 2. ----------- PRODUCT ITEM (VARIANT) CONTROLLER -----------


export const getVariantDetails = async (id: number) => {
  const res = await fetch(`${apiUrl}/items/${id}`);
  if (!res.ok) throw new Error("Lỗi khi lấy chi tiết biến thể");
  return res.json();
};



export const createItem = async (productItemInfo: any, token: string) => {
  const res = await fetch(`${apiUrl}/items/create-item`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(productItemInfo),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};



export const updateItem = async (id: number, productItemInfo: any, token: string) => {
  const res = await fetch(`${apiUrl}/items/update-item/${id}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(productItemInfo),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};



export const deleteItem = async (id: number, token: string) => {
  const res = await fetch(`${apiUrl}/items/delete-item/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};


