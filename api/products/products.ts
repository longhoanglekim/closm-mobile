
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
console.log("API URL:", apiUrl);
export const getCategories = async () => {
  const response = await fetch(`${apiUrl}/products/categories`);

  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh mục sản phẩm");
  }
  return response.json();
};

export const getProductOverview = async () => {

  const response = await fetch(`${apiUrl}/products/overview`);



  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh mục sản phẩm");
  }
  return response.json();
};


export const getProductDetails = async () => {
  const response = await fetch(`${apiUrl}/products/details`);

  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh mục sản phẩm");
  }
  return response.json();
};