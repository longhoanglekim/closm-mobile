import React from "react";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch, faCartShopping } from "@fortawesome/free-solid-svg-icons";

interface Variant {
  id: number;
  imageUrl: string;
  name: string;
}

interface CategoryData {
  category: string;
  variants: Variant[];
}

interface HomeTaskbarProps {
  productOverview: CategoryData[];
  searchText: string;
  setSearchText: (text: string) => void;
  searchResults: Variant[];
  setSearchResults: (results: Variant[]) => void;
}

const HomeTaskbar = ({
  productOverview,
  searchText,
  setSearchText,
  searchResults,
  setSearchResults,
}: HomeTaskbarProps) => {
  const handleSearch = (text: string) => {
    setSearchText(text);

    if (text.trim() === "") {
      setSearchResults([]);
      return;
    }

    const normalizedText = text.toLowerCase().replace(/-/g, "");
    const results: Variant[] = [];

    productOverview.forEach((category) => {
      category.variants.forEach((variant) => {
        const normalizedName = variant.name.toLowerCase().replace(/-/g, "");
        const words = normalizedName.split(" ");
        if (
          words.some(
            (word) =>
              word.includes(normalizedText) && word[0] === normalizedText[0]
          )
        ) {
          results.push(variant);
        }
      });
    });

    setSearchResults(results);
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm sản phẩm..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <Pressable>
        <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} />
      </Pressable>
      <Pressable>
        <FontAwesomeIcon icon={faCartShopping} style={styles.searchIcon} />
      </Pressable>
    </View>
  );
};

export default HomeTaskbar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginTop: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    width: "85%",
  },
  searchIcon: {
    marginLeft: 10,
  },
});
