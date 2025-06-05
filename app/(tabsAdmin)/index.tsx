import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const { width } = Dimensions.get('window');
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

const DashboardAdmin = () => {

  const router = useRouter();
  const stats = [
    { title: "Tổng doanh thu", value: "125.5M", change: "+12%", color: "#4CAF50" },
    { title: "Đơn hàng hôm nay", value: "43", change: "+8%", color: "#2196F3" },
    { title: "Sản phẩm", value: "1,247", change: "+15%", color: "#FF9800" },
    { title: "Khách hàng", value: "8,932", change: "+5%", color: "#9C27B0" }
  ];

  const menuItems = [
    { icon: "📦", title: "Quản lý sản phẩm", subtitle: "Thêm, sửa, xóa sản phẩm", color: "#FF6B6B", route: "/(tabsAdmin)/Product/ProductManagement" },
    { icon: "🛍️", title: "Quản lý đơn hàng", subtitle: "Theo dõi đơn hàng", color: "#4ECDC4", route: "/(tabsAdmin)/OrderManagement/OrderManagement" },
    { icon: "🏷️", title: "Quản lý danh mục", subtitle: "Phân loại sản phẩm", color: "#FFEAA7", route: "/(tabsAdmin)/CategoryManagement/CategoryManagement" },

    { icon: "👥", title: "Quản lý khách hàng", subtitle: "Thông tin khách hàng", color: "#45B7D1", route: "/admin/products" },
    { icon: "📊", title: "Báo cáo thống kê", subtitle: "Phân tích doanh số", color: "#96CEB4", route: "/admin/products" },
    { icon: "🏷️", title: "Quản lý danh mục", subtitle: "Phân loại sản phẩm", color: "#FFEAA7", route: "/admin/products" },
    { icon: "💰", title: "Quản lý khuyến mãi", subtitle: "Tạo mã giảm giá", color: "#DDA0DD", route: "/admin/products" },
    { icon: "📱", title: "Quản lý banner", subtitle: "Quảng cáo trang chủ", color: "#98D8C8", route: "/admin/products" },
    { icon: "⚙️", title: "Cài đặt hệ thống", subtitle: "Cấu hình ứng dụng", color: "#F7DC6F", route: "/admin/products" }
  ];

  const recentOrders = [
    { id: "#ORD-001", customer: "Nguyễn Văn A", amount: "1,250,000đ", status: "Đang xử lý" },
    { id: "#ORD-002", customer: "Trần Thị B", amount: "850,000đ", status: "Đã giao" },
    { id: "#ORD-003", customer: "Lê Văn C", amount: "2,100,000đ", status: "Chờ thanh toán" }
  ];

  const StatCard = ({ item }: { item: StatItem }) => (
    <View style={[styles.statCard, { borderLeftColor: item.color }]}>
      <Text style={styles.statValue}>{item.value}</Text>
      <Text style={styles.statTitle}>{item.title}</Text>
      <Text style={[styles.statChange, { color: item.color }]}>{item.change}</Text>
    </View>
  );

  const MenuItem = ({ item }: { item: MenuItemType }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => router.push(item.route)}

    >
      <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
        <Text style={styles.menuIconText}>{item.icon}</Text>
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{item.title}</Text>
        <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
      </View>
      <Text style={styles.menuArrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerPlain}>

          <View style={styles.headerContent}>
            <View>
              <Text style={styles.welcomeText}>Xin chào Admin! 👋</Text>
              <Text style={styles.headerTitle}>Bảng điều khiển</Text>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <Text style={styles.profileText}>📨</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileButton}>
              <Text style={styles.profileText}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Cards */}
        {/* <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Thống kê tổng quan</Text>
          <View style={styles.statsGrid}>
            {stats.map((item, index) => (
              <StatCard key={index} item={item} />
            ))}
          </View>
        </View> */}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chức năng quản lý</Text>
          <View style={styles.menuGrid}>
            {menuItems.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Đơn hàng gần đây</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ordersContainer}>
            {recentOrders.map((order, index) => (
              <View key={index} style={styles.orderItem}>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <Text style={styles.customerName}>{order.customer}</Text>
                </View>
                <View style={styles.orderRight}>
                  <Text style={styles.orderAmount}>{order.amount}</Text>
                  <View style={[styles.statusBadge,
                  {
                    backgroundColor: order.status === 'Đã giao' ? '#4CAF50' :
                      order.status === 'Đang xử lý' ? '#FF9800' : '#F44336'
                  }
                  ]}>
                    <Text style={styles.statusText}>{order.status}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Bottom Padding */}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerPlain: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: '#667eea',
  },

  header: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    color: 'white',
    fontSize: 16,
    opacity: 0.9,
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 5,
  },
  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 20,
  },
  statsContainer: {
    padding: 20,
    marginTop: -15,
    backgroundColor: 'white',
    marginHorizontal: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 70) / 2,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  statChange: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  viewAllText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '600',
  },
  menuGrid: {
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  menuIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuIconText: {
    fontSize: 24,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  menuArrow: {
    fontSize: 24,
    color: '#ccc',
    fontWeight: '300',
  },
  ordersContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  customerName: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default DashboardAdmin;