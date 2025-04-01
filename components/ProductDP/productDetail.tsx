import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import styles from '@/constants/ProductDetail';
import { getProductOverview } from "@/api/products/products";
import { useFocusEffect } from "expo-router";
import stylesHome from "@/constants/home";

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const [productOverview, setProductOverview] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [availableCategories, setAvailableCategories] = useState(['All']);
  //random mỗi khi render
  const allVariants = productOverview
    .flatMap(category => category.variants)
    .sort(() => Math.random() - 0.5);

  //random 1 lần duy nhất khi productoverview thay đổi sử dụng usememo
  // const allVariants = useMemo(() => {
  //   return productOverview
  //     .flatMap(category => category.variants)
  //     .sort(() => Math.random() - 0.5);
  // }, [productOverview]);



  useFocusEffect(
    useCallback(() => {
      const fetchProductOverview = async () => {
        try {
          const result = await getProductOverview();
          setProductOverview(result);

          // Extract unique categories from the data
          const categories = ['All', ...new Set(result.map(item => item.category))];
          setAvailableCategories(categories);
        } catch (err) {
          console.error("Lỗi khi fetch product overview:", err);
        }
      };

      fetchProductOverview();
    }, [])
  );

  const handleBack = () => {
    router.back();
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All'
    ? productOverview
    : productOverview.filter(item => item.category === selectedCategory);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}></Text>
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryTabs}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryTabsScroll}
        >
          {availableCategories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryTab,
                selectedCategory === category && styles.selectedCategoryTab
              ]}
              onPress={() => handleCategoryPress(category)}
            >
              <Text style={[
                styles.categoryTabText,
                selectedCategory === category && styles.selectedCategoryTabText
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Category Title */}
      <View style={styles.allItemsHeader}>
        <Text style={styles.allItemsTitle}>
          {selectedCategory === 'All' ? 'All Items' : selectedCategory}
        </Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Product Grid */}
      {selectedCategory === 'All' ? (
        <View style={styles.variantsGrid}>
          {allVariants.map(variant => (
            <TouchableOpacity key={variant.id} style={styles.variantCard}>
              <Image
                source={{ uri: variant.imageUrl }}
                style={styles.variantImage}
                resizeMode="cover"
              />
              <View style={styles.variantInfo}>
                <Text style={styles.variantName}>{variant.name}</Text>
                <Text style={styles.variantPrice}>{variant.price.toLocaleString()}₫</Text>
                <Text style={styles.variantDesc} numberOfLines={2}>{variant.description}</Text>
                <Text style={styles.variantMeta}>Size: {variant.size} | Color: {variant.color}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      ) : (

        <View>
          {filteredProducts.map((categoryData) => (
            <View key={categoryData.category}>
              {/* Display all variants in a grid */}
              <View style={styles.variantsGrid}>
                {categoryData.variants.map((variant) => (
                  <TouchableOpacity key={variant.id} style={styles.variantCard}>
                    <Image
                      source={{ uri: variant.imageUrl }}
                      style={styles.variantImage}
                      resizeMode="cover"
                    />
                    <View style={styles.variantInfo}>
                      <Text style={styles.variantName}>{variant.name}</Text>
                      <Text style={styles.variantPrice}>
                        {variant.price?.toLocaleString()}₫
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


              {/* Category info at bottom */}
              <View style={styles.selectedCategoryInfo}>
                <Text style={styles.selectedCategoryName}>{categoryData.category}</Text>
                <View style={styles.selectedCountBadge}>
                  <Text style={styles.selectedCountText}>{categoryData.variants.length}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>


      )}
    </ScrollView>
  );
};

export default ProductDetail;