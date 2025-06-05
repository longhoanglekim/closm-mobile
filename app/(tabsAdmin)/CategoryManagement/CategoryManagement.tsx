// src/screens/CategoryManagementScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  getAllItemsByCategory,
  createBaseProduct,
  updateBaseProduct,
  deleteBaseProduct,
} from '@/api/admin/admin'; 

const CategoryManagementScreen = () => {
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const [editId, setEditId] = useState(''); 
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('');

  const [deleteId, setDeleteId] = useState('');

  const [queryCategory, setQueryCategory] = useState('');
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);

  const handleCreateBaseProduct = async () => {
    if (!newName.trim() || !newCategory.trim()) {
      Alert.alert('Lỗi', 'Bạn cần nhập ít nhất tên và category.');
      return;
    }

    try {
      const payload = {
        name: newName,
        description: newDescription,
        category: newCategory,
      };

      const result = await createBaseProduct(payload, '<YOUR_ADMIN_TOKEN>');
      Alert.alert('Thành công', `Đã tạo base product với ID: ${result.id}`);
      setNewName('');
      setNewDescription('');
      setNewCategory('');
    } catch (err) {
      console.error(err);
      Alert.alert('Lỗi khi tạo base product', err.message || 'Unknown error');
    }
  };

  const handleUpdateBaseProduct = async () => {
    if (!editId.trim()) {
      Alert.alert('Lỗi', 'Bạn cần nhập ID để cập nhật.');
      return;
    }
    const id = parseInt(editId, 10);
    if (isNaN(id)) {
      Alert.alert('Lỗi', 'ID phải là một số nguyên hợp lệ.');
      return;
    }

    try {
      const payload = {
        ...(editName.trim() !== '' && { name: editName }),
        ...(editDescription.trim() !== '' && { description: editDescription }),
        ...(editCategory.trim() !== '' && { category: editCategory }),
      };
      if (Object.keys(payload).length === 0) {
        Alert.alert('Lỗi', 'Bạn cần nhập ít nhất một trường để cập nhật.');
        return;
      }

      const result = await updateBaseProduct(id, payload, '<YOUR_ADMIN_TOKEN>');
      Alert.alert('Thành công', `Đã cập nhật base product ID ${id}`);
      setEditId('');
      setEditName('');
      setEditDescription('');
      setEditCategory('');
    } catch (err) {
      console.error(err);
      Alert.alert('Lỗi khi cập nhật base product', err.message || 'Unknown error');
    }
  };

  const handleDeleteBaseProduct = async () => {
    if (!deleteId.trim()) {
      Alert.alert('Lỗi', 'Bạn cần nhập ID để xóa.');
      return;
    }
    const id = parseInt(deleteId, 10);
    if (isNaN(id)) {
      Alert.alert('Lỗi', 'ID phải là một số nguyên hợp lệ.');
      return;
    }

    Alert.alert(
      'Xác nhận',
      `Bạn có chắc chắn muốn xóa base product ID ${id}?`,
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteBaseProduct(id, '<YOUR_ADMIN_TOKEN>');
              Alert.alert('Thành công', `Đã xóa base product ID ${id}`);
              setDeleteId('');
            } catch (err) {
              console.error(err);
              Alert.alert('Lỗi khi xóa base product', err.message || 'Unknown error');
            }
          },
        },
      ]
    );
  };

  const handleFetchItems = async () => {
    if (!queryCategory.trim()) {
      Alert.alert('Lỗi', 'Bạn cần nhập tên category để tìm.');
      return;
    }
    setLoadingItems(true);
    setItems([]);
    try {
      const data = await getAllItemsByCategory(queryCategory.trim());
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      Alert.alert('Lỗi khi lấy items', err.message || 'Unknown error');
    } finally {
      setLoadingItems(false);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>ID: {item.id}  •  Name: {item.name}</Text>
        <Text style={styles.itemText}>Price: {item.price}  •  Color: {item.color}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý danh mục (Base Product)</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Tạo mới Base Product</Text>
        <TextInput
          style={styles.input}
          placeholder="Tên sản phẩm"
          value={newName}
          onChangeText={setNewName}
        />
        <TextInput
          style={styles.input}
          placeholder="Mô tả"
          value={newDescription}
          onChangeText={setNewDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={newCategory}
          onChangeText={setNewCategory}
        />
        <Button title="Tạo mới" onPress={handleCreateBaseProduct} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Cập nhật Base Product</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập ID cần cập nhật"
          value={editId}
          onChangeText={setEditId}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Tên mới (bỏ trống nếu không đổi)"
          value={editName}
          onChangeText={setEditName}
        />
        <TextInput
          style={styles.input}
          placeholder="Mô tả mới (bỏ trống nếu không đổi)"
          value={editDescription}
          onChangeText={setEditDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Category mới (bỏ trống nếu không đổi)"
          value={editCategory}
          onChangeText={setEditCategory}
        />
        <Button title="Cập nhật" onPress={handleUpdateBaseProduct} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Xóa Base Product</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập ID cần xóa"
          value={deleteId}
          onChangeText={setDeleteId}
          keyboardType="numeric"
        />
        <Button title="Xóa" color="red" onPress={handleDeleteBaseProduct} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Xem Items theo Category</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên category"
          value={queryCategory}
          onChangeText={setQueryCategory}
        />
        <Button title="Tìm Items" onPress={handleFetchItems} />

        {loadingItems && <ActivityIndicator style={{ marginTop: 10 }} />}

        {items.length > 0 && (
          <FlatList
            style={{ marginTop: 10, maxHeight: 200 }}
            data={items}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
          />
        )}

        {!loadingItems && items.length === 0 && queryCategory.trim() !== '' && (
          <Text style={{ marginTop: 10, fontStyle: 'italic', color: '#555' }}>
            Chưa có item nào hoặc chưa tìm thấy kết quả.
          </Text>
        )}
      </View>
    </View>
  );
};

export default CategoryManagementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  section: {
    marginVertical: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 8,
  },
  itemContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  },
});
