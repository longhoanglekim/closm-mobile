import { FontAwesome } from "@expo/vector-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Pressable, TextInput, View } from "react-native";
const searchModal = () => {
  const [text, setText] = React.useState("");
  return (
    <View>
      <View
        style={{
          position: "relative",
          flexDirection: "row",
          alignContent: "center",
          marginTop: 20,
        }}
      >
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            paddingLeft: 20,
            borderRadius: 5,
            width: "90%",
            marginLeft: 10,
            // paddingRight: 50,
          }}
          placeholder="Nhập văn bản..."
          value={text}
          onChangeText={(newText) => setText(newText)}
        />
        <Pressable>
          <FontAwesomeIcon
            icon={faSearch}
            style={{ position: "absolute", right: 20, top: 10 }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default searchModal;
