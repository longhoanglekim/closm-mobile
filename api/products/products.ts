import firestore from "@react-native-firebase/firestore";

const db = firestore();

export const addProduct = async (product: {
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock: number;
  rating: number;
}): Promise<string> => {
  try {
    const docRef = await db.collection("products").add(product);
    console.log("Sản phẩm đã được thêm với ID:", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Lỗi khi thêm sản phẩm:", e);
    throw e;
  }
};
export const getCategories = async () => {
  const response = await fetch("http://192.168.69.53:8080/product/categories");
  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh mục sản phẩm");
  }
  return response.json();
};
export const getProductOverview = async () => {
  const response = await fetch("http://192.168.69.53:8080/variants/product_overview");
  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh mục sản phẩm");
  }
  return response.json();
};