import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import {
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";

interface Variant {
  id: number;
  imageUrl: string;
  name: string;
}

interface CategoryData {
  category: string;
  variants: Variant[];
}

interface Props {
  productOverview: CategoryData[];
}

const SearchModal = ({ productOverview }: Props) => {
  const [text, setText] = React.useState("");
  const [filteredData, setFilteredData] = React.useState<Variant[]>([]);
  // console.log("productOverview", productOverview);
  // Xử lý tìm kiếm khi người dùng nhập
  const handleSearch = (searchText: string) => {
    setText(searchText);

    if (searchText.trim() === "") {
      setFilteredData([]);
      return;
    }

    // Chuẩn hóa dữ liệu: loại bỏ "-" và chuyển về chữ thường
    const normalizedSearchText = searchText.replace(/-/g, "").toLowerCase();

    const results: Variant[] = [];
    productOverview.forEach((category) => {
      category.variants.forEach((variant) => {
        const normalizedName = variant.name.replace(/-/g, "").toLowerCase();
        console.log("normalizedName product", normalizedName);
        console.log("normalizedName search", normalizedSearchText);
        const words = normalizedName.split(" "); // Tách tên sản phẩm thành mảng từ
        if (
          words.some(
            (word) =>
              word.includes(normalizedSearchText) &&
              word[0] === normalizedSearchText[0]
          )
        ) {
          results.push(variant);
        }
      });
    });

    setFilteredData(results);
  };

  return (
    <View>
      {/* Ô tìm kiếm */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          paddingHorizontal: 10,
        }}
      >
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            paddingLeft: 10,
            borderRadius: 5,
            width: "85%",
          }}
          placeholder="Enter text..."
          value={text}
          onChangeText={handleSearch}
        />
        <Pressable>
          <FontAwesomeIcon icon={faSearch} style={{ marginLeft: 10 }} />
        </Pressable>
      </View>

      {/* Danh sách kết quả tìm kiếm */}
      {filteredData.length > 0 && (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#ddd",
              }}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={{ width: 50, height: 50, marginRight: 10 }}
              />
              <Text>{item.name}</Text>
            </View>
          )}
          style={{
            marginTop: 10,
            maxHeight: 300, // Giới hạn chiều cao
            backgroundColor: "#fff",
            borderRadius: 10,
            elevation: 3, // Hiệu ứng đổ bóng
          }}
        />
      )}
    </View>
  );
};

export default SearchModal;
