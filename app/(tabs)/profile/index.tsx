// index.tsx
import React from "react";
import { SafeAreaView, Text, Image, View, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/reducers/User";
import { auth } from "@/firebaseConfig";
import styles from "@/constants/styles";
import { FontAwesome } from "@expo/vector-icons";

export default function ProfileScreen() {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image
            source={{ uri: "https://via.placeholder.com/50" }}
            style={styles.avatar}
          />
          <Text style={styles.greeting}>Hello, {user.fullname}!</Text>
          <FontAwesome name="cog" size={24} color="black" />
        </View>

        <View style={styles.announcement}>
          <Text style={styles.announcementText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <FontAwesome name="arrow-right" size={20} color="blue" />
        </View>

        <Text style={styles.sectionTitle}>Recently viewed</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <Image
              key={index}
              source={{ uri: "https://via.placeholder.com/50" }}
              style={styles.recentlyViewed}
            />
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>My Orders</Text>
        <View style={styles.orderButtons}>
          <Pressable style={styles.orderButton}><Text>To Pay</Text></Pressable>
          <Pressable style={styles.orderButton}><Text>To Receive</Text></Pressable>
          <Pressable style={styles.orderButton}><Text>To Review</Text></Pressable>
        </View>

        <Text style={styles.sectionTitle}>Stories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3].map((item, index) => (
            <View key={index} style={styles.storyCard}>
              <Image
                source={{ uri: "https://via.placeholder.com/100" }}
                style={styles.storyImage}
              />
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}