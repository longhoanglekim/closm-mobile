import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { getVariantListByName } from "@/api/products/products";
import ProductDetailModal from "./ProductDetailModal";
import styles from "@/constants/VariantDetails";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type VariantItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  size: string;
  color: string;
  quantity: number;
};

type TagVariantsData = {
  name: string;
  variantList: VariantItem[];
};

const ProductDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const tabBarHeight = useBottomTabBarHeight();

  const { tag } = route.params as { tag: string };

  const [loading, setLoading] = useState(true);
  const [tagVariants, setTagVariants] = useState<TagVariantsData | null>(null);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<VariantItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchVariantDetails = async () => {
      try {
        setLoading(true);
        const data: TagVariantsData = await getVariantListByName(tag);
        setTagVariants(data);

        const sizes = data.variantList.map((v) => v.size);
        const uniq = Array.from(new Set(sizes));
        setAvailableSizes(uniq);

        if (uniq.length > 0) {
          setSelectedSize(uniq[0]);
          const firstVar = data.variantList.find((v) => v.size === uniq[0]);
          if (firstVar) setSelectedVariant(firstVar);
        }
      } catch (err) {
        console.error("Error fetching variant details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVariantDetails();
  }, [tag]);

  useEffect(() => {
    if (!tagVariants || !selectedSize) return;
    const found = tagVariants.variantList.find((v) => v.size === selectedSize);
    if (found) setSelectedVariant(found);
  }, [selectedSize, tagVariants]);

  const handleBack = () => navigation.goBack();
  const handleAddToCart = (item: any) => {
    console.log("Added to cart:", item);
    setModalVisible(false);
  };
  const handleBuyNow = () => {
    console.log("Buy now:", {
      id: selectedVariant?.id,
      name: selectedVariant?.name,
      quantity,
      size: selectedSize,
      price: selectedVariant?.price,
    });
  };

  const formatPrice = (p?: number) => (p != null ? p.toLocaleString() : "N/A");

  if (loading || !tagVariants || !selectedVariant) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6F61" />
      </View>
    );
  }

  const current = selectedVariant;
  const productName = tagVariants.name;

  return (
    <SafeAreaView style={styles.container}>
      {/* === ẢNH & NÚT BACK === */}
      <View style={styles.topImageContainer}>
        <Image
          source={{ uri: current.imageUrl }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Nội dung chính */}
      <View style={styles.cardContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Tên & Giá */}
          <View style={styles.headerContainer}>
            <View style={styles.nameRow}>
              <Text style={styles.productName}>{productName}</Text>
              <TouchableOpacity>
                <Text style={styles.heartIcon}>♡</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.priceTag}>₫{formatPrice(current.price)}</Text>
          </View>

          {/* Rating giả (ví dụ 4.5) */}
          <View style={styles.ratingRow}>
            <Text style={styles.ratingText}>⭐</Text>
            <Text style={styles.ratingText}>4.5</Text>
            <Text style={styles.ratingCount}>(128 đánh giá)</Text>
          </View>

          {/* Chọn Size */}
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Chọn Size</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sizeScroll}
          >
            {availableSizes.map((sz) => {
              const selected = sz === selectedSize;
              return (
                <TouchableOpacity
                  key={sz}
                  style={[
                    styles.sizePill,
                    selected && styles.sizePillSelected,
                  ]}
                  onPress={() => setSelectedSize(sz)}
                >
                  <Text
                    style={[
                      styles.sizePillText,
                      selected && styles.sizePillTextSelected,
                    ]}
                  >
                    {sz}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Màu & Tồn kho */}
          <View style={styles.attributeRow}>
            <Text style={styles.attrLabel}>Màu:</Text>
            <Text style={styles.attrValue}>{current.color}</Text>
            <Text style={styles.attrSpacer}>|</Text>
            <Text style={styles.attrLabel}>Còn:</Text>
            <Text style={styles.attrValue}>{current.quantity}</Text>
          </View>

          {/* Mô tả ngắn */}
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Mô Tả</Text>
          </View>
          <Text style={styles.descriptionText} numberOfLines={4}>
            {current.description || "Sản phẩm chất lượng cao, vải mềm mại, form ôm dáng. Thoáng mát và không nhăn."}
          </Text>

          {/* Shipping & Bảo hành */}
          <View style={styles.infoCardsRow}>
            <View style={styles.infoCard}>
              <Text style={styles.infoIcon}>🚚</Text>
              <Text style={styles.infoText}>Giao nhanh 2h</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoIcon}>🛡️</Text>
              <Text style={styles.infoText}>Đổi trả 10 ngày</Text>
            </View>
          </View>

          {/* Thêm khoảng trống dưới cùng để scroll không dính bottomBar */}
          <View style={{ height: 80 }} />
        </ScrollView>
      </View>

      {/* === BOTTOM BAR NỔI === */}
      <View style={[styles.bottomBar, { bottom: tabBarHeight }]}>
        <TouchableOpacity
          style={styles.chatButton}
          activeOpacity={0.8}
        >
          <Text style={styles.chatIcon}>💬</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.cartIcon}>🛒</Text>
          <Text style={styles.cartText}>Thêm giỏ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyButton}
          onPress={handleBuyNow}
          activeOpacity={0.8}
        >
          <Text style={styles.buyText}>Mua ngay</Text>
        </TouchableOpacity>
      </View>

      {/* === MODAL === */}
      <ProductDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        tagVariants={tagVariants.variantList}
        onAddToCart={handleAddToCart}
        availableSizes={availableSizes}
      />
    </SafeAreaView>
  );
};

export default ProductDetail;
