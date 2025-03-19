import React from "react";
import { View, Button, Alert } from "react-native";
import { addProduct } from "@/api/products/products"; // Kiểm tra đường dẫn import

const AddProductButton = () => {
  const handleAddProduct = async () => {
    const newProducts = [
      {
        name: "Nike Air Max 90",
        price: 120,
        category: "Shoes",
        image: "https://your-image-url.com/nike_air_max_90.jpg",
        description: "Giày thể thao Nike Air Max 90 chính hãng.",
        stock: 20,
        rating: 4.5,
      },
      {
        name: "Adidas Ultraboost",
        price: 180,
        category: "Shoes",
        image: "https://your-image-url.com/adidas_ultraboost.jpg",
        description: "Giày chạy bộ Adidas Ultraboost với công nghệ Boost.",
        stock: 15,
        rating: 4.8,
      },
      {
        name: "iPhone 15 Pro",
        price: 1099,
        category: "Smartphones",
        image: "https://your-image-url.com/iphone_15_pro.jpg",
        description: "Điện thoại iPhone 15 Pro mới nhất của Apple.",
        stock: 10,
        rating: 4.9,
      },
      {
        name: "Samsung Galaxy S23",
        price: 999,
        category: "Smartphones",
        image: "https://your-image-url.com/galaxy_s23.jpg",
        description: "Điện thoại Samsung Galaxy S23 với màn hình Dynamic AMOLED.",
        stock: 12,
        rating: 4.7,
      },
      {
        name: "MacBook Air M2",
        price: 1199,
        category: "Laptops",
        image: "https://your-image-url.com/macbook_air_m2.jpg",
        description: "Laptop MacBook Air M2 với thiết kế siêu mỏng nhẹ.",
        stock: 8,
        rating: 4.9,
      },
      {
        name: "Dell XPS 13",
        price: 1299,
        category: "Laptops",
        image: "https://your-image-url.com/dell_xps_13.jpg",
        description: "Laptop Dell XPS 13 với màn hình 4K UHD.",
        stock: 5,
        rating: 4.6,
      },
      {
        name: "Sony WH-1000XM5",
        price: 399,
        category: "Headphones",
        image: "https://your-image-url.com/sony_xm5.jpg",
        description: "Tai nghe chống ồn Sony WH-1000XM5, âm thanh chất lượng cao.",
        stock: 20,
        rating: 4.6,
      },
      {
        name: "Apple Watch Series 9",
        price: 499,
        category: "Watches",
        image: "https://your-image-url.com/apple_watch_9.jpg",
        description: "Apple Watch Series 9 với nhiều tính năng theo dõi sức khỏe.",
        stock: 18,
        rating: 4.8,
      },
      {
        name: "Rolex Submariner",
        price: 7999,
        category: "Watches",
        image: "https://your-image-url.com/rolex_submariner.jpg",
        description: "Đồng hồ cao cấp Rolex Submariner.",
        stock: 2,
        rating: 5.0,
      },
      {
        name: "JBL Charge 5",
        price: 149,
        category: "Speakers",
        image: "https://your-image-url.com/jbl_charge_5.jpg",
        description: "Loa Bluetooth JBL Charge 5 với âm thanh mạnh mẽ.",
        stock: 25,
        rating: 4.7,
      }
    ];

    try {
      const addedProductIds: string[] = [];

      for (const product of newProducts) {
        const productId = await addProduct(product);
        addedProductIds.push(productId);
        console.log(` thêm sản phẩm: ${product.name} với ID: ${productId}`);
      }

      Alert.alert("Thành công", `Đã thêm ${addedProductIds.length} sản phẩm vào Firestore.`);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể thêm sản phẩm.");
      console.error(" Lỗi khi thêm sản phẩm:", error);
    }
  };

  return (
    <View>
      <Button title="Thêm Sản Phẩm" onPress={handleAddProduct} />
    </View>
  );
};

export default AddProductButton;
