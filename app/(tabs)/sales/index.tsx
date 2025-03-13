import { Link } from "expo-router";
import { Text, View } from "react-native";

const SalesIndex = () => {
  return (
    <View>
      <Text>Sale</Text>
      <Link href="/(tabs)/sales/dummy">Go sales</Link>
    </View>
  );
};

export default SalesIndex;
