import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";

interface Variant {
  id: number;
  imageUrl: string;
  tag: string;
}

interface CategoryData {
  category: string;
  variants: Variant[];
}

interface Props {
  productOverview: CategoryData[];
  searchText: string;
  setSearchText: (text: string) => void;
  searchResults: Variant[];
  setSearchResults: (results: Variant[]) => void;
}

const SearchModal = ({ searchResults, setSearchText }: Props) => {
  const router = useRouter(); // Assuming you're using a router for navigation
  const handleClickItem = (id: number, tag: string) => {
    // Handle the click event for the item
    console.log(`Clicked item with id: ${id}`);
    console.log(`Clicked item with tag: ${tag}`);
    router.push(`/(tabs)/ProductDP/productDetail?id=${id}&tag=${tag}`);
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleClickItem(item.id, item.tag)}>
              <View style={styles.resultItem}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                <Text>{item.tag}</Text>
              </View>
            </Pressable>
          )}
          ListEmptyComponent={
            <View style={styles.resultItem}>
              <Text>Không tìm thấy sản phẩm</Text>
            </View>
          }
        />
        <TouchableOpacity
          onPress={() => setSearchText("")}
          style={styles.closeBtn}
        >
          <Text style={styles.closeText}>Đóng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchModal;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 70, // Điều chỉnh nếu taskbar cao hơn
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 999,
    paddingHorizontal: 10,
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    maxHeight: 400, // <-- Giới hạn chiều cao tối đa
    elevation: 4,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 6,
  },
  closeBtn: {
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: "#eee",
    borderRadius: 6,
    alignItems: "center",
  },
  closeText: {
    fontWeight: "bold",
    color: "#333",
  },
});
