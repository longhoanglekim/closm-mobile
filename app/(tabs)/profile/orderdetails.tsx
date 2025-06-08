import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Button,
  Image,
  Alert,
  Pressable,
  Dimensions,
} from "react-native";
import { getOrderInfo } from "@/api/order/order";
import { cancelOrder } from "@/api/user/user";
import DeliveryTrackingMap from "@/components/Map/DeliverTrackingMap";
import { FontAwesome } from "@expo/vector-icons";
import { CameraRef } from "@maplibre/maplibre-react-native";
import { useSelector } from "react-redux";
import { getLocationFromAddress } from "@/api/products/products";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAPTILER_TILE_URL =
  "https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=JuPN71U2EkJ43IuG7rM2";
const OrderDetails = () => {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const user = useSelector((state: any) => state.user);
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [routeCoords, setRouteCoords] = useState<Array<[number, number]>>([]);
  const cameraRef = useRef<CameraRef>(null);
  const shopLat = 21.0177002;
  const shopLng = 105.7807554;
  const [customerLocation, setCustomerLocation] = useState<{
    lat: number;
    lon: number;
  } | null>(null);
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
        console.log("Order data:", data);

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
  useEffect(() => {
    const fetchLocation = async () => {
      if (!order.deliverAddress) {
        setCustomerLocation(null);
        setRouteCoords([]);
        return;
      }

      setIsLoadingLocation(true);
      try {
        const location = await getLocationFromAddress(order.deliverAddress);
        if (location && location.length > 0) {
          setCustomerLocation({
            lat: parseFloat(location[0].lat),
            lon: parseFloat(location[0].lon),
          });
        } else {
          setCustomerLocation(null);
          setRouteCoords([]);
        }
      } catch (error) {
        console.error("Error fetching customer location:", error);
        setCustomerLocation(null);
        setRouteCoords([]);
      } finally {
        setIsLoadingLocation(false);
      }
    };

    fetchLocation();
  }, [order.deliverAddress]);
  useEffect(() => {
    if (!customerLocation) return;

    const osrmUrl =
      `https://router.project-osrm.org/route/v1/driving/` +
      `${shopLng},${shopLat};${customerLocation.lon},${customerLocation.lat}` +
      `?overview=full&geometries=geojson`;

    fetch(osrmUrl)
      .then((res) => res.json())
      .then((json) => {
        if (json.routes && json.routes.length) {
          setRouteCoords(json.routes[0].geometry.coordinates);
        } else {
          setRouteCoords([]);
        }
      })
      .catch((err) => {
        console.error("OSRM fetch error:", err);
        setRouteCoords([]);
      });
  }, [customerLocation]);

  useEffect(() => {
    if (routeCoords.length > 0 && cameraRef.current) {
      const lats = routeCoords.map((c) => c[1]);
      const lngs = routeCoords.map((c) => c[0]);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);

      cameraRef.current.fitBounds([minLng, minLat], [maxLng, maxLat], 50, 1000);
    }
  }, [routeCoords]);

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
      {/* MAP */}
      <Text style={styles.sectionTitle}>Watch Delivery</Text>
      <View style={styles.mapWrapper}>
        {isLoadingLocation ? (
          <View style={styles.loadingContainer}>
            <Text>Loading address information...</Text>
          </View>
        ) : !order.deliverAddress ? (
          <View style={styles.noAddressContainer}>
            <Text style={styles.noAddressText}>
              You have not entered a delivery address.
            </Text>
            <Pressable
              style={styles.addAddressButton}
              onPress={() => router.push("/(tabs)/payment/checkout")}
            >
              <Text style={styles.addAddressButtonText}>Add Address</Text>
            </Pressable>
          </View>
        ) : (
          <DeliveryTrackingMap
            shopLat={shopLat}
            shopLng={shopLng}
            customerLocation={customerLocation}
            routeCoords={routeCoords}
            MAPTILER_TILE_URL={MAPTILER_TILE_URL}
          />
        )}
      </View>

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
          <View key={`${order.id}-${item.id}`} style={styles.itemContainer}>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
    marginVertical: 20,
  },
  mapWrapper: {
    height: SCREEN_HEIGHT * 0.5,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#ccc",
    marginBottom: 20,
  },
  map: {
    flex: 1,
  },
  markerShop: {
    width: 32,
    height: 32,
    backgroundColor: "#007AFF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 2,
  },
  markerCust: {
    width: 32,
    height: 32,
    backgroundColor: "#FF3B30",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  noAddressContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noAddressText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
  },
  addAddressButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addAddressButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OrderDetails;
