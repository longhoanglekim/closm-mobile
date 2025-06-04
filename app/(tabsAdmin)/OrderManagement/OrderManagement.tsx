import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  StyleSheet,
  RefreshControl,
  Modal,
  ScrollView,
  Image,
} from "react-native";
import { getAllOrders, deleteOrder, updateOrder } from "@/api/order/order"; 
import { useSelector } from "react-redux";

interface OrderItemInfo {
  id: number;
  price: number;
  imageUrl: string;
  tag: string;
  size: string;
  color: string;
  description: string;
  orderedQuantity: number;
}

interface OrderType {
  id: number | string;
  orderId?: number | string;      
  userEmail: string;
  orderDate: string;        
  orderStatus: string;
  orderCode: string;
  discountAmount: number;
  deliverPayment: number;
  finalPrice: number;
  paymentStatus: string;
  paymentMethod: string;
  deliverAddress: string;
  cancelableDate: string;   
  orderItemList: OrderItemInfo[];

    customerName?: string;  
  totalAmount?: number;  
}


const ORDER_STATUSES = [
  { value: "PENDING",   label: "Chờ xử lý" },
  { value: "CONFIRMED", label: "Đã xác nhận" },
  { value: "SHIPPING",  label: "Đang giao" },
  { value: "DELIVERED", label: "Đã giao" },
  { value: "CANCELLED", label: "Đã hủy" },
];

export default function OrderManagementScreen() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState<string | undefined>(undefined);
  const token = useSelector((state: any) => state.user.token);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getAllOrders(token);
      console.log("Dữ liệu đơn hàng từ API:", data);
      setOrders(data);
    } catch (e) {
      console.error("ERROR:", e);
      Alert.alert("Lỗi", "Không thể tải danh sách đơn hàng");
    }
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = (id: string | number) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa đơn hàng này không?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          onPress: async () => {
            try {
              await deleteOrder(id, token);
              await fetchOrders();
              Alert.alert("Thành công", "Đã xóa đơn hàng");
            } catch {
              Alert.alert("Lỗi", "Không thể xóa đơn hàng");
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "#FF9500";
      case "confirmed":
        return "#007AFF";
      case "shipping":
        return "#5856D6";
      case "delivered":
        return "#34C759";
      case "cancelled":
        return "#FF3B30";
      default:
        return "#8E8E93";
    }
  };

  const getStatusText = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "Chờ xử lý";
      case "confirmed":
        return "Đã xác nhận";
      case "shipping":
        return "Đang giao";
      case "delivered":
        return "Đã giao";
      case "cancelled":
        return "Đã hủy";
      default:
        return status || "Không xác định";
    }
  };

  const formatPrice = (price?: number) => {
    return (price?.toLocaleString("vi-VN") || "0") + "đ";
  };


  const showOrderDetails = (order: OrderType) => {
    setSelectedOrder(order);
    setNewStatus(order.orderStatus);
    setModalVisible(true);
  };

const handleUpdateStatus = async () => {
  if (!selectedOrder || !newStatus) {
    Alert.alert("Lỗi", "Vui lòng chọn trạng thái mới.");
    return;
  }
  if (newStatus === selectedOrder.orderStatus) {
    setModalVisible(false);
    return;
  }

  setUpdatingStatus(true);
  try {

    const updateOrderInfoDTO = {

      id: selectedOrder.id,


      userEmail: selectedOrder.userEmail,
      orderDate: selectedOrder.orderDate,
      orderStatus: newStatus,               
      orderCode: selectedOrder.orderCode,
      discountAmount: selectedOrder.discountAmount ?? 0,
      deliverPayment: selectedOrder.deliverPayment ?? 0,
      finalPrice: selectedOrder.finalPrice ?? 0,
      paymentStatus: selectedOrder.paymentStatus ?? "UNPAID",
      paymentMethod: selectedOrder.paymentMethod ?? "CASH",
      deliverAddress: selectedOrder.deliverAddress ?? "",
      cancelableDate: selectedOrder.cancelableDate ?? "",


      orderItemList: selectedOrder.orderItemList || [],
    };

 
    await updateOrder(
      selectedOrder.id!,      
      updateOrderInfoDTO,     
      token                    
    );

    setOrders(prev =>
      prev.map(o =>
        o.id === selectedOrder.id
          ? { ...o, orderStatus: newStatus }
          : o
      )
    );

    Alert.alert("Thành công", "Đã cập nhật trạng thái đơn hàng.");
    setModalVisible(false);
  } catch (err: any) {
    console.error("Lỗi khi cập nhật trạng thái:", err.message);
    Alert.alert("Lỗi", err.message || "Không thể cập nhật trạng thái.");
  }
  setUpdatingStatus(false);
};


  const renderOrderItem = ({ item }: { item: OrderType }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderIdLabel}>Đơn hàng</Text>
          <Text style={styles.orderId}>#{item.id || item.orderId}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.orderStatus) },
          ]}
        >
          <Text style={styles.statusText}>
            {getStatusText(item.orderStatus)}
          </Text>
        </View>
      </View>

      <View style={styles.customerInfo}>
        <Text style={styles.customerLabel}>Khách hàng</Text>
        <Text style={styles.customerName}>
          {item.customerName || item.userEmail}
        </Text>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.totalLabel}>Tổng tiền</Text>
        <Text style={styles.totalAmount}>
          {formatPrice(item.totalAmount || item.finalPrice)}
        </Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.detailButton}
          onPress={() => showOrderDetails(item)}
        >
          <Text style={styles.detailButtonText}>Chi tiết</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            const id = item.id ?? item.orderId;
            if (id === undefined) {
              Alert.alert("Lỗi", "Không tìm thấy ID đơn hàng!");
              return;
            }
            handleDelete(id);
          }}
        >
          <Text style={styles.deleteButtonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOrderDetailsModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              Chi tiết đơn hàng #{selectedOrder?.id || selectedOrder?.orderId}
            </Text>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalScrollView}>
            {/* Thông tin chung */}
            <View style={styles.orderDetailsSection}>
              <Text style={styles.sectionTitle}>Thông tin đơn hàng</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Mã đơn:</Text>
                <Text style={styles.detailValue}>
                  #{selectedOrder?.id || selectedOrder?.orderId}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Khách hàng:</Text>
                <Text style={styles.detailValue}>
                  {selectedOrder?.customerName || selectedOrder?.userEmail}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Trạng thái hiện tại:</Text>
                <View
                  style={[
                    styles.statusBadgeSmall,
                    {
                      backgroundColor: getStatusColor(
                        selectedOrder?.orderStatus
                      ),
                    },
                  ]}
                >
                  <Text style={styles.statusTextSmall}>
                    {getStatusText(selectedOrder?.orderStatus)}
                  </Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Tổng tiền:</Text>
                <Text style={styles.detailValuePrice}>
                  {formatPrice(
                    selectedOrder?.totalAmount || selectedOrder?.finalPrice
                  )}
                </Text>
              </View>
            </View>

            {/* Danh sách sản phẩm */}
            {Array.isArray(selectedOrder?.orderItemList) &&
            selectedOrder.orderItemList.length > 0 ? (
              <View style={styles.productsSection}>
                <Text style={styles.sectionTitle}>
                  Sản phẩm ({selectedOrder.orderItemList.length})
                </Text>
                {selectedOrder.orderItemList.map((product, idx) => (
                  <View
                    key={`${product.id}-${idx}`}
                    style={styles.productItem}
                  >
                    {product.imageUrl && (
                      <Image
                        source={{ uri: product.imageUrl }}
                        style={styles.productImage}
                        resizeMode="cover"
                      />
                    )}
                    <View style={styles.productInfo}>
                      <Text style={styles.productName}>{product.tag}</Text>
                      <Text style={styles.productVariant}>
                        {product.size} • {product.color}
                      </Text>
                      <View style={styles.productPriceRow}>
                        <Text style={styles.productPrice}>
                          {formatPrice(product.price)}
                        </Text>
                        <Text style={styles.productQuantity}>
                          x{product.orderedQuantity}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.productsSection}>
                <Text
                  style={{
                    color: "#aaa",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  Không có sản phẩm trong đơn hàng
                </Text>
              </View>
            )}

            {/* Phần chọn trạng thái mới */}
            <View style={styles.updateStatusSection}>
              <Text style={styles.sectionTitle}>Cập nhật trạng thái</Text>

              {ORDER_STATUSES.map((st) => {
                const current = selectedOrder?.orderStatus;
                const isSelected = st.value === newStatus;
                return (
                  <TouchableOpacity
                    key={st.value}
                    style={[
                      styles.statusOption,
                      {
                        backgroundColor: isSelected
                          ? getStatusColor(st.value)
                          : "#F0F0F0",
                      },
                    ]}
                    onPress={() => setNewStatus(st.value)}
                    disabled={st.value === current} 
                  >
                    <Text
                      style={[
                        styles.statusOptionText,
                        {
                          color: isSelected
                            ? "#FFF"
                            : getStatusColor(st.value),
                        },
                      ]}
                    >
                      {st.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}

              <TouchableOpacity
                style={styles.saveStatusButton}
                onPress={handleUpdateStatus}
                disabled={updatingStatus}
              >
                <Text style={styles.saveStatusButtonText}>
                  {updatingStatus ? "Đang lưu..." : "Lưu thay đổi"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Đang tải đơn hàng...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quản lý đơn hàng</Text>
        <Text style={styles.headerSubtitle}>{orders.length} đơn hàng</Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) =>
          item.id?.toString() ||
          item.orderId?.toString() ||
          Math.random().toString()
        }
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#007AFF"]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không có đơn hàng nào</Text>
          </View>
        }
      />

      {renderOrderDetailsModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  listContainer: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  orderIdContainer: {
    flex: 1,
  },
  orderIdLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  customerInfo: {
    marginBottom: 12,
  },
  customerLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  customerName: {
    fontSize: 14,
    color: "#333",
  },
  priceContainer: {
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  actionContainer: {
    flexDirection: "row",
    gap: 12,
  },
  detailButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  detailButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
    minHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#666",
  },
  modalScrollView: {
    flex: 1,
  },
  orderDetailsSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    flex: 2,
    textAlign: "right",
  },
  detailValuePrice: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "bold",
    flex: 2,
    textAlign: "right",
  },
  statusBadgeSmall: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusTextSmall: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  productsSection: {
    padding: 20,
  },
  productItem: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  productVariant: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  productPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
  productQuantity: {
    fontSize: 12,
    color: "#666",
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  // Phần cập nhật trạng thái
  updateStatusSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  statusOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  statusOptionText: {
    fontSize: 14,
    fontWeight: "600",
  },
  saveStatusButton: {
    marginTop: 12,
    backgroundColor: "#34C759",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveStatusButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
