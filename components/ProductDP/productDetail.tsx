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

type VariantDetail = {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  size: string;
  color: string;
  quantity: number;
};

type ProductCategory = {
  id: number;
  name: string;
  variants: VariantDetail[];
};

const ProductDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: number };

  const [variant, setVariant] = useState<VariantDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [availableSizes, setAvailableSizes] = useState<string[]>([]);
  const [allProductData, setAllProductData] = useState<ProductCategory[]>([]);

  useEffect(() => {
    const fetchVariantDetails = async () => {
      try {
        setLoading(true);
        const allProducts = await getProductDetails();
        setAllProductData(allProducts);

        let foundVariant = null;
        let productCategory = null;

        for (const category of allProducts) {
          const variantFound = category.variants.find((v: VariantDetail) => v.id === Number(id));
          if (variantFound) {
            foundVariant = variantFound;
            productCategory = category;
            break;
          }
        }

        if (foundVariant) {
          setVariant(foundVariant);
          setSelectedSize(foundVariant.size);

          if (productCategory) {
            const sizes = productCategory.variants
              .filter((v: VariantDetail) => v.name === foundVariant.name && v.color === foundVariant.color)
              .map((v: VariantDetail) => v.size);

            const uniqueSizes = [...new Set(sizes)];
            setAvailableSizes(uniqueSizes);
          }
        }
      } catch (err) {
        console.error("Error fetching variant details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVariantDetails();
  }, [id]);

  const handleAddToCart = (cartItem) => {
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5500" />
      </View>
    );
  }

  if (!variant) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Product not found</Text>
      </View>
    );
  }

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
          source={{ uri: variant.imageUrl }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <View style={styles.imageNavigation}>
          <Text>1/1</Text>
        </View>

        <View style={styles.priceSection}>
          <Text style={styles.price}>₫{variant.price.toLocaleString()}</Text>
          <Text style={styles.originalPrice}>₫{(variant.price * 1.5).toLocaleString()}</Text>
          <View style={styles.installment}>
            <Text style={styles.installmentText}>
              Chỉ từ ₫{variant.price.toLocaleString()} x 1 kỳ với Closm Pay
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
            <Text style={styles.titleText}>
              {variant.name} - {variant.color} - {variant.description}
            </Text>
            <TouchableOpacity>
              <Text style={styles.heartIcon}>♡</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.shippingSection}>
          <View style={styles.shippingRow}>
            <Text>🚚</Text>
            <Text style={styles.shippingText}>Nhận hàng nhanh chóng, tiện lợi</Text>
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
            <Text>Chọn loại hàng (Size: {variant.size})</Text>
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
              <Text style={styles.colorText}>Color: {variant.color}</Text>
              <Text style={styles.stockText}> | Số lượng: {variant.quantity}</Text>
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
        <TouchableOpacity
          style={styles.buyBtn}
          onPress={handleBuyNow}
        >
          <Text style={styles.buyBtnText}>
            Mua với voucher ₫{variant.price.toLocaleString()}
          </Text>
        </TouchableOpacity>
      </View>

      <ProductDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        variant={variant}
        onAddToCart={handleAddToCart}
        availableSizes={availableSizes}
      />
    </View>
  );
};

export default ProductDetail;