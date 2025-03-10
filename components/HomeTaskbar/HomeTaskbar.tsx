import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBars,
  faSearch,
  faMessage,
  faBell,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
const HomeTaskbar = () => {
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
      <FontAwesomeIcon icon={faSearch} style={{ marginLeft: 20 }} />
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          paddingHorizontal: 10,
          borderRadius: 5,
          width: 200,
        }}
        placeholder="Nhập văn bản..."
        value={text}
        onChangeText={(newText) => setText(newText)}
      />
      <FontAwesomeIcon icon={faMessage} style={{ marginLeft: 20 }} />
      <FontAwesomeIcon icon={faBell} style={{ marginLeft: 20 }} />
      <FontAwesomeIcon icon={faCartShopping} style={{ marginLeft: 20 }} />
    </View>
  );
};

export default HomeTaskbar;
