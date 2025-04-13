
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
console.log(apiUrl);
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


export const getVariantListByName = async (name: string) => {
  const response = await fetch(`${apiUrl}/variants?variantName=${encodeURIComponent(name)}`);
  console.log(`${apiUrl}/variants?variantName=${name}`);

  if (!response.ok) {
    throw new Error("Lỗi khi lấy tag sản phẩm");
  }

  const data = await response.json();
  console.log("Successfully fetched tag variants:");
  return data;
};