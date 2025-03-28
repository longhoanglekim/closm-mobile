import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import styles from "@/constants/home";
import { getProductOverview } from "@/api/products/products";
import { useFocusEffect } from "expo-router";
const Category = () => {

  const [productOverview, setProductOverview] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const fetchProductOverview = async () => {
        try {
          const result = await getProductOverview();
          setProductOverview(result); 
          
        } catch (err) {
          console.error("Lỗi khi fetch product overview:", err);
        }
      };
  
      fetchProductOverview();
    }, [])
  );
  

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
