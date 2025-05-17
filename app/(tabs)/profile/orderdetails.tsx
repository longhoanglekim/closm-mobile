import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Button,
  Image,
  Alert,
} from "react-native";
import { getOrderInfo } from "@/api/order/order";
import { cancelOrder } from "@/api/user/user";
const OrderDetails = () => {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        if (!orderId) {
          setError("Order ID is missing.");
          return;
        }

        const numericOrderId = Number(orderId);
        if (isNaN(numericOrderId)) {
          setError("Invalid Order ID format.");
          return;
        }

        const data = await getOrderInfo(numericOrderId);
        setOrder(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId]);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN") + "₫";
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  const handleCancelOrder = () => {
    Alert.alert("Cancel Order", "Are you sure you want to cancel this order?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          await cancelOrder(order.id);
          console.log("Order canceled:", order.orderCode);
          Alert.alert("Order canceled", "Your order has been canceled.");
          router.back();
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f28c28" />
        <Text style={styles.loadingText}>Loading order details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Order Code: {order.orderCode}</Text>
        <View style={styles.section}>
          <Text style={styles.label}>
            Status: <Text style={styles.statusText}>{order.orderStatus}</Text>
          </Text>
          <Text style={styles.label}>
            Order Date:{" "}
            <Text style={styles.dateText}>{formatDate(order.orderDate)}</Text>
          </Text>
          <Text style={styles.label}>
            Delivery Address:{" "}
            <Text style={styles.boldText}>{order.deliverAddress}</Text>
          </Text>
          <Text style={styles.label}>
            Final Price:{" "}
            <Text style={styles.priceText}>
              {formatCurrency(order.finalPrice)}
            </Text>
          </Text>
          <Text style={styles.label}>
            Payment Status:{" "}
            <Text style={styles.paymentStatusText}>{order.paymentStatus}</Text>
          </Text>
          <Text style={styles.label}>
            Payment Method:{" "}
            <Text style={styles.paymentMethodText}>{order.paymentMethod}</Text>
          </Text>
        </View>

        <Text style={styles.subTitle}>Items:</Text>
        {order.orderItemList?.map((item: any) => (
          <View key={item.id} style={styles.itemContainer}>
            {item.imageUrl && (
              <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
            )}
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.description}</Text>
              <Text style={styles.itemDetail}>
                Quantity:{" "}
                <Text style={styles.boldText}>{item.orderedQuantity}</Text>
              </Text>
              <Text style={styles.itemDetail}>
                Price:{" "}
                <Text style={styles.priceText}>
                  {formatCurrency(item.price)}
                </Text>
              </Text>
            </View>
          </View>
        ))}
        {new Date(order.cancelableDate).getTime() > Date.now() &&
          order.orderStatus.toUpperCase() === "PENDING" && (
            <View>
              <View style={[styles.buttonContainer]}>
                <Button
                  title="Cancel Order"
                  color="#dc3545"
                  onPress={handleCancelOrder}
                />
              </View>
              <Text style={styles.cancelableDateText}>
                Cancelable until:{" "}
                <Text style={styles.dateText}>
                  {formatDate(order.cancelableDate)}
                </Text>
              </Text>
            </View>
          )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "lightblue",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
    textAlign: "center",
    textTransform: "uppercase",
  },
  section: {
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#444",
  },
  itemContainer: {
    flexDirection: "row", // added
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center", // added
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 5,
    marginRight: 10, // added
  },
  itemInfo: {
    flex: 1, // added
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2d3e50",
  },
  itemDetail: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  priceText: {
    fontWeight: "bold",
    color: "#f28c28",
  },
  boldText: {
    fontWeight: "bold",
  },
  statusText: {
    color: "#28a745",
  },
  paymentStatusText: {
    color: "#ffc107",
  },
  paymentMethodText: {
    color: "#007bff",
  },
  dateText: {
    color: "#6c757d",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#555",
  },
  errorText: {
    color: "#dc3545",
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
  },
  cancelableDateText: {
    color: "#6c757d",
    fontSize: 16,
    marginTop: 10,
    textAlign: "right",
  },
});

export default OrderDetails;
