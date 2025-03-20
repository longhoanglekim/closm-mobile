import React from "react";
import ListImage from "../../ListImage/ListImage";
import { Text, View } from "react-native";
import home from "@/constants/home"

const Category = () => {
  return (
    <View>
      <Text>Category</Text>
      <View style={home.category}>
<View style={home.categoryItem}></View>

      </View>      
      <View>


      </View>
      <ListImage />
    </View>
  );
};

export default Category;
