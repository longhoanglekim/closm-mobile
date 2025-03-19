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
