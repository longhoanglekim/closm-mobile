// index.tsx
import React from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  ScrollView,
  Pressable,
  Button,
} from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import styles from "@/constants/styles";
import profileStyles from "@/constants/profile";
import { FontAwesome } from "@expo/vector-icons";

export default function ProfileScreen() {
  const user = useSelector((state) => state.user);
  // console.log(user.userInfo);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://www.iconpacks.net/icons/1/free-user-icon-295-thumb.png",
            }}
            style={styles.avatar}
          />
          <Text style={styles.greeting}>Hello, {user.userInfo.fullName}!</Text>

          <Pressable onPress={() => router.push("/(tabs)/profile/setting")}>
            <FontAwesome name="cog" size={24} color="black" />
          </Pressable>
        </View>

        <View style={profileStyles.userAchivementContainer}>
          <View style={profileStyles.achievement}>
            <Text>Collecting Points {10}P</Text>
          </View>
          <View style={profileStyles.achievement}>
            <Text>Voucher : {1} available </Text>
          </View>
        </View>

        <View style={profileStyles.userActivityContainer}>
          <View style={profileStyles.activity}>
            <Text>Orders : 10P</Text>
          </View>

          <View style={profileStyles.verticalDivider} />

          <View style={profileStyles.activity}>
            <Text>Favorite : 1 items</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recently viewed</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <Image
              key={index}
              source={{ uri: "" }}
              style={styles.recentlyViewed}
            />
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>My Orders</Text>
        <View style={styles.orderButtons}>
          <Pressable style={styles.orderButton}>
            <Text>To Pay</Text>
          </Pressable>
          <Pressable style={styles.orderButton}>
            <Text>To Receive</Text>
          </Pressable>
          <Pressable style={styles.orderButton}>
            <Text>To Review</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Stories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3].map((item, index) => (
            <View key={index} style={styles.storyCard}>
              <Image source={{ uri: "" }} style={styles.storyImage} />
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
