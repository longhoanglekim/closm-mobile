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
import { getProductDetails } from "@/api/products/products";
import styles from "@/constants/VariantDetails";
import ProductDetailModal from "./ProductDetailModal";
import { getVariantListByName } from "@/api/products/products";
// type VariantDetail = {
//   id: number;
//   name: string;
//   price: number;
//   description: string;
//   imageUrl: string;
//   size: string;
//   color: string;
//   quantity: number;
// };

type ProductCategory = {
  id: number;
  name: string;
  variants: any[];
};

const ProductDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id, tag } = route.params as { id: number; tag: string };

  const [variant, setVariant] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  // lONG TEST
  const [tagVariants, setTagVariants] = useState<any[]>([]);
  useEffect(() => {
    const fetchVariantDetails = async () => {
      try {
        setLoading(true);

        const tagData = await getVariantListByName(tag);
        setTagVariants(tagData);
        // console.log("Tag Variants:", tagVariants[0]?.imageUrl);
      } catch (err) {
        console.error("Error fetching variant details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVariantDetails();
  }, [tag]); // ✅ Đúng dependency

  const handleAddToCart = (cartItem: any) => {
    console.log("Added to cart:", cartItem);
    setModalVisible(false);
  };

  const handleBuyNow = () => {
    console.log("Buy now:", {
      id: variant?.id,
      name: variant?.name,
      quantity,
      size: selectedSize,
      price: variant?.price,
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const formatPrice = (price?: number) => {
    return price != null ? price.toLocaleString() : "N/A";
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5500" />
      </View>
    );
  }

  // if (!tagVariants) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <Text>Product not found</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.page}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity>
            <Text style={styles.headerIcon}>🛒</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerMore}>
            <Text style={styles.headerIcon}>⋮</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={{ uri: tagVariants.variantList[0]?.imageUrl }}
          style={styles.productImage}
          resizeMode="cover"
        />

        <View style={styles.imageNavigation}>
          <Text>1/1</Text>
        </View>

        <View style={styles.priceSection}>
          {/* <Text style={styles.price}>₫{formatPrice(variant.price)}</Text> */}
          <Text style={styles.price}>
            ₫{formatPrice(tagVariants.variantList[0]?.price)}
          </Text>
          <Text style={styles.originalPrice}>
            ₫{formatPrice(tagVariants.variantList[0]?.price * 1.5)}
          </Text>
          <View style={styles.installment}>
            <Text style={styles.installmentText}>
              Chỉ từ ₫{formatPrice(tagVariants.variantList[0]?.price)} x 1 kỳ
              với Closm Pay
            </Text>
            <Text>▶</Text>
          </View>
        </View>

        <View style={styles.promotionContainer}>
          <View style={styles.promoBox}>
            <Text style={styles.promoText}>text sales</Text>
          </View>
          <View style={styles.promoBox}>
            <Text style={styles.promoText}>text sales</Text>
          </View>
        </View>

        <View style={styles.titleSection}>
          <View style={styles.titleRow}>
            <Text style={styles.titleText}>{tagVariants.name}</Text>
            <TouchableOpacity>
              <Text style={styles.heartIcon}>♡</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.shippingSection}>
          <View style={styles.shippingRow}>
            <Text>🚚</Text>
            <Text style={styles.shippingText}>
              Nhận hàng nhanh chóng, tiện lợi
            </Text>
            <Text>▶</Text>
          </View>
          <View style={styles.shippingRow}>
            <Text>🛡️</Text>
            <Text style={styles.shippingText}>
              Trả hàng miễn phí 10 ngày | Bảo hiểm Thời trang
            </Text>
            <Text>▶</Text>
          </View>
        </View>

        <View style={styles.sizeSection}>
          <View style={styles.sizeHeader}>
            <Text>
              Chọn loại hàng (Size: {tagVariants.variantList[0]?.size})
            </Text>
            <Text>▶</Text>
          </View>
          <View style={styles.sizeList}>
            {availableSizes.map((size) => (
              <TouchableOpacity
                key={size}
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
            <View style={styles.colorInfo}>
              <Text style={styles.colorText}>Color: {"red"}</Text>
              <Text style={styles.stockText}> | Số lượng: {"100"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.ratingSection}>
          <View style={styles.ratingRow}>
            <Text style={styles.ratingNumber}></Text>
            <Text style={styles.ratingText}>⭐ Đánh Giá Sản Phẩm</Text>
          </View>
          <Text>Tất cả ▶</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBtn}>
          <Text>💬</Text>
          <Text style={styles.bottomBtnText}>Chat ngay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomBtn}
          onPress={() => setModalVisible(true)}
        >
          <Text>🛒</Text>
          <Text style={styles.bottomBtnText}>Thêm giỏ hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyBtn} onPress={handleBuyNow}>
          <Text style={styles.buyBtnText}>
            Mua với voucher ₫{formatPrice(tagVariants.variantList[0]?.price)}
          </Text>
        </TouchableOpacity>
      </View>

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
