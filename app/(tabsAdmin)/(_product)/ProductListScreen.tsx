import React, { useEffect, useState } from 'react';
import {
    View, Text, FlatList, TouchableOpacity, Image, StyleSheet,
    ActivityIndicator, Alert, Modal, TextInput, ScrollView
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import {
    getAllItemsByCategory,
    createItem,
    updateItem,
    deleteItem
} from "@/api/admin/admin";

type ProductItem = {
    id: number;
    category: string;
    price: number;
    imageUrl: string;
    size: string;
    color: string;
    quantity: number;
    tag: string;
    description: string;
};

type RouteParams = {
    category: string;
};

const ProductListScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { category } = route.params as RouteParams;

    const [products, setProducts] = useState<ProductItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
    const token = useSelector((state: any) => state.user.token);

    // Không khai báo base_product_id ở đây!
    const [formData, setFormData] = useState({
        price: '',
        size: '',
        color: '',
        quantity: '',
        tag: '',
        imageUrl: '',
        description: '',
    });

    useEffect(() => {
        loadProducts();
    }, [category]);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await getAllItemsByCategory(category);
            setProducts(data || []);
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể tải danh sách sản phẩm');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingProduct(null);
        setFormData({
            price: '',
            size: '',
            color: '',
            quantity: '',
            tag: '',
            imageUrl: '',
            description: '',
        });
        setModalVisible(true);
    };

    const handleEdit = (product: ProductItem) => {
        setEditingProduct(product);
        setFormData({
            price: product.price?.toString() || '',
            size: product.size || '',
            color: product.color || '',
            quantity: product.quantity?.toString() || '',
            tag: product.tag || '',
            imageUrl: product.imageUrl || '',
            description: product.description || '',
        });
        setModalVisible(true);
    };

    const handleDelete = (product: ProductItem) => {
        Alert.alert(
            'Xác nhận xóa',
            `Bạn có chắc chắn muốn xóa sản phẩm này?`,
            [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Xóa', style: 'destructive', onPress: () => confirmDelete(product.id) }
            ]
        );
    };

    const confirmDelete = async (id: number) => {
        try {
            await deleteItem(id, token);
            setProducts(products.filter(p => p.id !== id));
            Alert.alert('Thành công', 'Xóa sản phẩm thành công');
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể xóa sản phẩm');
        }
    };

    const handleSave = async () => {
        if (!formData.price || !formData.size || !formData.color) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }

        const itemData = {
            category: category, 
            price: parseFloat(formData.price),
            size: formData.size,
            color: formData.color,
            quantity: parseInt(formData.quantity) || 0,
            tag: formData.tag,
            imageUrl: formData.imageUrl,
            description: formData.description,
        };

        try {
            if (editingProduct) {
                const updated = await updateItem(editingProduct.id, itemData, token);
                setProducts(products.map(p =>
                    p.id === editingProduct.id ? { ...updated, id: editingProduct.id } : p
                ));
                Alert.alert('Thành công', 'Cập nhật sản phẩm thành công');
            } else {
                const created = await createItem(itemData, token);
                setProducts([...products, created]);
                Alert.alert('Thành công', 'Thêm sản phẩm thành công');
            }
            setModalVisible(false);
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể lưu sản phẩm');
            console.error('Lỗi khi lưu sản phẩm:', error);
        }
    };


    const renderProductItem = ({ item }: { item: ProductItem }) => (
        <View style={styles.productCard}>
            <Image source={{ uri: item.imageUrl}} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.tag || item.size}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
                <Text style={styles.productPrice}>Giá: {item.price?.toLocaleString()} đ</Text>
                <Text style={styles.productQuantity}>Số lượng: {item.quantity}</Text>
                <Text style={styles.productDescSmall}>Màu: {item.color} | Size: {item.size}</Text>
            </View>
            <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                    <Text style={styles.buttonText}>Sửa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)}>
                    <Text style={styles.buttonText}>Xóa</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderForm = () => (
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ScrollView>
                        <Text style={styles.modalTitle}>
                            {editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
                        </Text>
                        <Text style={styles.inputLabel}>Giá *</Text>
                        <TextInput style={styles.input} value={formData.price}
                            onChangeText={text => setFormData({ ...formData, price: text })}
                            placeholder="Nhập giá sản phẩm" keyboardType="numeric" />

                        <Text style={styles.inputLabel}>Size *</Text>
                        <TextInput style={styles.input} value={formData.size}
                            onChangeText={text => setFormData({ ...formData, size: text })}
                            placeholder="Nhập size sản phẩm" />

                        <Text style={styles.inputLabel}>Màu *</Text>
                        <TextInput style={styles.input} value={formData.color}
                            onChangeText={text => setFormData({ ...formData, color: text })}
                            placeholder="Nhập màu sản phẩm" />

                        <Text style={styles.inputLabel}>Số lượng</Text>
                        <TextInput style={styles.input} value={formData.quantity}
                            onChangeText={text => setFormData({ ...formData, quantity: text })}
                            placeholder="Nhập số lượng" keyboardType="numeric" />

                        <Text style={styles.inputLabel}>Tag</Text>
                        <TextInput style={styles.input} value={formData.tag}
                            onChangeText={text => setFormData({ ...formData, tag: text })}
                            placeholder="Nhập tag (nếu có)" />

                        <Text style={styles.inputLabel}>URL hình ảnh</Text>
                        <TextInput style={styles.input} value={formData.imageUrl}
                            onChangeText={text => setFormData({ ...formData, imageUrl: text })}
                            placeholder="Nhập URL hình ảnh" />

                        <Text style={styles.inputLabel}>Mô tả</Text>
                        <TextInput style={[styles.input, styles.textArea]} value={formData.description}
                            onChangeText={text => setFormData({ ...formData, description: text })}
                            placeholder="Nhập mô tả sản phẩm" multiline numberOfLines={3} />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.buttonText}>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>← Quay lại</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{category}</Text>
                <TouchableOpacity style={styles.addButton} onPress={handleCreate}>
                    <Text style={styles.addButtonText}>+ Thêm</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" style={styles.loader} />
            ) : products.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Không có sản phẩm nào trong danh mục này</Text>
                    <TouchableOpacity style={styles.addButton} onPress={handleCreate}>
                        <Text style={styles.addButtonText}>Thêm sản phẩm đầu tiên</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={products}
                    renderItem={renderProductItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
            )}

            {renderForm()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        marginTop:50,
    },
    backButton: {
        fontSize: 16,
        color: '#007AFF'
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    addButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    loader: {
        flex: 1,
        justifyContent: 'center'
    },
    listContainer: {
        padding: 16
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 6,
        marginRight: 12
    },
    productInfo: {
        flex: 1
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007AFF',
        marginBottom: 2
    },
    productQuantity: {
        fontSize: 12,
        color: '#888'
    },
    actionButtons: {
        flexDirection: 'column'
    },
    editButton: {
        backgroundColor: '#FFA500',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        marginBottom: 4
    },
    deleteButton: {
        backgroundColor: '#FF4444',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        maxHeight: '80%'
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 10,
        fontSize: 16
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top'
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    cancelButton: {
        backgroundColor: '#888',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 6
    },
    saveButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 6
    },
    productDescSmall: {
        fontSize: 12,
        color: '#888'
    },
    emptyText: {
        fontSize: 18,
        color: "#64748b",
        textAlign: "center",
        marginBottom: 18,
        fontWeight: "500",
        opacity: 0.95,
      },
});

export default ProductListScreen;