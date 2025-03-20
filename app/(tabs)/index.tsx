import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";
import HomeTaskbar from "@/components/homeComponent/HomeTaskbar/HomeTaskbar";
import Category from "@/components/homeComponent/category/Category";
import TopProduct from "@/components/homeComponent/topProduct/topProduct";
import ListProductType from "@/components/ListProductType/ListProductType";
import Banner from "@/components/banner/Bannner";
import NewItems from "@/components/newItems/NewItems";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default function HomeScreen() {
  const [categories, setCategories] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [newItems, setNewItems] = useState([]);

  return (
    <SafeAreaView className="pt-10 px-5 gap-4">
      <ScrollView>
        <HomeTaskbar />
        <Banner />
        <Category/>
        <TopProduct  />
        <NewItems/>
        <ListProductType />
      </ScrollView>
    </SafeAreaView>
  );
}


