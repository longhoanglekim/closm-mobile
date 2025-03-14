import React from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Button,
    
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateFirstname } from "@/redux/reducers/User";
import { useRouter } from "expo-router";
// import Icon from "react-native-vector-icons/Feather";

export default function ProfileScreen() {
    const user = useSelector((state) => state.user);
    const router = useRouter();
    console.log(user);
    const dispatch = useDispatch();
    

    return (
        <SafeAreaView style={styles.container}>
            {/* <ProtectedRoute> */}
      <SafeAreaView style={{ padding: 50 }}>
        <Text>
          Profile cua {user.firstname} : {user.testAction}
        </Text>
        <Button
          title="Click Me"
          onPress={() => router.push("/(tabs)/profile/login")}
        />
      </SafeAreaView>
    {/* </ProtectedRoute> */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Image
                        source={{ uri: "" }}
                        style={styles.avatar}
                    />
                    <TouchableOpacity style={styles.activityButton}>
                        <Text style={styles.activityText}>My Activity</Text>
                    </TouchableOpacity>

                </View>

                {/* Chào người dùng */}
                <View>
                    <Text style={styles.greeting}>Hello, {user.firstname}!</Text>
                    <Button title="Setting" onPress={() => router.push("/profile/setting")} />
                </View>


                {/* Announcement */}
                <View style={styles.announcement}>
                    <View>
                        <Text style={styles.announcementTitle}>Announcement</Text>
                        <Text style={styles.announcementText}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Text>
                    </View>
                </View>

                {/* Recently Viewed */}
                <Text style={styles.sectionTitle}>Recently viewed</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentlyViewed}>
                    {["https://source.unsplash.com/100x100/?fashion",
                        "https://source.unsplash.com/100x100/?model",
                        "https://source.unsplash.com/100x100/?clothes",
                        "https://source.unsplash.com/100x100/?shopping"
                    ].map((img, index) => (
                        <Image key={index} source={{ uri: img }} style={styles.recentImage} />
                    ))}
                </ScrollView>

                {/* My Orders */}
                <Text style={styles.sectionTitle}>My Orders</Text>
                <View style={styles.orderButtons}>
                    <TouchableOpacity style={styles.orderButton}><Text style={styles.orderText}>To Pay</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.orderButtonActive}><Text style={styles.orderText}>To Receive</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.orderButton}><Text style={styles.orderText}>To Review</Text></TouchableOpacity>
                </View>

                {/* Stories */}
                <Text style={styles.sectionTitle}>Stories</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.stories}>
                    {["https://source.unsplash.com/200x300/?shopping",
                        "https://source.unsplash.com/200x300/?girl",
                        "https://source.unsplash.com/200x300/?fashion"
                    ].map((img, index) => (
                        <View key={index} style={styles.storyContainer}>
                            <Image source={{ uri: img }} style={styles.storyImage} />
                            {index === 0 && <Text style={styles.liveBadge}>Live</Text>}
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        justifyContent: "space-between",
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    activityButton: {
        backgroundColor: "#007AFF",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    activityText: {
        color: "#FFF",
        fontWeight: "bold",
    },
    headerIcons: {
        flexDirection: "row",
        gap: 15,
    },
    greeting: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 10,
    },
    announcement: {
        backgroundColor: "#F3F4F6",
        padding: 15,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    announcementTitle: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    announcementText: {
        color: "#666",
        maxWidth: "80%",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
    },
    recentlyViewed: {
        flexDirection: "row",
        marginTop: 10,
    },
    recentImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    orderButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    orderButton: {
        backgroundColor: "#E5E7EB",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    orderButtonActive: {
        backgroundColor: "#007AFF",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    orderText: {
        color: "#FFF",
        fontWeight: "bold",
    },
    stories: {
        flexDirection: "row",
        marginTop: 10,
    },
    storyContainer: {
        position: "relative",
        marginRight: 10,
    },
    storyImage: {
        width: 100,
        height: 150,
        borderRadius: 10,
    },
    liveBadge: {
        position: "absolute",
        top: 10,
        left: 10,
        backgroundColor: "green",
        color: "white",
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
        fontSize: 12,
    },
})


