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
    router.push(`/view/CategoryOverview?id=${variantId}`);
  };

  const handleCategoryPress = (category: string) => {
    router.push(`/view/CategoryOverview?category=${category}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity
          style={styles.seeAllButton}
          onPress={() => router.push("/view/CategoryOverview")}
        >
          <Text style={styles.seeAllText}>See All</Text>
          <View style={styles.seeAllIcon}>
            <Text style={styles.arrowIcon}>-&gt;</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesContainer}>
        {productOverview.map((categoryData) => (
<<<<<<< HEAD
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

                    <TouchableOpacity onPress={() => handleCategoryPress(categoryData.category)}>
                      <Image
                        source={{ uri: variant.imageUrl }}
                        style={styles.categoryImage}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>

                    {/* <Text>{categoryData.category}</Text> */}
                  </TouchableOpacity>
                ))}
=======
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
>>>>>>> ba40067453ad99a9ed1bdccbe794e6717b0d429f
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

    </View>
  );
};

export default Category;
