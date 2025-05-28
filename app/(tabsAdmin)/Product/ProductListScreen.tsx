import React, { useEffect, useState } from 'react';
import {
    View, Text, FlatList, TouchableOpacity, Image, StyleSheet,
    ActivityIndicator, Alert, Modal, TextInput, ScrollView
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { 
    getAllItemsByCategory, 
    createBaseProduct, 
    updateBaseProduct, 
    deleteBaseProduct 
} from "@/api/admin/admin"; 
// import { RootState } from '@/store';
type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
    category: string;
};

type RouteParams = {
    category: string;
};

const ProductListScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { category } = route.params as RouteParams;
    
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const token = useSelector((state: any) => state.user.token); // Added type annotation
    
    // Form states
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        imageUrl: ''
    });

    useEffect(() => {
        loadProducts();
    }, [category]);

    const loadProducts = async () => {
        try {
            setLoading(true);
            console.log('Loading products for category:', category);
            console.log('Token available:', !!token);
            
            const data = await getAllItemsByCategory(category);
            console.log('API Response:', data);
            console.log('Products count:', data?.length || 0);
            
            setProducts(data || []); // Ensure it's always an array
        } catch (error) {
            console.error('Lỗi khi tải sản phẩm:', error);
            console.error('Error details:', JSON.stringify(error, null, 2));
            Alert.alert('Lỗi', 'Không thể tải danh sách sản phẩm');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingProduct(null);
        setFormData({
            name: '',
            description: '',
            price: '',
            quantity: '',
            imageUrl: ''
        });
        setModalVisible(true);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            quantity: product.quantity.toString(),
            imageUrl: product.imageUrl
        });
        setModalVisible(true);
    };

    const handleDelete = (product: Product) => {
        Alert.alert(
            'Xác nhận xóa',
            `Bạn có chắc chắn muốn xóa sản phẩm "${product.name}"?`,
            [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Xóa', style: 'destructive', onPress: () => confirmDelete(product.id) }
            ]
        );
    };

    const confirmDelete = async (id: number) => {
        try {
            await deleteBaseProduct(id, token);
            setProducts(products.filter(p => p.id !== id));
            Alert.alert('Thành công', 'Xóa sản phẩm thành công');
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
            Alert.alert('Lỗi', 'Không thể xóa sản phẩm');
        }
    };

    const handleSave = async () => {
        if (!formData.name || !formData.price) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }

        const productData = {
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity) || 0,
            imageUrl: formData.imageUrl,
            category: category
        };

        try {
            if (editingProduct) {
                const updatedProduct = await updateBaseProduct(editingProduct.id, productData, token);
                setProducts(products.map(p =>
                    p.id === editingProduct.id ? { ...updatedProduct, id: editingProduct.id } : p
                ));
                Alert.alert('Thành công', 'Cập nhật sản phẩm thành công');
            } else {
                const newProduct = await createBaseProduct(productData, token);
                setProducts([...products, newProduct]);
                Alert.alert('Thành công', 'Thêm sản phẩm thành công');
            }
            setModalVisible(false);
        } catch (error) {
            console.error('Lỗi khi lưu sản phẩm:', error);
            Alert.alert('Lỗi', 'Không thể lưu sản phẩm');
        }
    };

    const renderProductItem = ({ item }: { item: Product }) => (
        <View style={styles.productCard}>
            <Image source={{ uri: item.imageUrl || 'https://via.placeholder.com/80' }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
                <Text style={styles.productQuantity}>Số lượng: {item.quantity}</Text>
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
                        
                        <Text style={styles.inputLabel}>Tên sản phẩm *</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.name}
                            onChangeText={(text) => setFormData({...formData, name: text})}
                            placeholder="Nhập tên sản phẩm"
                        />

                        <Text style={styles.inputLabel}>Mô tả</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={formData.description}
                            onChangeText={(text) => setFormData({...formData, description: text})}
                            placeholder="Nhập mô tả sản phẩm"
                            multiline
                            numberOfLines={3}
                        />

                        <Text style={styles.inputLabel}>Giá *</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.price}
                            onChangeText={(text) => setFormData({...formData, price: text})}
                            placeholder="Nhập giá sản phẩm"
                            keyboardType="numeric"
                        />

                        <Text style={styles.inputLabel}>Số lượng</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.quantity}
                            onChangeText={(text) => setFormData({...formData, quantity: text})}
                            placeholder="Nhập số lượng"
                            keyboardType="numeric"
                        />

                        <Text style={styles.inputLabel}>URL hình ảnh</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.imageUrl}
                            onChangeText={(text) => setFormData({...formData, imageUrl: text})}
                            placeholder="Nhập URL hình ảnh"
                        />

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

    // Debug render - show what's happening
    console.log('Render - Loading:', loading, 'Products:', products.length);

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
        borderBottomColor: '#e0e0e0'
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
    }
});

export default ProductListScreen;