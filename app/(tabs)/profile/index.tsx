import React, { useRef, useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { getLocationFromAddress } from "@/api/products/products";

import {
  MapView,
  Camera,
  RasterSource,
  RasterLayer,
  PointAnnotation,
  ShapeSource,
  LineLayer,
  CameraRef
} from "@maplibre/maplibre-react-native";

import LoginScreen from "./login";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const MAPTILER_TILE_URL =
  "https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=JuPN71U2EkJ43IuG7rM2";

export default function ProfileScreen() {
  const user = useSelector((state: any) => state.user);
  const router = useRouter();
  const [customerLocation, setCustomerLocation] = useState<{lat: number, lon: number} | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [routeCoords, setRouteCoords] = useState<Array<[number, number]>>([]);
  const cameraRef = useRef<CameraRef>(null);

  const shopLat = 21.0177002;
  const shopLng = 105.7807554;

  const handleFilter = (item: string) => {
    router.push({ pathname: "/(tabs)/profile/orders", params: { status: item } });
  };

  useEffect(() => {
    const fetchLocation = async () => {
      if (!user.shippingAddress) {
        setCustomerLocation(null);
        setRouteCoords([]);
        return;
      }
      
      setIsLoadingLocation(true);
      try {
        const location = await getLocationFromAddress(user.shippingAddress + ', Việt Nam');
        if (location && location.length > 0) {
          setCustomerLocation({
            lat: parseFloat(location[0].lat),
            lon: parseFloat(location[0].lon)
          });
        } else {
          setCustomerLocation(null);
          setRouteCoords([]);
        }
      } catch (error) {
        console.error('Error fetching customer location:', error);
        setCustomerLocation(null);
        setRouteCoords([]);
      } finally {
        setIsLoadingLocation(false);
      }
    };

    fetchLocation();
  }, [user.shippingAddress]);

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

      cameraRef.current.fitBounds(
        [minLng, minLat],
        [maxLng, maxLat],
        50,
        1000
      );
    }
  }, [routeCoords]);

  if (!user.isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://www.iconpacks.net/icons/1/free-user-icon-295-thumb.png",
            }}
            style={styles.avatar}
          />
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.greeting}>{user.userInfo.fullName}</Text>
            <View style={styles.memberBadge}>
              <Text style={{ fontWeight: "bold", color: "#fff" }}>Member</Text>
            </View>
          </View>
          <Pressable onPress={() => router.push("/(tabs)/profile/setting")}>
            <FontAwesome name="cog" size={24} color="black" />
          </Pressable>
        </View>

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

        {/* MAP */}
        <Text style={styles.sectionTitle}>Theo dõi giao hàng</Text>
        <View style={styles.mapWrapper}>
          {isLoadingLocation ? (
            <View style={styles.loadingContainer}>
              <Text>Đang tải thông tin địa chỉ...</Text>
            </View>
          ) : !user.shippingAddress ? (
            <View style={styles.noAddressContainer}>
              <Text style={styles.noAddressText}>Bạn chưa nhập địa chỉ giao hàng.</Text>
              <Pressable
                style={styles.addAddressButton}
                onPress={() => router.push("/(tabs)/payment/checkout")}
              >
                <Text style={styles.addAddressButtonText}>Thêm địa chỉ</Text>
              </Pressable>
            </View>
          ) : (
            <MapView style={styles.map}>
              <Camera
                ref={cameraRef}
                centerCoordinate={[(shopLng + (customerLocation?.lon || shopLng)) / 2, (shopLat + (customerLocation?.lat || shopLat)) / 2]}
                zoomLevel={13}
              />

              <RasterSource
                id="maptiler-osm"
                tileUrlTemplates={[MAPTILER_TILE_URL]}
                tileSize={256}
              >
                <RasterLayer
                  id="osmRasterLayer"
                  sourceID="maptiler-osm"
                  style={{ rasterOpacity: 1 }}
                />
              </RasterSource>

              {/* Marker Shop */}
              <PointAnnotation id="shopMarker" coordinate={[shopLng, shopLat]}>
                <View style={styles.markerShop}>
                  <FontAwesome name="home" size={20} color="#fff" />
                </View>
              </PointAnnotation>

              {/* Marker Khách hàng */}
              {customerLocation && (
                <PointAnnotation id="custMarker" coordinate={[customerLocation.lon, customerLocation.lat]}>
                  <View style={styles.markerCust}>
                    <FontAwesome name="user" size={20} color="#fff" />
                  </View>
                </PointAnnotation>
              )}

              {/* Route polyline */}
              {routeCoords.length > 0 && (
                <ShapeSource
                  id="routeSource"
                  shape={{
                    type: "Feature",
                    geometry: { type: "LineString", coordinates: routeCoords },
                    properties: {}
                  }}
                >
                  <LineLayer
                    id="routeLineLayer"
                    sourceID="routeSource"
                    style={{ lineColor: "#007AFF", lineWidth: 4, lineOpacity: 0.8 }}
                  />
                </ShapeSource>
              )}
            </MapView>
          )}
        </View>

        {/* SERVICES */}
        <Text style={styles.sectionTitle}>Services</Text>
        <View style={styles.gridContainer}>
          {[
            { icon: "credit-card", label: "ShopeePay", desc: "Nhận combo 300.000đ" },
            { icon: "shopping-cart", label: "Mua trước trả sau", desc: "SPayLater" },
            { icon: "gift", label: "Shopee Xu", desc: "Nhận xu mỗi ngày" },
            { icon: "tags", label: "Kho Voucher", desc: "50+ voucher" },
          ].map((service, index) => (
            <View key={index} style={styles.gridBox}>
              <FontAwesome name={service.icon as any} size={24} style={styles.gridIcon} />
              <View>
                <Text style={styles.gridLabel}>{service.label}</Text>
                <Text style={styles.gridDesc}>{service.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* FINANCIAL */}
        <Text style={styles.sectionTitle}>Financial</Text>
        <View style={styles.gridContainer}>
          {[
            { icon: "money", label: "Tài chính", desc: "Xem thêm dịch vụ" },
            { icon: "shield", label: "Bảo hiểm", desc: "Gói bảo hiểm mini" },
          ].map((item, idx) => (
            <View key={idx} style={styles.gridBox}>
              <FontAwesome name={item.icon as any} size={24} style={styles.gridIcon} />
              <View>
                <Text style={styles.gridLabel}>{item.label}</Text>
                <Text style={styles.gridDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
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
  memberBadge: {
    marginLeft: 30,
    backgroundColor: "#8BD9FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
    marginVertical: 20,
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
  orderButtonText: { color: "#fff", fontWeight: "600" },
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  noAddressContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noAddressText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  addAddressButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addAddressButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
