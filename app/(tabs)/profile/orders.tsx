import { getOrderList } from "@/api/user/user";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  Button,
  Text,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
interface OrderItem {
  id: number;
  price: number;
  imageUrl: string;
  tag: string;
  size: string;
  color: string;
  description: string;
  orderedQuantity: number;
}

interface Order {
  id: number;
  userEmail: string;
  orderDate: string; // ISO date string
  orderStatus: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED"; // tùy enum bạn định nghĩa
  orderCode: string;
  discountAmount: number;
  deliverPayment: number;
  finalPrice: number;
  paymentStatus: "UNPAID" | "PAID" | "FAILED";
  paymentMethod: "CASH" | "CREDIT_CARD" | "PAYPAL" | "BANK_TRANSFER"; // tùy enum bạn có
  deliverAddress: string;
  cancelableDate: string; // ISO date string
  orderItemList: OrderItem[];
}
interface OrderGroup {
  orderStatus: string;
  orders: Order[];
}
const UserOrderScreen = () => {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const { status } = useLocalSearchParams();
  const [orderListData, setOrderListData] = React.useState<OrderGroup[]>([]);
  const [selectedOrderList, setSelectedOrderList] = React.useState<Order[]>([]);
  const [selectedOrderType, setSelectedOrderType] = React.useState(status);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      try {
        const data = await getOrderList(user.userInfo.email);
        setOrderListData(data); // chỉ set data ở đây
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user orders info:", error);
      }
    };

    if (user.isLoggedIn) {
      fetchUserInfo();
    }
  }, [user.isLoggedIn]); // đảm bảo chạy lại khi user đăng nhập

  // useEffect thứ hai: xử lý filter sau khi dữ liệu đã được set
  useEffect(() => {
    if (orderListData.length > 0 && status) {
      handleFilter(status.toString()); // đảm bảo status là string
    }
  }, [orderListData, status]);

  const handleFilter = (item: string) => {
    console.log(item);
    const allOrders = orderListData?.flatMap((group) => group.orders);
    if (item === "ALL") {
      setSelectedOrderList(allOrders);
      setSelectedOrderType("ALL");
    } else {
      const filteredOrders = allOrders.filter(
        (order) => order.orderStatus.toUpperCase() === item.toUpperCase()
      );
      setSelectedOrderList(filteredOrders);
      setSelectedOrderType(item);
    }
  };

  const formatDate = (dateStr: any) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN") + "₫";
  };

  return (
    <ScrollView>
      <Text style={styles.sectionTitle}>My Orders</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexDirection: "row" }}
      >
        {["ALL", "PENDING", "CONFIRMED", "DELIVERED", "CANCELLED"].map(
          (item, index) => (
            <Pressable
              key={index}
              style={styles.orderButton}
              onPress={() => handleFilter(item)}
            >
              <Text style={styles.orderButtonText}>{item}</Text>
              {item === selectedOrderType && (
                <View
                  style={{ height: 2, backgroundColor: "red", width: "120%" }}
                />
              )}
            </Pressable>
          )
        )}
      </ScrollView>

      {selectedOrderList?.map((order, index) => (
        <View key={index} style={styles.orderListItem}>
          <Text style={styles.orderTitle}>Order #{order.orderCode}</Text>
          <Text style={styles.orderStatus}>Status: {order.orderStatus}</Text>
          <Text>Delivery Address: {order.deliverAddress}</Text>

          <Text style={styles.subSection}>
            Items quantity: {order.orderItemList.length}
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={styles.priceSection}>
              Total payment:<Text>{formatCurrency(order.finalPrice)}</Text>
            </Text>
          </View>
          <Text style={{ textAlign: "right" }}>
            Payment Status: {order.paymentStatus}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              marginRight: 10,
              justifyContent: "flex-end",
            }}
          >
            <Pressable
              style={styles.detailsButton}
              onPress={() => {
                router.push("/(tabs)/profile/orderdetails?orderId=" + order.id);
              }}
            >
              <Text>View details</Text>
            </Pressable>
          </View>
        </View>
      ))}

      {selectedOrderList?.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No orders found for {selectedOrderType}
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  orderButton: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  orderButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  orderListItem: {
    margin: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: "#fff",
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orderStatus: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },
  priceSection: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: "#ddd",
  },
  subSection: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  detailsButton: {
    marginTop: 10,
    marginRight: 30,
    borderRadius: 25,
    padding: 10,
    alignItems: "flex-end",
    backgroundColor: "#007BFF",
    width: 100,
  },
});

export default UserOrderScreen;
