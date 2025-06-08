import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

import { getAllOrders } from "@/api/order/order";

const { width } = Dimensions.get("window");

type StatItem = {
  title: string;
  value: string;
  change: string;
  color: string;
};

type MenuItemType = {
  icon: string;
  title: string;
  subtitle: string;
  color: string;
  route: any;
};

type OrderType = {
  id: number | string;
  orderId?: number | string;
  userEmail: string;
  orderDate: string;
  orderStatus: string;
  orderCode?: string;
  discountAmount: number;
  deliverPayment: number;
  finalPrice: number;
  paymentStatus: string;
  paymentMethod: string;
  deliverAddress: string;
  cancelableDate: string;
  orderItemList: any[];
  customerName?: string;
  totalAmount?: number;
};

const ORDER_STATUSES = [
  { value: "PENDING", label: "Chờ xử lý" },
  { value: "CONFIRMED", label: "Đã xác nhận" },
  { value: "IN_TRANSIT", label: "Đang giao" },
  { value: "DELIVERED", label: "Đã giao" },
  { value: "CANCELLED", label: "Đã hủy" },
];

const DashboardAdmin = () => {
  const router = useRouter();
  const token = useSelector((state: any) => state.user.token);
  // Lấy số thông báo chat chưa đọc
    // Lấy số thông báo chat chưa đọc (nếu chưa có chat slice, trả về 0)
  const unreadCount = useSelector((state: any) => state.chat?.unreadCount ?? 0);

  // State cho thống kê / menu
  const stats: StatItem[] = [
    { title: "Tổng doanh thu", value: "125.5M", change: "+12%", color: "#4CAF50" },
    { title: "Đơn hàng hôm nay", value: "43", change: "+8%", color: "#2196F3" },
    { title: "Sản phẩm", value: "1,247", change: "+15%", color: "#FF9800" },
    { title: "Khách hàng", value: "8,932", change: "+5%", color: "#9C27B0" },
  ];

  const menuItems: MenuItemType[] = [
    {
      icon: "📦",
      title: "Quản lý sản phẩm",
      subtitle: "Thêm, sửa, xóa sản phẩm",
      color: "#FF6B6B",
      route: "/(tabsAdmin)/Product/ProductManagement",
    },
    {
      icon: "🛍️",
      title: "Quản lý đơn hàng",
      subtitle: "Theo dõi đơn hàng",
      color: "#4ECDC4",
      route: "/(tabsAdmin)/OrderManagement/OrderManagement",
    },
    {
      icon: "🏷️",
      title: "Quản lý danh mục",
      subtitle: "Phân loại sản phẩm",
      color: "#FFEAA7",
      route: "/(tabsAdmin)/CategoryManagement/CategoryManagement",
    },
    {
      icon: "👥",
      title: "Quản lý khách hàng",
      subtitle: "Thông tin khách hàng",
      color: "#45B7D1",
      route: "/admin/customers",
    },
    {
      icon: "📊",
      title: "Báo cáo thống kê",
      subtitle: "Phân tích doanh số",
      color: "#96CEB4",
      route: "/admin/reports",
    },
    {
      icon: "💰",
      title: "Quản lý khuyến mãi",
      subtitle: "Tạo mã giảm giá",
      color: "#DDA0DD",
      route: "/admin/promotions",
    },
    {
      icon: "📱",
      title: "Quản lý banner",
      subtitle: "Quảng cáo trang chủ",
      color: "#98D8C8",
      route: "/admin/banners",
    },
    {
      icon: "⚙️",
      title: "Cài đặt hệ thống",
      subtitle: "Cấu hình ứng dụng",
      color: "#F7DC6F",
      route: "/admin/settings",
    },
  ];

  // === PHẦN MỚI: State và fetch “recent orders” ===
  const [recentOrders, setRecentOrders] = useState<OrderType[]>([]);
  const [loadingOrders, setLoadingOrders] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Format tiền và trạng thái
  const formatPrice = (price?: number) => (price?.toLocaleString("vi-VN") || "0") + "đ";
  const getStatusText = (status?: string) => {
    switch (status?.toUpperCase()) {
      case "PENDING": return "Chờ xử lý";
      case "CONFIRMED": return "Đã xác nhận";
      case "IN_TRANSIT": return "Đang giao";
      case "DELIVERED": return "Đã giao";
      case "CANCELLED": return "Đã hủy";
      default: return status || "Không xác định";
    }
  };
  const getStatusColor = (status?: string) => {
    switch (status?.toUpperCase()) {
      case "PENDING": return "#FF9800";
      case "CONFIRMED": return "#007AFF";
      case "IN_TRANSIT": return "#5856D6";
      case "DELIVERED": return "#4CAF50";
      case "CANCELLED": return "#F44336";
      default: return "#8E8E93";
    }
  };

  const fetchRecentOrders = async () => {
    setLoadingOrders(true);
    try {
      const allOrders: OrderType[] = await getAllOrders(token);
      const sorted = allOrders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
      setRecentOrders(sorted.slice(0, 3));
    } catch (err) {
      console.error("Lỗi khi fetch recent orders:", err);
      setRecentOrders([]);
    }
    setLoadingOrders(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRecentOrders();
    setRefreshing(false);
  };

  useEffect(() => { fetchRecentOrders(); }, []);

  // Thẻ hiển thị đơn hàng nhỏ
  const OrderCardSmall = ({ order }: { order: OrderType }) => {
    const displayId = order.orderCode ? `#${order.orderCode}` : `#${order.id}`;
    const customerName = order.customerName || order.userEmail;
    const amount = formatPrice(order.totalAmount ?? order.finalPrice);
    const statusText = getStatusText(order.orderStatus);
    const statusColor = getStatusColor(order.orderStatus);

    return (
      <View style={styles.orderItem}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderId}>{displayId}</Text>
          <Text style={styles.customerName}>{customerName}</Text>
        </View>
        <View style={styles.orderRight}>
          <Text style={styles.orderAmount}>{amount}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>  
            <Text style={styles.statusText}>{statusText}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#667eea"]} />
        }
      >
        {/* Header */}
        <View style={styles.headerPlain}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.welcomeText}>Xin chào Admin! 👋</Text>
              <Text style={styles.headerTitle}>Bảng điều khiển</Text>
            </View>
            {/* Chat icon với badge */}
            <TouchableOpacity style={styles.profileButton} onPress={() => router.push("/view/ChatRoom")}>
              <View style={styles.iconContainer}>
                <Text style={styles.profileText}>📨</Text>
                {unreadCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{unreadCount > 99 ? "99+" : unreadCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
            {/* Profile icon */}
            <TouchableOpacity style={styles.profileButton} >
              <Text style={styles.profileText}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Thống kê tổng quan</Text>
          <View style={styles.statsGrid}>
            {stats.map((item, i) => <StatCard key={i} item={item} />)}
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Đơn hàng gần đây</Text>
            <TouchableOpacity onPress={() => router.push("/(tabsAdmin)/OrderManagement/OrderManagement")}>  
              <Text style={styles.viewAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ordersContainer}>
            {loadingOrders ? (
              <ActivityIndicator size="small" color="#667eea" />
            ) : recentOrders.length > 0 ? (
              recentOrders.map((o, idx) => <OrderCardSmall key={idx} order={o} />)
            ) : (
              <View style={styles.emptyContainer}><Text style={styles.emptyText}>Chưa có đơn hàng nào</Text></View>
            )}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chức năng quản lý</Text>
          <View style={styles.menuGrid}>
            {menuItems.map((item, idx) => <MenuItem key={idx} item={item} />)}
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardAdmin;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  headerPlain: { paddingHorizontal: 20, paddingVertical: 30, borderBottomLeftRadius: 25, borderBottomRightRadius: 25, backgroundColor: "#667eea" },
  headerContent: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  welcomeText: { color: "white", fontSize: 16, opacity: 0.9 },
  headerTitle: { color: "white", fontSize: 28, fontWeight: "bold", marginTop: 5 },
  profileButton: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: "rgba(255,255,255,0.2)", justifyContent: "center", alignItems: "center", marginLeft: 10 },
  profileText: { fontSize: 20 },
  iconContainer: { position: "relative" },
  badge: { position: "absolute", top: -4, right: -4, minWidth: 16, height: 16, paddingHorizontal: 3, backgroundColor: "red", borderRadius: 8, justifyContent: "center", alignItems: "center" },
  badgeText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  statsContainer: { padding: 20, marginTop: -15, backgroundColor: "white", marginHorizontal: 15, borderRadius: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#333", marginBottom: 15 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  statCard: { width: (width - 70) / 2, backgroundColor: "white", padding: 15, borderRadius: 12, borderLeftWidth: 4, marginBottom: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  statValue: { fontSize: 24, fontWeight: "bold", color: "#333" },
  statTitle: { fontSize: 14, color: "#666", marginTop: 5 },
  statChange: { fontSize: 12, fontWeight: "600", marginTop: 3 },
  section: { padding: 20 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
  viewAllText: { color: "#667eea", fontSize: 14, fontWeight: "600" },
  menuGrid: { gap: 12 },
  menuItem: { flexDirection: "row", alignItems: "center", backgroundColor: "white", padding: 16, borderRadius: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2, marginBottom: 12 },
  menuIcon: { width: 50, height: 50, borderRadius: 25, justifyContent: "center", alignItems: "center", marginRight: 15 },
  menuIconText: { fontSize: 24 },
  menuContent: { flex: 1 },
  menuTitle: { fontSize: 16, fontWeight: "600", color: "#333", marginBottom: 4 },
  menuSubtitle: { fontSize: 14, color: "#666" },
  menuArrow: { fontSize: 24, color: "#ccc", fontWeight: "300" },
  ordersContainer: { backgroundColor: "white", borderRadius: 12, padding: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  orderItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  orderInfo: { flex: 1 },
  orderId: { fontSize: 16, fontWeight: "600", color: "#333" },
  customerName: { fontSize: 14, color: "#666", marginTop: 2 },
  orderRight: { alignItems: "flex-end" },
  orderAmount: { fontSize: 16, fontWeight: "600", color: "#333", marginBottom: 5 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { color: "white", fontSize: 12, fontWeight: "600" },
  emptyContainer: { paddingVertical: 20 },
  emptyText: { fontSize: 14, color: "#666", textAlign: "center" },
});

// Component StatCard & MenuItem nên được tách riêng hoặc khai báo trên cùng file
function StatCard({ item }: { item: StatItem }) {
  return (
    <View style={[styles.statCard, { borderLeftColor: item.color }]}>      
      <Text style={styles.statValue}>{item.value}</Text>
      <Text style={styles.statTitle}>{item.title}</Text>
      <Text style={[styles.statChange, { color: item.color }]}>{item.change}</Text>
    </View>
  );
}

function MenuItem({ item }: { item: MenuItemType }) {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.menuItem} onPress={() => router.push(item.route)}>
      <View style={[styles.menuIcon, { backgroundColor: item.color + "20" }]}>        
        <Text style={styles.menuIconText}>{item.icon}</Text>
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
      </View>
      <Text style={styles.menuArrow}>›</Text>
    </TouchableOpacity>
  );
}
