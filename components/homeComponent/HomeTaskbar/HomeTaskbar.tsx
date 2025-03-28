import React, { useState } from "react";
import {
  Pressable,
  Text,
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
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 50,
        width: "100%",
      }}
    >
      <FontAwesomeIcon icon={faBars} />
      <Pressable onPress={onSearchPress}>
        <FontAwesomeIcon icon={faSearch} style={{ marginHorizontal: 10 }} />
      </Pressable>
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
