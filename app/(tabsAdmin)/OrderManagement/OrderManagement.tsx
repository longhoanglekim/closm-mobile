import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { getAllOrders, deleteOrder } from "@/api/order/order";
import { useSelector } from "react-redux";

interface OrderType {
    id?: number | string;
    orderId?: number | string;
    customerName?: string;
    userEmail?: string;
    status?: string;
    totalAmount?: number;
    finalPrice?: number;
    items?: OrderItemInfo[];
}

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

export default function OrderManagementScreen() {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [loading, setLoading] = useState(true);
    const token = useSelector((state: any) => state.user.token);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const data = await getAllOrders(token);
            setOrders(data.orders || data); 
        } catch (e) {
            Alert.alert("Lỗi tải danh sách đơn hàng");
        }
        setLoading(false);
    };

    useEffect(() => { fetchOrders(); }, []);

    const handleDelete = (id: string | number) => {
        Alert.alert("Xác nhận", "Bạn có muốn xóa đơn hàng này không?", [
            { text: "Huỷ" },
            {
                text: "Xoá",
                onPress: async () => {
                    await deleteOrder(id, token);
                    fetchOrders();
                },
                style: "destructive"
            }
        ]);
    };

    if (loading) return <ActivityIndicator />;

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 12 }}>Danh sách đơn hàng</Text>
            <FlatList
                data={orders}
                keyExtractor={item => (item.id?.toString() || item.orderId?.toString() || Math.random().toString())}
                renderItem={({ item }) => (
                    <View style={{
                        marginBottom: 12,
                        backgroundColor: "#fff",
                        borderRadius: 12,
                        padding: 16,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.06,
                        shadowRadius: 4,
                        elevation: 2
                    }}>
                        <Text>Mã đơn: {item.id || item.orderId}</Text>
                        <Text>Khách hàng: {item.customerName || item.userEmail}</Text>
                        <Text>Trạng thái: {item.status}</Text>
                        <Text>Tổng: {item.totalAmount || item.finalPrice}đ</Text>
                        <View style={{ flexDirection: "row", marginTop: 8 }}>
                            <TouchableOpacity onPress={() => {
                                {
                                    item.items && (
                                        <View style={{ marginTop: 8, marginBottom: 8, paddingLeft: 6 }}>
                                            <Text style={{ fontWeight: "bold" }}>Danh sách sản phẩm:</Text>
                                            {item.items.map(product => (
                                                <Text key={product.id} style={{ fontSize: 13, color: "#555" }}>
                                                    - {product.tag} ({product.size}, {product.color}): x{product.orderedQuantity}
                                                </Text>
                                            ))}
                                        </View>
                                    )
                                }
                            }}>
                                <Text style={{ color: "#007bff", marginRight: 16 }}>Chi tiết</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    const id = item.id ?? item.orderId;
                                    if (id === undefined) {
                                        Alert.alert("Không tìm thấy ID đơn hàng!");
                                        return;
                                    }
                                    handleDelete(id);
                                }}
                            >
                                <Text style={{ color: "red" }}>Xoá</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                )}
            />
        </View>
    );
}
