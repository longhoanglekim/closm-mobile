const apiUrl = process.env.EXPO_PUBLIC_API_URL;



// Lấy tất cả item (variant) theo category
export const getAllItemsByCategory = async (category: string) => {
  const res = await fetch(`${apiUrl}/products/items?category=${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error("Lỗi khi lấy các item theo category");
  return res.json();
};

// Tạo base product (ADMIN)
export const createBaseProduct = async (baseProductInput: any, token: string) => {
  const res = await fetch(`${apiUrl}/products/create-base-product`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(baseProductInput),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// Sửa base product (ADMIN)
export const updateBaseProduct = async (id: number, baseProductInput: any, token: string) => {
  const res = await fetch(`${apiUrl}/products/update-base-product/${id}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(baseProductInput),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

// Xóa base product (ADMIN)
export const deleteBaseProduct = async (id: number, token: string) => {
  const res = await fetch(`${apiUrl}/products/delete-base-product/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};
// 2. ----------- PRODUCT ITEM (VARIANT) CONTROLLER -----------


// Lấy chi tiết một item (biến thể) theo id
export const getVariantDetails = async (id: number) => {
  const res = await fetch(`${apiUrl}/items/${id}`);
  if (!res.ok) throw new Error("Lỗi khi lấy chi tiết biến thể");
  return res.json();
};



// POST /items/create-item
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


// PUT /items/update-item/{id}
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


// DELETE /items/delete-item/{id}
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

