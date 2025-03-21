import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import styles from "@/constants/home";
import { getCategories } from "@/api/products/products";
import { useFocusEffect } from "expo-router";
const Category = () => {
  const [categoryList, setCategoryList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchCategories = async () => {
        try {
          const result = await getCategories();

          // ✅ Chỉ cập nhật state nếu kết quả thực sự khác (so sánh nội dung)
          if (JSON.stringify(result) !== JSON.stringify(categoryList)) {
            setCategoryList(result);
            console.log("Fetched categories and updated:", result);
          }
        } catch (err) {
          console.error("Lỗi khi fetch danh mục:", err);
        }
      };

      fetchCategories();
    }, [categoryList]) // Theo dõi sự thay đổi
  );

  // Nếu muốn theo dõi khi categoryList thay đổi:
  useEffect(() => {
    console.log("Updated categoryList:", categoryList); // ✅ Log giá trị mới mỗi khi state cập nhật
  }, [categoryList]); // Theo dõi sự thay đổi của categoryList
  console.log("Confirm categoryList:", categoryList);
  const imageUrl = "https://picsum.photos/200";
  const categories = [
    {
      id: 1,
      name: "Clothing",
      count: 4,
      images: [imageUrl, imageUrl, imageUrl, imageUrl],
    },
    {
      id: 2,
      name: "Shoes",
      count: 4,
      images: [imageUrl, imageUrl, imageUrl, imageUrl],
    },
    {
      id: 3,
      name: "Bags",
      count: 4,
      images: [imageUrl, imageUrl, imageUrl, imageUrl],
    },
    {
      id: 4,
      name: "Lingerie",
      count: 4,
      images: [imageUrl, imageUrl, imageUrl, imageUrl],
    },
    {
      id: 5,
      name: "Watch",
      count: 4,
      images: [imageUrl, imageUrl, imageUrl, imageUrl],
    },
    {
      id: 6,
      name: "Hoodies",
      count: 4,
      images: [imageUrl, imageUrl, imageUrl, imageUrl],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity style={styles.seeAllButton}>
          <Text style={styles.seeAllText}>See All</Text>
          <View style={styles.seeAllIcon}>
            <Text style={styles.arrowIcon}>-></Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <View key={category.id} style={styles.categoryGroup}>
            <View style={styles.categoryImagesContainer}>
              {category.images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={styles.categoryImage}
                  resizeMode="cover"
                />
              ))}
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{category.count}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Category;
