import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

const TopProduct = () => {
  const topProducts = [
    { id: 1, name: "Bag", image: "https://picsum.photos/200" },
    { id: 2, name: "Watch", image: "https://picsum.photos/200" },
    { id: 3, name: "Shirt", image: "https://picsum.photos/200" },
    { id: 4, name: "Shoes", image: "https://picsum.photos/200" },
    { id: 5, name: "Dress", image: "https://picsum.photos/200" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Products</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {topProducts.map((product) => (
          <View key={product.id} style={styles.productContainer}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text style={styles.productName}>{product.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productContainer: {
    alignItems: "center",
    marginRight: 15,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  productName: {
    marginTop: 5,
    fontSize: 14,
  },
});

export default TopProduct;
