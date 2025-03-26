import React, { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBars,
  faSearch,
  faMessage,
  faBell,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import globalStyle from "@/assets/styles/globalStyle";
interface HomeTaskbarProps {
  onSearchPress: () => void;
}
const HomeTaskbar = ({ onSearchPress }: HomeTaskbarProps) => {
  const [text, setText] = useState("");
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",

        width: "100%",
      }}
    >
      <FontAwesomeIcon icon={faBars} />
      <FontAwesomeIcon icon={faSearch} style={{ marginHorizontal: 10 }} />
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          paddingHorizontal: 10,
          borderRadius: 5,
          width: 200,
          marginRight: 10,
        }}
        placeholder="Nhập văn bản..."
        value={text}
        onChangeText={(newText) => setText(newText)}
        onPress={onSearchPress}
      />
      <TouchableOpacity style={globalStyle.messageIcon}>
        <FontAwesomeIcon icon={faMessage} style={{ position: "relative" }} />
        <View style={globalStyle.messageNumberContainer}>
          <Text style={globalStyle.messageNumber}>2</Text>
        </View>
      </TouchableOpacity>

      <FontAwesomeIcon icon={faBell} style={{ marginLeft: 15 }} />
      <FontAwesomeIcon icon={faCartShopping} style={{ marginLeft: 15 }} />
    </View>
  );
};

export default HomeTaskbar;
