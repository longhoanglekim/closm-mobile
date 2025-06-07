import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import HomeTaskbar from "@/components/homeComponent/HomeTaskbar/HomeTaskbar";
import Category from "@/components/homeComponent/category/Category";
import TopProduct from "@/components/homeComponent/topProduct/topProduct";
import ListProductType from "@/components/ListProductType/ListProductType";
import Banner from "@/components/banner/Bannner";
import NewItems from "@/components/newItems/NewItems";
import SearchModal from "@/components/homeComponent/search/searchModal";
import { getProductOverview } from "@/api/products/products";

export default function HomeScreen() {
  const [productOverview, setProductOverview] = useState<any[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // trạng thái “loading lần đầu” (khi mới mount)
  const [loading, setLoading] = useState<boolean>(true);
  // trạng thái “đang pull-to-refresh”
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Hàm fetch ban đầu (khi component mount)
  const fetchProductOverview = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getProductOverview();
      setProductOverview(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("Lỗi khi fetch product overview:", err);
      setProductOverview([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductOverview();
  }, [fetchProductOverview]);

  // Hàm này sẽ được gọi khi người dùng vuốt để tải lại (pull-to-refresh)
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const result = await getProductOverview();
      setProductOverview(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("Lỗi khi refresh product overview:", err);
      setProductOverview([]);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Taskbar chứa ô tìm kiếm */}
      <HomeTaskbar
        productOverview={productOverview}
        searchText={searchText}
        setSearchText={setSearchText}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />

      {/* Nếu đang loading lần đầu, show ActivityIndicator */}
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          // Gắn RefreshControl vào ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Banner />
          <Category productOverview={productOverview} />
          <TopProduct />
          <NewItems />
          <ListProductType />
        </ScrollView>
      )}

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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    // Tăng khoảng padding nếu cần, hoặc để mặc định
    paddingBottom: 20,
  },
});
