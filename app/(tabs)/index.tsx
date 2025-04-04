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

export default function HomeScreen() {
  const [productOverview, setProductOverview] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchProductOverview = async () => {
      try {
        const result = await getProductOverview();
        setProductOverview(result);
      } catch (err) {
        console.error("Lỗi khi fetch product overview:", err);
      }
    };

    fetchProductOverview();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Taskbar chứa ô tìm kiếm */}
      <HomeTaskbar
        productOverview={productOverview}
        searchText={searchText}
        setSearchText={setSearchText}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />

      {/* Nội dung trang chính */}
      <ScrollView>
        <Banner />
        <Category productOverview={productOverview} />
        <TopProduct />
        <NewItems />
        <ListProductType />
      </ScrollView>

      {/* Overlay Search Modal */}
      {searchText.length > 0 && (
        <SearchModal
          productOverview={productOverview}
          searchText={searchText}
          setSearchText={setSearchText}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
        />
      )}
    </SafeAreaView>
  );
}
