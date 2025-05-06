import React from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import LoginScreen from "./login";

export default function ProfileScreen() {
  const user = useSelector((state) => state.user);
  const router = useRouter();

  const handleFilter = (item) => {
    router.push("/(tabs)/profile/orders?status=" + item);
  };

  return (
    (!user.isLoggedIn && <LoginScreen />) || (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Image
              source={{
                uri: "https://www.iconpacks.net/icons/1/free-user-icon-295-thumb.png",
              }}
              style={styles.avatar}
            />
            <View
              style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <Text style={styles.greeting}>{user.userInfo.fullName}</Text>
              <View
                style={{
                  marginLeft: 30,
                  marginTop: 0,
                  backgroundColor: "#8BD9FF",
                  padding: 10,
                  borderRadius: 15,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Member</Text>
              </View>
            </View>
            <Pressable onPress={() => router.push("/(tabs)/profile/setting")}>
              <FontAwesome name="cog" size={24} color="black" />
            </Pressable>
          </View>

          {/* <View style={styles.achievementContainer}>
            <View style={styles.achievementBox}>
              <Text>Collecting Points: 10P</Text>
            </View>
            <View style={styles.achievementBox}>
              <Text>Voucher: 1 available</Text>
            </View>
          </View>

          <View style={styles.activityContainer}>
            <View style={styles.activityBox}>
              <Text>Orders: 10</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.activityBox}>
              <Text>Favorite: 1 item</Text>
            </View>
          </View> */}

          {/* <Text style={styles.sectionTitle}>Recently viewed</Text> */}
          {/* <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {[1, 2, 3, 4, 5].map((item, index) => (
              <Image
                key={index}
                source={{ uri: "" }}
                style={styles.recentlyViewed}
              />
            ))}
          </ScrollView> */}
          <View style={styles.orderSection}>
            <Text style={styles.sectionTitle}>My Orders</Text>
            <View style={styles.orderButtonsContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {["ALL", "PENDING", "CONFIRMED", "DELIVERED", "CANCELLED"].map(
                  (item, index) => (
                    <Pressable
                      key={index}
                      style={styles.orderButton}
                      onPress={() => handleFilter(item)}
                    >
                      <Text style={styles.orderButtonText}>{item}</Text>
                    </Pressable>
                  )
                )}
              </ScrollView>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Services</Text>
          <View style={styles.gridContainer}>
            {[
              {
                icon: "credit-card",
                label: "ShopeePay",
                desc: "Nhận combo 300.000đ",
              },
              {
                icon: "shopping-cart",
                label: "Mua trước trả sau",
                desc: "SPayLater",
              },
              { icon: "gift", label: "Shopee Xu", desc: "Nhận xu mỗi ngày" },
              { icon: "tags", label: "Kho Voucher", desc: "50+ voucher" },
            ].map((service, index) => (
              <View key={index} style={styles.gridBox}>
                <FontAwesome
                  name={service.icon}
                  size={24}
                  style={styles.gridIcon}
                />
                <View>
                  <Text style={styles.gridLabel}>{service.label}</Text>
                  <Text style={styles.gridDesc}>{service.desc}</Text>
                </View>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Financial</Text>
          <View style={styles.gridContainer}>
            {[
              { icon: "money", label: "Tài chính", desc: "Xem thêm dịch vụ" },
              { icon: "shield", label: "Bảo hiểm", desc: "Gói bảo hiểm mini" },
            ].map((item, index) => (
              <View key={index} style={styles.gridBox}>
                <FontAwesome
                  name={item.icon}
                  size={24}
                  style={styles.gridIcon}
                />
                <View>
                  <Text style={styles.gridLabel}>{item.label}</Text>
                  <Text style={styles.gridDesc}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 20,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 12 },
  greeting: { fontSize: 18, fontWeight: "600" },
  achievementContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  achievementBox: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  activityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#fff",
    marginHorizontal: 10,
    borderRadius: 8,
    padding: 10,
  },
  activityBox: { flex: 1, alignItems: "center" },
  verticalDivider: { width: 1, height: "100%", backgroundColor: "#ccc" },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
    marginVertical: 20,
  },
  horizontalScroll: { paddingHorizontal: 10 },
  recentlyViewed: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#eee",
  },
  orderSection: {
    backgroundColor: "#fff",
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  orderButtonsContainer: { marginVertical: 10, paddingHorizontal: 10 },
  orderButton: {
    marginHorizontal: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#8BD9FF",
  },
  orderButtonText: { color: "fff", fontWeight: "600" },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  gridBox: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  gridIcon: { fontSize: 24, marginRight: 10, color: "#83CEF3" },
  gridLabel: { fontWeight: "600" },
  gridDesc: { color: "#555", fontSize: 12 },
});
