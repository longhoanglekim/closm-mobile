import { Link } from "expo-router";
import { View, Text } from "react-native";

const dummyPage = () => {
  return (
    <View>
      <Text>Dummy page</Text>
      <Link href="/(tabs)/sales/index">Navigate back</Link>
    </View>
  );
};

export default dummyPage;
