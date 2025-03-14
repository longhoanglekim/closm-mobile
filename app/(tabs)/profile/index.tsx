import { updateFirstname } from "@/redux/reducers/User";
import { Redirect, useRouter } from "expo-router";
import {
  Image,
  StyleSheet,
  Platform,
  SafeAreaView,
  Text,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ProfileScreen() {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  let isLoggedIn = false;
  if (!isLoggedIn) {
    return <Redirect href="/(tabs)/profile/login" />;
  }
  console.log(user);
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{ padding: 50 }}>
      <Text>
        Profile cua {user.firstname} : {user.testAction}
      </Text>
      <Button
        title="Click Me"
        onPress={() => router.push("/(tabs)/profile/login")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
