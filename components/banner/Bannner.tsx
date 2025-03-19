import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Banner = () => {
  return (
    <View style={styles.bannerContainer}>
      <Image
        source={{ uri: "https://your-image-url.com/banner.jpg" }}
        style={styles.bannerImage}
      />
      <Text style={styles.bannerText}>Big Sale - Up to 50% Off!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  bannerImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  bannerText: {
    position: "absolute",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    top: "40%",
    textAlign: "center",
    width: "100%",
  },
});

export default Banner;
