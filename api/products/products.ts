
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
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


export const getVariantListByName = async (name : string) => {
  const response = await fetch(`${apiUrl}/variants?variantName=${name}`);

  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh mục sản phẩm");
  }
  return response.json();
};