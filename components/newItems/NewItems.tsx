import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import styles from "@/constants/Newitems";
const NewItems = () => {
  const newItems = [
    { id: 1, name: "Sneakers", price: "1", image: "https://picsum.photos/200" },
    { id: 2, name: "Running Shoes", price: "2", image: "https://picsum.photos/200" },
    { id: 3, name: "Casual Shoes", price: "3", image: "https://picsum.photos/200" },
    { id: 4, name: "Formal Shoes", price: "4", image: "https://picsum.photos/200" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>New Items</Text>
        <Text style={styles.seeAll}>See All →</Text>
      </View>
      <FlatList
        data={newItems}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        nestedScrollEnabled={true}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        )}
      />


    </View>
  );
};



export default NewItems;
