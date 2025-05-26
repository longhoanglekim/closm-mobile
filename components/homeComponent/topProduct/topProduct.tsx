import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { getTopItems } from "@/api/products/products";

interface Item {
  tag: string;
  imageUrl: string;
  soldQuantity: number;
}

interface TopProductGroup {
  itemList: Item[];
  category: string;
}

const TopProduct = () => {
  const [topProducts, setTopProducts] = useState<TopProductGroup[]>([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const data = await getTopItems();
        setTopProducts(data);
      } catch (error) {
        console.error("Error fetching top products:", error);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Products</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {topProducts.map((product) => (
          <View key={product.category} style={styles.productGroup}>
            <Text style={styles.categoryName}>{product.category}</Text>
            <View style={styles.itemRow}>
              {product.itemList.map((item, index) => (
                <View key={index} style={styles.itemContainer}>
                  <Image source={{ uri: item.imageUrl }} style={styles.image} />
                  <Text style={styles.productName}>{item.tag}</Text>
                  <Text style={styles.productName}>
                    {/* Sold: {item.soldQuantity} */}
                    Sold : 100+
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // 1. Layout tổng
  container: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  scrollContainer: {
    flexDirection: "row",
  },

  // 2. Tiêu đề
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "left",
  },

  // 3. Nhóm sản phẩm theo category
  productGroup: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    minWidth: 150,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#444",
    textAlign: "center",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    backgroundColor: "#f9f9f9",
  },

  // 4. Sản phẩm đơn lẻ
  itemContainer: {
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1.5,
    borderColor: "#ddd",
    backgroundColor: "#f0f0f0",
    marginBottom: 6,
  },
  productName: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
  },
});

export default TopProduct;
