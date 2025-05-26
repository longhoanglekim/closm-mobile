import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import HomeTaskbar from "@/components/homeComponent/HomeTaskbar/HomeTaskbar";
import Category from "@/components/homeComponent/category/Category";
import TopProduct from "@/components/homeComponent/topProduct/topProduct";
import ListProductType from "@/components/ListProductType/ListProductType";
import Banner from "@/components/banner/Bannner";
import NewItems from "@/components/newItems/NewItems";
import SearchModal from "@/components/homeComponent/search/searchModal";
import { getProductOverview } from "@/api/products/products";
import { Text } from "react-native";
export default function HomeScreen() {
  const [productOverview, setProductOverview] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Taskbar chứa ô tìm kiếm */}
      <Text style={{ marginTop: 20 }}>
        Day la mau admin : Dung nhieu vai loz
      </Text>
    </SafeAreaView>
  );
}
