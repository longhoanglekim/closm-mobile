import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSelector } from "react-redux";
import {
  getAllItemsByCategory,
  createBaseProduct,
  updateBaseProduct,
  deleteBaseProduct,
} from "@/api/admin/admin";

const CategoryManagementScreen = () => {
  const token = useSelector((state: any) => state.user.token);
  const userInfo = useSelector((state: any) => state.user.userInfo);

  useEffect(() => {
    if (!token || userInfo?.role !== "ROLE_ADMIN") {
      Alert.alert("Lỗi", "Bạn cần đăng nhập với quyền ADMIN để truy cập.");
    }
  }, [token, userInfo]);

  const [newCategory, setNewCategory] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");

  const [editId, setEditId] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");

  const [deleteId, setDeleteId] = useState("");

  const [queryCategory, setQueryCategory] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);

  const handleCreateBaseProduct = async () => {
    if (!newCategory.trim() || !newImageUrl.trim()) {
      Alert.alert("Lỗi", "Bạn cần nhập category và imageUrl.");
      return;
    }
    if (!token) {
      Alert.alert("Lỗi", "Chưa có token. Vui lòng đăng nhập.");
      return;
    }
    try {
      const payload = {
        category: newCategory,
        imageUrl: newImageUrl,
      };
      const result = await createBaseProduct(payload, token);
      Alert.alert("Thành công", `Đã tạo base product với ID: ${result.id}`);
      setNewCategory("");
      setNewImageUrl("");
    } catch (err: any) {
      Alert.alert("Lỗi khi tạo base product", err.message || "Unknown error");
    }
  };

  const handleUpdateBaseProduct = async () => {
    if (!editId.trim()) {
      Alert.alert("Lỗi", "Bạn cần nhập ID để cập nhật.");
      return;
    }
    if (!token) {
      Alert.alert("Lỗi", "Chưa có token. Vui lòng đăng nhập.");
      return;
    }
    const id = parseInt(editId, 10);
    if (isNaN(id)) {
      Alert.alert("Lỗi", "ID phải là một số nguyên hợp lệ.");
      return;
    }
    if (!editCategory.trim() || !editImageUrl.trim()) {
      Alert.alert("Lỗi", "Bạn cần nhập category và imageUrl.");
      return;
    }
    try {
      const payload = {
        category: editCategory,
        imageUrl: editImageUrl,
      };
      await updateBaseProduct(id, payload, token);
      Alert.alert("Thành công", `Đã cập nhật base product ID ${id}`);
      setEditId("");
      setEditCategory("");
      setEditImageUrl("");
    } catch (err: any) {
      Alert.alert("Lỗi khi cập nhật base product", err.message || "Unknown error");
    }
  };

  const handleDeleteBaseProduct = async () => {
    if (!deleteId.trim()) {
      Alert.alert("Lỗi", "Bạn cần nhập ID để xóa.");
      return;
    }
    if (!token) {
      Alert.alert("Lỗi", "Chưa có token. Vui lòng đăng nhập.");
      return;
    }
    const id = parseInt(deleteId, 10);
    if (isNaN(id)) {
      Alert.alert("Lỗi", "ID phải là một số nguyên hợp lệ.");
      return;
    }
    Alert.alert(
      "Xác nhận",
      `Bạn có chắc chắn muốn xóa base product ID ${id}?`,
      [
        { text: "Huỷ", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteBaseProduct(id, token);
              Alert.alert("Thành công", `Đã xóa base product ID ${id}`);
              setDeleteId("");
            } catch (err: any) {
              Alert.alert("Lỗi khi xóa base product", err.message || "Unknown error");
            }
          },
        },
      ]
    );
  };

  const handleFetchItems = async () => {
    if (!queryCategory.trim()) {
      Alert.alert("Lỗi", "Bạn cần nhập tên category để tìm.");
      return;
    }
    setLoadingItems(true);
    setItems([]);
    try {
      const data = await getAllItemsByCategory(queryCategory.trim());
      setItems(Array.isArray(data) ? data : []);
    } catch (err: any) {
      Alert.alert("Lỗi khi lấy items", err.message || "Unknown error");
    }
    setLoadingItems(false);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>ID: {item.id}  •  Name: {item.name}</Text>
      <Text style={styles.itemText}>Price: {item.price}  •  Color: {item.color}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quản lý danh mục (Base Product)</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Tạo mới Base Product</Text>
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={newCategory}
          onChangeText={setNewCategory}
        />
        <TextInput
          style={styles.input}
          placeholder="Image URL"
          value={newImageUrl}
          onChangeText={setNewImageUrl}
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
          placeholder="Category mới"
          value={editCategory}
          onChangeText={setEditCategory}
        />
        <TextInput
          style={styles.input}
          placeholder="Image URL mới"
          value={editImageUrl}
          onChangeText={setEditImageUrl}
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

        {!loadingItems && items.length === 0 && queryCategory.trim() !== "" && (
          <Text style={{ marginTop: 10, fontStyle: "italic", color: "#555" }}>
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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  section: {
    marginVertical: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "#f9f9f9",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 8,
  },
  itemContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 14,
    color: "#333",
  },
});
