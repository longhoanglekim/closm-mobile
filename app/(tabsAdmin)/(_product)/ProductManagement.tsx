import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    FlatList, 
    ActivityIndicator, 
    StyleSheet, 
    SafeAreaView,
    StatusBar,
    Dimensions,
    ScrollView,
    Animated
} from 'react-native';
import { useRouter } from "expo-router";
import { getCategories } from "@/api/products/products";

const { width } = Dimensions.get('window');

const COLORS = {
    primary: "#5B8DF6",
    secondary: "#E5F0FD",
    cardBg: "#FFFFFF",
    cardShadow: "#D6E4FF",
    iconBg: "#F0F6FF",
    textDark: "#22223B",
    textLight: "#5B8DF6"
};

const iconMap = {
    'T-Shirt': '👕',
    'Hoodie': '🧥',
    'Socks': '🧦',
    'Sweater': '🧶',
    'Shorts': '🩳',
    'Jeans': '👖',
    'Winter Pants': '🥶',
    'Shoes': '👟',
    'Accessories': '👜',
    'Hat': '🧢',
    'Jacket': '🧥',
    'Dress': '👗',
    'Skirt': '🩳'
};

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

    const renderCategoryItem = ({ item, index }: { item: string, index: number }) => (
        <TouchableOpacity
            style={[
                styles.categoryCard,
                {
                    marginTop: index < 2 ? 0 : 18,
                    shadowColor: COLORS.primary,
                    shadowOpacity: 0.15,
                    elevation: 7
                }
            ]}
            onPress={() => router.push({ 
                pathname: "/(tabsAdmin)/(_product)/ProductListScreen", 
                params: { category: item } 
            })}
            activeOpacity={0.92}
        >
            <View style={styles.cardInner}>
                <View style={styles.iconCircle}>
                    <Text style={styles.categoryIcon}>{iconMap[item] || "📦"}</Text>
                </View>
                <View style={styles.categoryContent}>
                    <Text style={styles.categoryName}>{item}</Text>
                    <Text style={styles.categorySubtext}>Quản lý sản phẩm</Text>
                </View>
                <View style={styles.arrowBox}>
                    <Text style={styles.arrow}>›</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
                <View style={styles.loadingContent}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                    <Text style={styles.loadingText}>Đang tải danh mục...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.secondary} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Quản Lý Sản Phẩm</Text>
                <Text style={styles.headerSubtitle}>Chọn danh mục để tiếp tục</Text>
            </View>

            {/* Categories Grid */}
            <ScrollView 
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.categoriesContainer}>
                    <FlatList
                        data={categories}
                        keyExtractor={(item) => item}
                        renderItem={renderCategoryItem}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                        scrollEnabled={false}
                        ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
                    />
                </View>

                {/* Stats Card */}
                <View style={styles.statsCard}>
                    <Text style={styles.statsTitle}>Thống Kê</Text>
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{categories.length}</Text>
                            <Text style={styles.statLabel}>Danh mục</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>∞</Text>
                            <Text style={styles.statLabel}>Sản phẩm</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const CARD_WIDTH = (width - 60) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: COLORS.secondary,
    },
    loadingContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: '600',
    },
    header: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 22,
        paddingVertical: 40,
        paddingTop: 55,
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
        marginBottom: 12,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 10,
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#dce5fc',
        opacity: 0.96,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 28,
    },
    categoriesContainer: {
        paddingHorizontal: 18,
        paddingBottom: 8,
    },
    row: {
        justifyContent: 'space-between',
    },
    categoryCard: {
        width: CARD_WIDTH,
        height: 132,
        borderRadius: 22,
        backgroundColor: COLORS.cardBg,
        marginBottom: 0,
        marginHorizontal: 0,
        shadowColor: COLORS.cardShadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 6,
        overflow: "hidden"
    },
    cardInner: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 18,
    },
    iconCircle: {
        width: 46,
        height: 46,
        backgroundColor: COLORS.iconBg,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 13,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.11,
        shadowRadius: 6,
        elevation: 2,
    },
    categoryIcon: {
        fontSize: 28,
    },
    categoryContent: {
        flex: 1,
        justifyContent: "center",
    },
    categoryName: {
        fontSize: 17,
        fontWeight: "700",
        color: COLORS.textDark,
        marginBottom: 4,
    },
    categorySubtext: {
        fontSize: 13,
        color: COLORS.primary,
        opacity: 0.82,
    },
    arrowBox: {
        alignSelf: "center",
        marginLeft: 8,
    },
    arrow: {
        fontSize: 28,
        color: COLORS.primary,
        fontWeight: "700",
    },
    statsCard: {
        margin: 22,
        marginTop: 16,
        backgroundColor: '#fff',
        borderRadius: 22,
        padding: 24,
        elevation: 3,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        alignItems: 'center',
    },
    statsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 12,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.textLight,
        marginBottom: 3,
    },
    statLabel: {
        fontSize: 15,
        color: "#63789b",
        opacity: 0.92,
    },
    statDivider: {
        width: 2,
        height: 38,
        backgroundColor: '#f0f2fa',
        marginHorizontal: 19,
        borderRadius: 2
    },
});

export default ProductCategoryScreen;
