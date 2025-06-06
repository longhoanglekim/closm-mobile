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

import MapLibreGL from "@maplibre/maplibre-react-native";
import LoginScreen from "./login";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ProfileScreen() {
  const user = useSelector((state: any) => state.user);
  const router = useRouter();

  const handleFilter = (item: string) => {
    router.push("/(tabs)/profile/orders?status=" + item);
  };

  // Nếu chưa login, hiển thị màn hình Login
  if (!user.isLoggedIn) {
    return <LoginScreen />;
  }

  // =================== 1. Toạ độ Shop & Khách ===============
  const shopLat = 21.0177002;
  const shopLng = 105.7807554;
  const custLat = 21.03;
  const custLng = 105.78;

  // ========== 2. Lấy route từ OSRM public API ================
  const [routeCoords, setRouteCoords] = useState<Array<[number, number]>>([]);
  const mapRef = useRef<MapLibreGL.MapView>(null);
  const cameraRef = useRef<MapLibreGL.Camera>(null);

  useEffect(() => {
    const osrmUrl =
      `https://router.project-osrm.org/route/v1/driving/` +
      `${shopLng},${shopLat};${custLng},${custLat}` +
      `?overview=full&geometries=geojson`;

    fetch(osrmUrl)
      .then((res) => res.json())
      .then((json) => {
        if (json.routes && json.routes.length) {
          const coords: Array<[number, number]> = json.routes[0].geometry.coordinates;
          setRouteCoords(coords);
        }
      })
      .catch((err) => {
        console.error("OSRM fetch error:", err);
      });
  }, []);

  // ========== 3. Khi routeCoords thay đổi, gọi fitBounds ==========
  useEffect(() => {
    if (routeCoords.length > 0 && cameraRef.current) {
      const lats = routeCoords.map((c) => c[1]);
      const lngs = routeCoords.map((c) => c[0]);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);

      cameraRef.current.fitBounds(
        [minLng, minLat],  // southwest: [lng, lat]
        [maxLng, maxLat],  // northeast
        50,                // padding in px
        1000               // animation duration in ms
      );
    }
  }, [routeCoords]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ==================== HEADER ==================== */}
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
        </View>

        {/* ==================== SERVICES ==================== */}
        <Text style={styles.sectionTitle}>Services</Text>
        <View style={styles.gridContainer}>
          {[
            { icon: "credit-card", label: "ShopeePay", desc: "Nhận combo 300.000đ" },
            { icon: "shopping-cart", label: "Mua trước trả sau", desc: "SPayLater" },
            { icon: "gift", label: "Shopee Xu", desc: "Nhận xu mỗi ngày" },
            { icon: "tags", label: "Kho Voucher", desc: "50+ voucher" },
          ].map((service, index) => (
            <View key={index} style={styles.gridBox}>
              <FontAwesome name={service.icon} size={24} style={styles.gridIcon} />
              <View>
                <Text style={styles.gridLabel}>{service.label}</Text>
                <Text style={styles.gridDesc}>{service.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* ==================== THEO DÕI GIAO HÀNG (MAPLIBRE) ==================== */}
        <Text style={styles.sectionTitle}>Theo dõi giao hàng</Text>
        <View style={styles.mapWrapper}>
          <MapLibreGL.MapView
            ref={mapRef}
            style={styles.map}
            styleURL={null}
          >
            {/* Camera để điều khiển fitBounds */}
            <MapLibreGL.Camera
              ref={cameraRef}
              // Trung điểm ban đầu (chỉ để render tạm)
              centerCoordinate={[ (shopLng + custLng) / 2, (shopLat + custLat) / 2 ]}
              zoomLevel={13}
              animationDuration={0}
            />

            {/* RasterSource dùng tile từ MapTiler OSM */}
            <MapLibreGL.RasterSource
              id="maptiler-osm"
              tileUrlTemplates={[
                "https://api.maptiler.com/maps/openstreetmap/256/{z}/{x}/{y}.jpg?key=JuPN71U2EkJ43IuG7rM2",
              ]}
              tileSize={256}
            >
              <MapLibreGL.RasterLayer
                id="osmRasterLayer"
                sourceID="maptiler-osm"
                style={{ rasterOpacity: 1 }}
              />
            </MapLibreGL.RasterSource>

            {/* Marker Shop */}
            <MapLibreGL.PointAnnotation
              id="shopMarker"
              coordinate={[shopLng, shopLat]}
            >
              <View style={styles.markerShop}>
                <FontAwesome name="home" size={20} color="#fff" />
              </View>
              <MapLibreGL.Callout title="Shop: 48 ngõ 50 Đình Thôn" />
            </MapLibreGL.PointAnnotation>

            {/* Marker Khách hàng */}
            <MapLibreGL.PointAnnotation
              id="custMarker"
              coordinate={[custLng, custLat]}
            >
              <View style={styles.markerCust}>
                <FontAwesome name="user" size={20} color="#fff" />
              </View>
              <MapLibreGL.Callout title="Khách hàng" />
            </MapLibreGL.PointAnnotation>

            {/* Polyline (nếu đã load được routeCoords) */}
            {routeCoords.length > 0 && (
              <MapLibreGL.ShapeSource
                id="routeSource"
                shape={{
                  type: "Feature",
                  geometry: {
                    type: "LineString",
                    coordinates: routeCoords, // [ [lng,lat], ... ]
                  },
                }}
              >
                <MapLibreGL.LineLayer
                  id="routeLineLayer"
                  sourceID="routeSource"
                  style={{
                    lineColor: "#007AFF",
                    lineWidth: 4,
                    lineOpacity: 0.8,
                  }}
                />
              </MapLibreGL.ShapeSource>
            )}
          </MapLibreGL.MapView>
        </View>

        {/* ==================== FINANCIAL ==================== */}
        <Text style={styles.sectionTitle}>Financial</Text>
        <View style={styles.gridContainer}>
          {[
            { icon: "money", label: "Tài chính", desc: "Xem thêm dịch vụ" },
            { icon: "shield", label: "Bảo hiểm", desc: "Gói bảo hiểm mini" },
          ].map((item, index) => (
            <View key={index} style={styles.gridBox}>
              <FontAwesome name={item.icon} size={24} style={styles.gridIcon} />
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

// === STYLE ===
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

  // Style cho bản đồ MapLibre
  mapWrapper: {
    height: SCREEN_HEIGHT * 0.5, // hoặc chỉnh cụ thể như 300
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
});
