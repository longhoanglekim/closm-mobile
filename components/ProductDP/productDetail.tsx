import React, { useCallback, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import styles from '@/constants/ProductDetail';
import { getProductOverview } from "@/api/products/products";
import { useFocusEffect } from "expo-router";
import stylesHome from "@/constants/home";


const ProductDetail = () => {
  const { id } = useLocalSearchParams();
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
  const handleBack = () => {
    router.back();
  };

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
          {[
            'Dresses', 'Pants', 'Skirts', 'Shorts', 'Jackets',
            'Hoodies', 'Shirts', 'Polo', 'T-shirts', 'Tunics'
          ].map((category) => (
            <TouchableOpacity key={category} style={styles.categoryTab}>
              <Text style={styles.categoryTabText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* All Items Header */}
      <View style={styles.allItemsHeader}>
        <Text style={styles.allItemsTitle}>All Items</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Product Grid */}
      <View style={styles.productGrid}>
        
        {productOverview.map((categoryData) => (
                  <View key={categoryData.category}>
                    <View >
                      {categoryData.variants.map((variant) => (
                        <TouchableOpacity
                          key={variant.id}
                        >
                          <Image
                            source={{ uri: variant.imageUrl }}
                            style={stylesHome.categoryImage}
                            resizeMode="cover"
                          />
                          {/* <Text>{categoryData.category}</Text> */}
                        </TouchableOpacity>
                      ))}
        
                    </View>
                    <View style={stylesHome.categoryInfo}>
                      <Text style={stylesHome.categoryName}>{categoryData.category}</Text>
                      <View style={stylesHome.countBadge}>
                        <Text style={stylesHome.countText}>{categoryData.variants.length}</Text>
                      </View>
                    </View>
                  </View>
                ))}

      </View>
    </ScrollView>
  );
};

export default ProductDetail;