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

const ProductDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id, tag } = route.params as { id: number; tag: string };

  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [tagVariants, setTagVariants] = useState<any>(null);

  useEffect(() => {
    const fetchVariantDetails = async () => {
      try {
        setLoading(true);
        const tagData = await getVariantListByName(tag);
        setTagVariants(tagData);
        // Nếu API trả về mảng variants và mỗi phần tử có trường size,
        // bạn có thể import availableSizes từ đó, ví dụ:
        // const sizes = tagData.variantList.map((v: any) => v.size);
        // setAvailableSizes(sizes);
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
    console.log("Buy now:", {
      id: tagVariants?.id,
      name: tagVariants?.name,
      quantity,
      size: selectedSize,
      price: tagVariants?.variantList[0]?.price,
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

  // Giả sử API trả về: tagVariants = { id, name, variantList: [ { id, name, price, imageUrl, size, color, quantity }, ... ] }
  const firstVariant = tagVariants.variantList[0];

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
            source={{ uri: firstVariant.imageUrl }}
            style={styles.productImage}
            resizeMode="cover"
          />
          <View style={styles.imageNavigation}>
            <Text style={styles.imageNavText}>1/1</Text>
          </View>
        </View>

        {/* ======= PHẦN GIÁ & KHUYẾN MÃI ======= */}
        <View style={styles.priceSection}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>
              ₫{formatPrice(firstVariant.price)}
            </Text>
            <Text style={styles.originalPrice}>
              ₫{formatPrice(firstVariant.price * 1.5)}
            </Text>
          </View>
          <View style={styles.installment}>
            <Text style={styles.installmentText}>
              Chỉ từ ₫{formatPrice(firstVariant.price)} x 1 kỳ với Closm Pay
            </Text>
            <Text style={styles.installmentText}>▶</Text>
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

        {/* ======= TIÊU ĐỀ SẢN PHẨM & YÊU THÍCH ======= */}
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>{tagVariants.name}</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.heartIcon}>♡</Text>
          </TouchableOpacity>
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
            <Text style={styles.sizeHeaderText}>
              Chọn loại hàng (Size: {firstVariant.size})
            </Text>
            <Text style={styles.sizeArrow}>▶</Text>
          </View>
          <View style={styles.sizeList}>
            {availableSizes.length > 0
              ? availableSizes.map((size) => (
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
                ))
              : null}

            {/* Dòng hiển thị color + stock */}
            <View style={styles.colorStockRow}>
              <Text style={styles.colorText}>
                Color: {firstVariant.color || "N/A"}
              </Text>
              <Text style={styles.stockText}>| Số lượng: {firstVariant.quantity || 0}</Text>
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

        <TouchableOpacity
          style={styles.bottomBtn}
          activeOpacity={0.7}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ fontSize: 20, color: "#333333", marginRight: 6 }}>🛒</Text>
          <Text style={styles.bottomBtnText}>Thêm giỏ hàng</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.buyBtn}
          activeOpacity={0.7}
          onPress={handleBuyNow}
        >
          <Text style={styles.buyBtnText}>
            Mua với voucher ₫{formatPrice(firstVariant.price)}
          </Text>
        </TouchableOpacity> */}
      </View>

      {/* ======= MODAL CHỌN SIZE/THÊM GIỎ HÀNG ======= */}
      <ProductDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        tagVariants={tagVariants}
        onAddToCart={handleAddToCart}
        availableSizes={availableSizes}
      />
    </View>
  );
};

export default ProductDetail;
