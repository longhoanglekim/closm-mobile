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

const ProductDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: number };

  const [variant, setVariant] = useState<VariantDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  useEffect(() => {
    const fetchVariantDetails = async () => {
      try {
        setLoading(true);
        // Get all products
        const allProducts = await getProductDetails();
        
        // Find the variant with matching ID
        let foundVariant = null;
        for (const category of allProducts) {
          const variantFound = category.variants.find((v: VariantDetail) => v.id === Number(id));
          if (variantFound) {
            foundVariant = variantFound;
            break;
          }
        }
        
        if (foundVariant) {
          setVariant(foundVariant);
          setSelectedSize(foundVariant.size);
        }
      } catch (err) {
        console.error("Error fetching variant details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVariantDetails();
  }, [id]);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    console.log("Added to cart:", {
      id: variant?.id,
      name: variant?.name,
      quantity,
      size: selectedSize,
      price: variant?.price,
    });
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

  // If the current variant has size, use it as one of the available sizes
  // You can also get sizes from other variants with the same name if needed
  const availableSizes = [variant.size];

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
            <Text style={styles.shippingText}>Nhận vào ngày mai, phí giao đỡ</Text>
            <Text>▶</Text>
          </View>
          <View style={styles.shippingRow}>
            <Text>🛡️</Text>
            <Text style={styles.shippingText}>
              Trả hàng miễn phí 15 ngày • Bảo hiểm Thời trang
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
            <TouchableOpacity
              style={[styles.sizeBox, styles.sizeBoxSelected]}
            >
              <Text style={[styles.sizeText, styles.sizeTextSelected]}>
                {variant.size}
              </Text>
            </TouchableOpacity>
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
        <TouchableOpacity style={styles.bottomBtn} onPress={handleAddToCart}>
          <Text>🛒</Text>
          <Text style={styles.bottomBtnText}>Thêm vào giỏ hàng</Text>
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
    </View>
  );
};

export default ProductDetail;