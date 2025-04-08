


export const getCategories = async () => {
<<<<<<< HEAD
  const response = await fetch("http://172.23.64.1:8080/products/categories");

=======
  const response = await fetch("http://192.168.69.38:8080/products/categories");
>>>>>>> ba40067453ad99a9ed1bdccbe794e6717b0d429f
  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh mục sản phẩm");
  }
  return response.json();
};

export const getProductOverview = async () => {

<<<<<<< HEAD
  const response = await fetch("http://172.23.64.1:8080/products/overview");
=======
  const response = await fetch("http://172.23.112.1:8080/products/overview");
>>>>>>> ba40067453ad99a9ed1bdccbe794e6717b0d429f
  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh mục sản phẩm");
  }
  return response.json();
};


export const getProductDetails = async () => {
<<<<<<< HEAD
  const response = await fetch("http://172.23.64.1:8080/products/details");
=======
  const response = await fetch("http://172.23.112.1:8080/products/details");
>>>>>>> ba40067453ad99a9ed1bdccbe794e6717b0d429f
  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh mục sản phẩm");
  }
  return response.json();
};