import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { router } from "expo-router";
import { useStateContext } from "@/context/StateContext";
import styles from "@/constants/ProductDetailModal";

const ProductDetailModal = ({ visible, onClose, tagVariants }) => {
  const { addToCart } = useStateContext();

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const variantList = tagVariants?.variantList || [];

  // Lấy unique size & color
  const availableSizes = [...new Set(variantList.map((v) => v.size))];
  const availableColors = [...new Set(variantList.map((v) => v.color))];

  // Lấy variant khớp với size + color
  const variant = variantList.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  );

  // Reset lựa chọn khi mở modal
  useEffect(() => {
    if (visible) {
      setSelectedSize(null);
      setSelectedColor(null);
      setQuantity(1);
    }
  }, [visible]);

  const handleAddToCart = () => {
    console.log("Adding to cart:");
    if (!variant) {
      console.log("No variant selected.");
      return;
    }

    addToCart({
      id: variant.id,
      name: tagVariants.name,
      quantity,
      size: selectedSize,
      color: selectedColor,
      price: variant.price,
      imageUrl: variant.imageUrl,
    });
    onClose();
    router.push("/(tabs)/cart");
  };

  const formatPrice = (price) =>
    price != null ? price.toLocaleString() : "N/A";

  const installmentPrices = {
    oneMonth: variant?.price ?? 0,
    twoMonths: Math.round((variant?.price ?? 0) / 2),
    threeMonths: Math.round((variant?.price ?? 0) / 3),
    twelveMonths: Math.round((variant?.price ?? 0) / 12),
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>

      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          {variant && (
            <View style={styles.productInfoContainer}>
              <Image
                source={{ uri: variant.imageUrl }}
                style={styles.productThumbnail}
                resizeMode="cover"
              />
              <View style={styles.productInfo}>
                <Text style={styles.price}>₫{formatPrice(variant.price)}</Text>
                <Text style={styles.stock}>Kho: {variant.quantity}</Text>
              </View>
            </View>
          )}

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Màu sắc</Text>
            <View style={styles.sizeOptionsContainer}>
              {availableColors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.sizeOption,
                    selectedColor === color && styles.selectedSizeOption,
                  ]}
                  onPress={() => setSelectedColor(color)}
                >
                  <Text
                    style={[
                      styles.sizeOptionText,
                      selectedColor === color && styles.selectedSizeOptionText,
                    ]}
                  >
                    {color}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.sizeOptionsContainer}>
              {availableSizes.map((size, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.sizeOption,
                    selectedSize === size && styles.selectedSizeOption,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    style={[
                      styles.sizeOptionText,
                      selectedSize === size && styles.selectedSizeOptionText,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Số lượng</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <View style={styles.quantityValueContainer}>
                <Text style={styles.quantityValue}>{quantity}</Text>
              </View>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Trả góp, v.v... */}
        </ScrollView>

        <View style={styles.footerContainer}>
          {!variant && selectedSize && selectedColor && (
            <Text
              style={{ color: "red", textAlign: "center", marginBottom: 8 }}
            >
              Không tìm thấy biến thể phù hợp với lựa chọn Size và Màu sắc.
            </Text>
          )}

          <TouchableOpacity
            style={[
              styles.addToCartButton,
              !variant && { backgroundColor: "#ccc" },
            ]}
            onPress={handleAddToCart}
            disabled={!variant}
          >
            <Text style={styles.addToCartButtonText}>Thêm vào Giỏ hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ProductDetailModal;
