// screens/CategoryManagementScreen.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

// Giả sử bạn đã định nghĩa sẵn trong api/categoryApi.ts
// import các hàm call API category ở đây:
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/api/admin/admin";

// Nếu bạn dùng TypeScript, định nghĩa interface cho Category:
interface Category {
  id: number;
  name: string;
}

interface Props {
  navigation: any;
  route: any;
}

const CategoryManagementScreen: React.FC<Props> = ({ navigation }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>(""); // Lấy từ AsyncStorage/Redux/Context tùy dự án
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState<string>("");

  // Dùng useIsFocused để refetch mỗi khi quay trở lại màn hình này
  const isFocused = useIsFocused();

  useEffect(() => {
    // TODO: Lấy token từ AsyncStorage hoặc Context nếu cần
    // Ví dụ giả định: AsyncStorage.getItem("userToken").then((t) => t && setToken(t));
    if (isFocused) {
      fetchCategories();
    }
  }, [isFocused]);

  // 1. Hàm load tất cả category
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getAllCategories();
      setCategories(data);
    } catch (error: any) {
      console.log("Lỗi khi tải category:", error);
      Alert.alert("Lỗi", error.message || "Không thể tải danh mục");
    } finally {
      setLoading(false);
    }
  };

  // 2. Tạo mới một category
  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      Alert.alert("Cảnh báo", "Tên danh mục không được để trống.");
      return;
    }
    setLoading(true);
    try {
      await createCategory(newCategoryName.trim(), token);
      setNewCategoryName("");
      await fetchCategories();
      Alert.alert("Thành công", "Đã tạo danh mục mới.");
    } catch (error: any) {
      console.log("Lỗi tạo category:", error);
      Alert.alert("Lỗi", error.message || "Tạo danh mục thất bại");
    } finally {
      setLoading(false);
    }
  };

  // 3. Xóa một category
  const handleDeleteCategory = (id: number) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa danh mục này không?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              await deleteCategory(id, token);
              await fetchCategories();
              Alert.alert("Thành công", "Đã xóa danh mục.");
            } catch (error: any) {
              console.log("Lỗi xóa category:", error);
              Alert.alert("Lỗi", error.message || "Xóa danh mục thất bại");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  // 4. Bắt đầu sửa một category: cho hiển thị TextInput lên
  const startEditing = (category: Category) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  // 5. Hủy sửa (trả về trạng thái bình thường)
  const cancelEditing = () => {
    setEditingId(null);
    setEditingName("");
  };

  // 6. Gửi request cập nhật category lên server
  const submitUpdateCategory = async () => {
    if (editingId === null) return;
    if (!editingName.trim()) {
      Alert.alert("Cảnh báo", "Tên danh mục không được để trống.");
      return;
    }
    setLoading(true);
    try {
      await updateCategory(editingId, editingName.trim(), token);
      setEditingId(null);
      setEditingName("");
      await fetchCategories();
      Alert.alert("Thành công", "Đã cập nhật danh mục.");
    } catch (error: any) {
      console.log("Lỗi cập nhật category:", error);
      Alert.alert("Lỗi", error.message || "Cập nhật danh mục thất bại");
    } finally {
      setLoading(false);
    }
  };

  // 7. Render mỗi dòng của FlatList (mỗi category)
  const renderItem = ({ item }: { item: Category }) => {
    const isEditing = editingId === item.id;
    return (
      <View style={styles.categoryRow}>
        {isEditing ? (
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={editingName}
            onChangeText={setEditingName}
            placeholder="Nhập tên mới..."
            autoFocus
          />
        ) : (
          <Text style={styles.categoryText}>{item.name}</Text>
        )}

        {isEditing ? (
          <>
            <TouchableOpacity
              style={[styles.btn, styles.btnSave]}
              onPress={submitUpdateCategory}
            >
              <Text style={styles.btnText}>Lưu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.btnCancel]}
              onPress={cancelEditing}
            >
              <Text style={styles.btnText}>Hủy</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.btn, styles.btnEdit]}
              onPress={() => startEditing(item)}
            >
              <Text style={styles.btnText}>Sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.btnDelete]}
              onPress={() => handleDeleteCategory(item.id)}
            >
              <Text style={styles.btnText}>Xóa</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quản lý danh mục</Text>

      {/* Phần form thêm mới category */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên danh mục mới..."
          value={newCategoryName}
          onChangeText={setNewCategoryName}
        />
        <TouchableOpacity
          style={[styles.btn, styles.btnAdd]}
          onPress={handleCreateCategory}
        >
          <Text style={styles.btnText}>Thêm</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách category */}
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          style={{ marginTop: 12 }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Chưa có danh mục nào</Text>
          )}
        />
      )}
    </View>
  );
};

export default CategoryManagementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F9F9F9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#FFF",
  },
  btn: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  btnAdd: {
    backgroundColor: "#28A745",
  },
  btnEdit: {
    backgroundColor: "#FFC107",
  },
  btnDelete: {
    backgroundColor: "#DC3545",
  },
  btnSave: {
    backgroundColor: "#007AFF",
  },
  btnCancel: {
    backgroundColor: "#6C757D",
  },
  btnText: {
    color: "#FFF",
    fontWeight: "600",
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: "#FFF",
    borderRadius: 6,
  },
  categoryText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  separator: {
    height: 8,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    color: "#666",
  },
});
