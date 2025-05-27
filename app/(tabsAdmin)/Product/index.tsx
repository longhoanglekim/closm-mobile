import React, { useEffect, useState } from 'react';
import {
    View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getCategories, getProductOverview } from '@/api/products/products';

type ProductOverviewItem = {
    id: number;
    tag: string;
    quantity: number;
    imageUrl: string;
};

type CategoryOverview = {
    category: string;
    quantity: number;
    variants: ProductOverviewItem[];
};


const CategoryScreen = () => {
    const navigation = useNavigation();
    const [overview, setOverview] = useState<CategoryOverview[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [catRes, overviewRes] = await Promise.all([
                    getCategories(),
                    getProductOverview()
                ]);
                setCategories(catRes);
                setOverview(overviewRes);
            } catch (error) {
                console.error("Lỗi khi tải danh mục:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const getFirstImageByCategory = (category: string): string => {
        const foundCategory = overview.find(o => o.category === category);
        return foundCategory?.variants?.[0]?.imageUrl || 'https://via.placeholder.com/100';
    };

    const getQuantityByCategory = (category: string): number => {
        const foundCategory = overview.find(o => o.category === category);
        return foundCategory?.quantity || 0;
    };


    const handlePress = (category: string) => {
        navigation.navigate('ProductList', { category });
    };

    const renderItem = ({ item }: { item: string }) => (
        <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
            <Image source={{ uri: getFirstImageByCategory(item) }} style={styles.image} />
            <Text style={styles.title}>{item}</Text>
            <Text style={styles.count}>{getQuantityByCategory(item)} items</Text>
        </TouchableOpacity>
    );


    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.header}>📚 Danh mục sản phẩm</Text>
            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList
                    data={categories}
                    renderItem={renderItem}
                    keyExtractor={(item) => item}
                    numColumns={2}
                    contentContainerStyle={styles.container}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 8,
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 2
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 8,
        marginBottom: 8
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15
    },
    count: {
        color: '#666',
        fontSize: 12
    }
});

export default CategoryScreen;
