import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAvailableDiscounts } from "@/api/sales/salse";
import { StyleSheet } from "react-native";

interface Discount {
  id?: number;
  name: string;
  discountPercentage: number;
  discountType: "HOLIDAY" | "PAIDINADVANCE";
  startDate: Date;
  endDate: Date;
  imageUrl?: string; // Optional image URL
}

const SalesIndex = () => {
  const [discount, setDiscountList] = useState<Discount[]>([]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const data = await getAvailableDiscounts();
        // Giả lập thêm image nếu API không trả về
        setDiscountList(data);
      } catch (error) {
        console.error("Error fetching discounts:", error);
      }
    };

    fetchDiscounts();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🔥 Sales and Discounts 🔥</Text>
        {discount.length > 0 ? (
          <View style={styles.discountContainer}>
            {discount.map((item: Discount) => (
              <View key={item.id} style={styles.discountItem}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.discountImage}
                  resizeMode="cover"
                />
                <View style={styles.discountTextContent}>
                  <Text style={styles.discountDescription}>{item.name}</Text>
                  <Text style={styles.discountPercent}>
                    -{item.discountPercentage}% OFF
                  </Text>
                  <Text style={styles.validDate}>
                    {new Date(item.startDate).toLocaleDateString()} ➜{" "}
                    {new Date(item.endDate).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <Text style={{ textAlign: "center" }}>
            No discounts available at the moment.
          </Text>
        )}

        <Link href="/(tabs)/sales/discounts" style={styles.link}>
          👉 View All Discounts
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fefefe",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#E91E63",
  },
  discountContainer: {
    gap: 16,
  },
  discountItem: {
    backgroundColor: "#FFF0F6",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: "row",
  },
  discountImage: {
    width: 100,
    height: 100,
  },
  discountTextContent: {
    padding: 12,
  },
  discountDescription: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },
  discountPercent: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D50000",
  },
  validDate: {
    marginTop: 4,
    fontSize: 13,
    color: "#666",
  },
  link: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "#3F51B5",
  },
});

export default SalesIndex;
