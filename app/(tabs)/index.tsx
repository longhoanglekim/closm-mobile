import Category from "@/components/homeComponent/category/Category";
import HomeTaskbar from "@/components/homeComponent/HomeTaskbar/HomeTaskbar";

import ListProductType from "@/components/ListProductType/ListProductType";
import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import TopProduct from "@/components/homeComponent/topProduct/topProduct";
export default function HomeScreen() {
  return (
    <SafeAreaView className="pt-10 px-5 gap-4">
      <HomeTaskbar />
      <Category />
      <TopProduct />
      <ListProductType />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
