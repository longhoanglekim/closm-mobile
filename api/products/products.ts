


export const getCategories = async () => {
<<<<<<< HEAD
  const response = await fetch("http://172.23.64.1:8080/product/categories");
=======
  const response = await fetch("http://172.23.112.1:8080/products/categories");
>>>>>>> 29c1c6d6997a87723af3f2da0f718c28c56bac21
  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh mục sản phẩm");
  }
  return response.json();
};

export const getProductOverview = async () => {
<<<<<<< HEAD
  const response = await fetch("http://172.23.64.1:8080/variants/product_overview");
=======
  const response = await fetch("http://172.23.112.1:8080/products/overview");
  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh mục sản phẩm");
  }
  return response.json();
};


export const getProductDetails = async () => {
  const response = await fetch("http://172.23.112.1:8080/products/details");
>>>>>>> 29c1c6d6997a87723af3f2da0f718c28c56bac21
  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh mục sản phẩm");
  }
  return response.json();
};