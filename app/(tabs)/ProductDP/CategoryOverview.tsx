import React, { useCallback, useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import styles from "@/constants/ProductDetail";
import { getProductDetails } from "@/api/products/products";
import { useFocusEffect } from "expo-router";
export interface Variant {
  id: number;
  tag: string;
  imgUrl: string;
  minPrice: number;
  maxPrice: number;
  description: string;
  size: string;
  color: string;
}

export interface ProductCategory {
  category: string;
  variants: Variant[];
}
const CategoryOverview = () => {

  const { category } = useLocalSearchParams<{ category?: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    if (typeof category === "string" && category !== selectedCategory) {
      console.log("Category:", category);
      setSelectedCategory(category);
    }
  }, [category, selectedCategory]);


  const [productOverview, setProductOverview] = useState<ProductCategory[]>([]);


  const [availableCategories, setAvailableCategories] = useState<string[]>(["All"]);


  const allVariants: Variant[] = productOverview
    .flatMap((cat: ProductCategory) => cat.variants)
    .sort(() => Math.random() - 0.5);

  useFocusEffect(
    useCallback(() => {
      const fetchProductOverview = async () => {
        try {
          const result: ProductCategory[] = await getProductDetails();
          setProductOverview(result);

          // Lấy ra danh sách category (unique) + "All"
          const uniqueCats = Array.from(new Set(result.map((item) => item.category)));
          setAvailableCategories(["All", ...uniqueCats]);
        } catch (err) {
          console.error("Lỗi khi fetch product overview:", err);
        }
      };

      fetchProductOverview();
    }, [])
  );

  // Khi người dùng bấm vào 1 variant, chuyển sang màn hình detail
  const handleClickVariant = (variantId: number, tag: string) => {
    console.log("Variant ID :", variantId);
    router.push(`/(tabs)/ProductDP/productDetail?id=${variantId}&tag=${tag}`);
  };

  // Khi bấm chọn category tab
  const handleCategoryPress = (cat: string) => {
    setSelectedCategory(cat);
  };

  // Lọc productOverview theo category hiện tại
  const filteredProducts: ProductCategory[] =
    selectedCategory === "All"
      ? productOverview
      : productOverview.filter((item) => item.category === selectedCategory);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.categoryTabs}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryTabsScroll}
        >
          {availableCategories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryTab,
                selectedCategory === cat && styles.selectedCategoryTab,
              ]}
              onPress={() => handleCategoryPress(cat)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryTabText,
                  selectedCategory === cat && styles.selectedCategoryTabText,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ====== Title + Filter Button ======= */}
      <View style={styles.allItemsHeader}>
        <Text style={styles.allItemsTitle}>
          {selectedCategory === "All" ? "All Items" : selectedCategory}
        </Text>
        <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
          <Text style={styles.filterButtonText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* ====== Product Grid ======= */}
      {selectedCategory === "All" ? (
        // Khi chọn “All”, hiển thị theo từng category
        <View>
          {productOverview.map((categoryData) => (
            <View key={categoryData.category} style={{ marginBottom: 24 }}>
              <Text style={styles.categorySectionTitle}>
                {categoryData.category}
              </Text>
              <View style={styles.variantsGrid}>
                {categoryData.variants.map((variant: Variant) => (
                  <TouchableOpacity
                    key={variant.id}
                    style={styles.variantCard}
                    onPress={() =>
                      handleClickVariant(variant.id, variant.tag)
                    }
                    activeOpacity={0.7}
                  >
                    <Image
                      source={{ uri: variant.imgUrl }}
                      style={styles.variantImage}
                      resizeMode="cover"
                    />
                    <View style={styles.variantInfo}>
                      <Text style={styles.variantName}>{variant.tag}</Text>
                      <Text style={styles.variantPrice}>
                        {variant.minPrice != null
                          ? variant.minPrice.toLocaleString()
                          : "N/A"}{" "}
                        -{" "}
                        {variant.maxPrice != null
                          ? variant.maxPrice.toLocaleString()
                          : "N/A"}{" "}
                        ₫
                      </Text>
                      <Text style={styles.variantDesc} numberOfLines={2}>
                        {variant.description}
                      </Text>
                      <Text style={styles.variantMeta}>
                        Size: {variant.size} | Color: {variant.color}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      ) : (
        // Khi chọn 1 category cụ thể
        <View>
          {filteredProducts.length === 0 ? (
            <Text style={styles.noDataText}>Không có sản phẩm</Text>
          ) : (
            filteredProducts.map((categoryData) => (
              <View key={categoryData.category}>
                <View style={styles.variantsGrid}>
                  {categoryData.variants.map((variant: Variant) => (
                    <TouchableOpacity
                      key={variant.id}
                      style={styles.variantCard}
                      onPress={() =>
                        handleClickVariant(variant.id, variant.tag)
                      }
                      activeOpacity={0.7}
                    >
                      <Image
                        source={{ uri: variant.imgUrl }}
                        style={styles.variantImage}
                        resizeMode="cover"
                      />
                      <View style={styles.variantInfo}>
                        <Text style={styles.variantName}>{variant.tag}</Text>
                        <Text style={styles.variantPrice}>
                          {variant.minPrice != null
                            ? variant.minPrice.toLocaleString()
                            : "N/A"}{" "}
                          -{" "}
                          {variant.maxPrice != null
                            ? variant.maxPrice.toLocaleString()
                            : "N/A"}{" "}
                          ₫
                        </Text>
                        <Text style={styles.variantDesc} numberOfLines={2}>
                          {variant.description}
                        </Text>
                        <Text style={styles.variantMeta}>
                          Size: {variant.size} | Color: {variant.color}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default CategoryOverview;