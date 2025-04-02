import React, { useCallback, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "@/constants/home";
import { getProductOverview } from "@/api/products/products";
import { router, useFocusEffect } from "expo-router";

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
  const handleVariantPress = (variantId: number) => {
    console.log("Variant ID:", variantId);
    router.push(`/CategoryOverview?id=${variantId}`);
  };
  const handleCategoryPress = (category: string) => {
    router.push(`/CategoryOverview?category=${category}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity
          style={styles.seeAllButton}
          onPress={() => router.push("/CategoryOverview")}
        >
          <Text style={styles.seeAllText}>See All</Text>
          <View style={styles.seeAllIcon}>
            <Text style={styles.arrowIcon}>-&gt;</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesContainer}>
        {productOverview.map((categoryData) => (
          <View key={categoryData.category} style={styles.categoryGroup}>
            <TouchableOpacity
              onPress={() => handleCategoryPress(categoryData.category)}
            >
              <View style={styles.categoryTouhablepacity}>
                {categoryData.variants.map((variant) => (
                  <TouchableOpacity
                    key={variant.id}
                    onPress={() => handleVariantPress(variant.id)}
                  >
                    <Image
                      source={{ uri: variant.imageUrl }}
                      style={styles.categoryImage}
                      resizeMode="cover"
                    />
                    {/* <Text>{categoryData.category}</Text> */}
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{categoryData.category}</Text>
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>
                    {categoryData.variants.length}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Category;
