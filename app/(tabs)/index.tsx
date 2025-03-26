import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Modal,
} from "react-native";
import HomeTaskbar from "@/components/homeComponent/HomeTaskbar/HomeTaskbar";
import Category from "@/components/homeComponent/category/Category";
import TopProduct from "@/components/homeComponent/topProduct/topProduct";
import ListProductType from "@/components/ListProductType/ListProductType";
import Banner from "@/components/banner/Bannner";
import NewItems from "@/components/newItems/NewItems";

export default function HomeScreen() {
  const [isMoalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView className="pt-10 px-5 gap-4">
      <ScrollView>
        <HomeTaskbar onSearchPress={() => setModalVisible(!isMoalVisible)} />
        <Modal
          animationType="slide"
          transparent={true}
          visible={isMoalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>Search anything...</Text>
              <Text
                style={{ color: "blue", marginTop: 20 }}
                onPress={() => setModalVisible(false)}
              >
                Close Modal
              </Text>
            </View>
          </View>
        </Modal>

        <Banner />
        <Category />
        <TopProduct />
        <NewItems />
        <ListProductType />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100%",
    width: "100%",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    height: "30%",
  },
  modalText: {
    fontSize: 18,
  },
});
