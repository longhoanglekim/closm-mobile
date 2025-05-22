import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "@/constants/home";
import { router } from "expo-router";
interface Variant {
  id: number;
  imageUrl: string;
}

interface CategoryData {
  category: string;
  variants: Variant[];
}

interface Props {
  productOverview: CategoryData[];
}
//const Category: React.FC<Props> = ({ productOverview }) => ngắn gọn

const Category = (props: Props) => {
  const { productOverview } = props;
  const handleVariantPress = (variantId: number) => {
    console.log("Variant ID:", variantId);
    router.push(`/(tabs)/ProductDP/CategoryOverview?id=${variantId}`);
  };

  const handleCategoryPress = (category: string) => {
    router.push(`/(tabs)/ProductDP/CategoryOverview?category=${category}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity
          style={styles.seeAllButton}
          onPress={() =>
            router.push(`/(tabs)/ProductDP/CategoryOverview?category=${"All"}`)
          }
        >
          <Text style={styles.seeAllText}>See All</Text>
          <View style={styles.seeAllIcon}>
            <Text style={styles.arrowIcon}>-&gt;</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesContainer}>
        {productOverview.map((categoryData) => (
          <TouchableOpacity
            key={categoryData.category}
            style={styles.categoryGroup}
            onPress={() => handleCategoryPress(categoryData.category)}
          >
            <View style={styles.categoryTouhablepacity}>
              {categoryData.variants.map((variant) => (
                <Image
                  key={variant.id}
                  source={{ uri: variant.imageUrl }}
                  style={styles.categoryImage}
                  resizeMode="cover"
                />
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
        ))}
      </View>
    </View>
  );
};

export default Category;
