import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";
import { getCategories } from "@/api/products/products"; 

const ProductCategoryScreen = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (err) {
                setCategories([]);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <ActivityIndicator style={{flex:1}} />;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chọn danh mục sản phẩm:</Text>
            <FlatList
                data={categories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => router.push({ pathname: "/(tabsAdmin)/Product/ProductListScreen", params: { category: item } })}
                    >
                        <Text style={styles.itemText}>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#fff" },
    title: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
    item: { padding: 16, borderBottomWidth: 1, borderBottomColor: "#eee" },
    itemText: { fontSize: 16 },
});
export default ProductCategoryScreen;
