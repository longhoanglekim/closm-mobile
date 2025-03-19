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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const db = getFirestore(app);
      
  //     // Fetch categories
  //     const categorySnapshot = await getDocs(collection(db, "categories"));
  //     setCategories(categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

  //     // Fetch top products
  //     const topProductsSnapshot = await getDocs(collection(db, "topProducts"));
  //     setTopProducts(topProductsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      
  //     // Fetch new items
  //     const newItemsSnapshot = await getDocs(collection(db, "newItems"));
  //     setNewItems(newItemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  //   };

  //   fetchData();
  // }, []);

  return (
    <SafeAreaView className="pt-10 px-5 gap-4">
      <ScrollView>
        <HomeTaskbar />
        <Banner />
        <Category/>
        <TopProduct  />
        <NewItems/>
        {/* <Category categories={categories} />
        <TopProduct products={topProducts} />
        <NewItems products={newItems} /> */}
        <ListProductType />
      </ScrollView>
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
