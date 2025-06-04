import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import styles from "@/constants/VariantDetails";
import ProductDetailModal from "./ProductDetailModal";
import { getVariantListByName } from "@/api/products/products";

type Variant = {
  color: string;
  description: string;
  id: number;
  imageUrl: string;
  price: number;
  quantity: number;
  size: string;
};

type TagData = {
  name: string;
  variantList: Variant[];
};

const ProductDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id, tag } = route.params as { id: number; tag: string };

  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [tagVariants, setTagVariants] = useState<TagData | null>(null);

  useEffect(() => {
    const fetchVariantDetails = async () => {
      try {
        setLoading(true);
        const tagData: TagData = await getVariantListByName(tag);
        setTagVariants(tagData);

        // 1. Lấy danh sách các size có trong variantList
        const sizes = tagData.variantList.map((v) => v.size);
        setAvailableSizes(sizes);

        // 2. Chọn size mặc định là phần tử đầu tiên (nếu có)
        if (sizes.length > 0) {
          setSelectedSize(sizes[0]);
        }
      } catch (err) {
        console.error("Error fetching variant details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVariantDetails();
  }, [tag]);

  const handleAddToCart = (cartItem: any) => {
    console.log("Added to cart:", cartItem);
    setModalVisible(false);
  };

  const handleBuyNow = () => {
    if (!tagVariants || !selectedSize) return;
    // Tìm variant theo size hiện tại
    const displayedVariant =
      tagVariants.variantList.find((v) => v.size === selectedSize) ||
      tagVariants.variantList[0];
    console.log("Buy now:", {
      id: displayedVariant.id,
      name: tagVariants.name,
      quantity,
      size: displayedVariant.size,
      price: displayedVariant.price,
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const formatPrice = (price?: number) => {
    return price != null ? price.toLocaleString() : "N/A";
  };

  if (loading || !tagVariants) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5500" />
      </View>
    );
  }

  // 3. Xác định variant hiện tại (dựa vào selectedSize). Nếu không tìm thấy, dùng variant đầu tiên.
  const displayedVariant: Variant =
    tagVariants.variantList.find((v) => v.size === selectedSize) ||
    tagVariants.variantList[0];

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* ======= HEADER ======= */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} activeOpacity={0.7}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerSpacer} />
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.headerIcon}>🛒</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerMore} activeOpacity={0.7}>
            <Text style={styles.headerIcon}>⋮</Text>
          </TouchableOpacity>
        </View>

        {/* ======= ẢNH SẢN PHẨM ======= */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: displayedVariant.imageUrl }}
            style={styles.productImage}
            resizeMode="cover"
          />
          <View style={styles.imageNavigation}>
            <Text style={styles.imageNavText}>
              1/{tagVariants.variantList.length}
            </Text>
          </View>
        </View>

        {/* ======= TIÊU ĐỀ SẢN PHẨM & MÔ TẢ & YÊU THÍCH ======= */}
        <View style={styles.titleSection}>
          <View style={{ flex: 1 }}>
            <Text style={styles.titleText}>{tagVariants.name}</Text>
            {/* Thêm phần mô tả ngắn gọn */}
            <Text style={styles.descriptionText}>
              {displayedVariant.description || "No description available."}
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.heartIcon}>♡</Text>
          </TouchableOpacity>
        </View>

        {/* ======= PHẦN GIÁ & KHUYẾN MÃI ======= */}
        <View style={styles.priceSection}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>₫{formatPrice(displayedVariant.price)}</Text>
            {/* Giả sử giá gốc là 1.5 lần giá hiện tại (bạn có thể điều chỉnh theo API thật) */}
            <Text style={styles.originalPrice}>
              ₫{formatPrice(displayedVariant.price * 1.5)}
            </Text>
          </View>

        </View>

        <View style={styles.promoContainer}>
          <View style={styles.promoBox}>
            <Text style={styles.promoText}>Giảm 10% khi mua từ 2 sản phẩm</Text>
          </View>
          <View style={styles.promoBox}>
            <Text style={styles.promoText}>Free ship toàn quốc</Text>
          </View>
        </View>



        {/* ======= THÔNG TIN VẬN CHUYỂN ======= */}
        <View style={styles.shippingSection}>
          <View style={styles.shippingCard}>
            <Text style={styles.shippingIcon}>🚚</Text>
            <Text style={styles.shippingText}>
              Nhận hàng nhanh chóng, tiện lợi
            </Text>
            <Text style={styles.shippingArrow}>▶</Text>
          </View>
          <View style={styles.shippingCard}>
            <Text style={styles.shippingIcon}>🛡️</Text>
            <Text style={styles.shippingText}>
              Trả hàng miễn phí 10 ngày | Bảo hiểm Thời trang
            </Text>
            <Text style={styles.shippingArrow}>▶</Text>
          </View>
        </View>

        {/* ======= CHỌN SIZE & COLOR & STOCK ======= */}
        <View style={styles.sizeSection}>
          <View style={styles.sizeHeader}>
            {/* Hiển thị size đang chọn (nếu có) */}
            <Text style={styles.sizeHeaderText}>
              Chọn loại hàng (Size: {selectedSize || "N/A"})
            </Text>
            <Text style={styles.sizeArrow}>▶</Text>
          </View>

          {/* Danh sách các nút bấm chọn size */}
          <View style={styles.sizeList}>
            {availableSizes.map((size) => (
              <TouchableOpacity
                key={size}
                activeOpacity={0.7}
                style={[
                  styles.sizeBox,
                  selectedSize === size && styles.sizeBoxSelected,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text
                  style={[
                    styles.sizeText,
                    selectedSize === size && styles.sizeTextSelected,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}

            {/* Dòng hiển thị color + stock của variant hiện tại */}
            <View style={styles.colorStockRow}>
              <Text style={styles.colorText}>
                Color: {displayedVariant.color || "N/A"}
              </Text>
              <Text style={styles.stockText}>
                | Số lượng: {displayedVariant.quantity || 0}
              </Text>
            </View>
          </View>
        </View>

        {/* ======= ĐÁNH GIÁ SẢN PHẨM ======= */}
        <View style={styles.ratingSection}>
          <View style={styles.ratingHeader}>
            <Text style={styles.ratingIcon}>⭐</Text>
            <Text style={styles.ratingText}>Đánh Giá Sản Phẩm</Text>
            <Text style={styles.ratingAll}>Tất cả ▶</Text>
          </View>
        </View>
      </ScrollView>

      {/* ======= BOTTOM BAR ======= */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBtn} activeOpacity={0.7}>
          <Text style={{ fontSize: 20, color: "#333333", marginRight: 6 }}>💬</Text>
          <Text style={styles.bottomBtnText}>Chat ngay</Text>
        </TouchableOpacity>

        {/* Nút Buy Now */}
        <TouchableOpacity
          style={[styles.bottomBtn, { backgroundColor: "#1183ed" }]}
          activeOpacity={0.7}
          onPress={() => setModalVisible(true)}        >
          <Text style={[styles.bottomBtnText, { color: "#FFFFFF" }]}>
            Mua ngay
          </Text>
        </TouchableOpacity>

        {/* Nút Thêm giỏ hàng */}
        <TouchableOpacity
          style={styles.bottomBtn}
          activeOpacity={0.7}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ fontSize: 18, color: "#333333", marginRight: 6 }}>➕</Text>
          <Text style={styles.bottomBtnText}>Thêm giỏ hàng</Text>
        </TouchableOpacity>
      </View>

      {/* ======= MODAL CHỌN SIZE/THÊM GIỎ HÀNG ======= */}
      <ProductDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        tagVariants={tagVariants}
        onAddToCart={handleAddToCart}
        availableSizes={availableSizes}
      // Bạn có thể truyền thêm selectedSize, quantity, displayedVariant,... nếu modal cần dùng
      />
    </View>
  );
};

export default ProductDetail;
