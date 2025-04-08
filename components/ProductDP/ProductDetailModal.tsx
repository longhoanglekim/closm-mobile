import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { router } from "expo-router";
import { useStateContext } from "@/context/StateContext"; 
import styles from "@/constants/ProductDetailModal";

const ProductDetailModal = ({
  visible,
  onClose,
  variant,
  availableSizes, 
}) => {
  const { addToCart } = useStateContext();
  const [selectedSize, setSelectedSize] = useState(variant?.size || null);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    if (visible) {
      setSelectedSize(variant?.size || null);
      setQuantity(1);
    }
  }, [visible, variant]);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart({
      id: variant?.id,
      name: variant?.name,
      quantity,
      size: selectedSize,
      price: variant?.price,
      color: variant?.color,
      imageUrl: variant?.imageUrl,
    });
    onClose();
    router.push("/(tabs)/cart");
  };

  if (!variant) return null;

  const installmentPrices = {
    oneMonth: variant.price,
    twoMonths: Math.round(variant.price / 2),
    threeMonths: Math.round(variant.price / 3),
    twelveMonths: Math.round(variant.price / 12),
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
          <View style={styles.productInfoContainer}>
            <Image
              source={{ uri: variant.imageUrl }}
              style={styles.productThumbnail}
              resizeMode="cover"
            />
            <View style={styles.productInfo}>
              <Text style={styles.price}>₫{variant.price.toLocaleString()}</Text>
              <Text style={styles.stock}>Kho: {variant.quantity}</Text>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.sizeOptionsContainer}>
              {/* Only render size options if they exist */}
              {availableSizes && availableSizes.length > 0 ? (
                availableSizes.map((size) => (
                  <TouchableOpacity
                    key={size}
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
                ))
              ) : (
                <TouchableOpacity
                  style={[
                    styles.sizeOption,
                    styles.selectedSizeOption,
                  ]}
                >
                  <Text
                    style={[
                      styles.sizeOptionText,
                      styles.selectedSizeOptionText,
                    ]}
                  >
                    {variant.size}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            
            <Text style={styles.sectionTitle}>Số lượng</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decreaseQuantity}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <View style={styles.quantityValueContainer}>
                <Text style={styles.quantityValue}>{quantity}</Text>
              </View>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={increaseQuantity}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.installmentContainer}>
            <Text style={styles.sectionTitle}>Closm pay - Mua Trước Trả Sau</Text>
            <View style={styles.installmentOption}>
              <View style={styles.installmentHighlight}>
                <Text style={styles.installmentHighlightText}>Ưu đãi</Text>
              </View>
              <View style={styles.installmentDetails}>
                <Text style={styles.installmentPrice}>{variant.price.toLocaleString()}₫</Text>
                <Text style={styles.installmentTerms}>x 1 kỳ</Text>
              </View>
              <Text style={styles.installmentInfo}>0% lãi 0% phí</Text>
            </View>
            
            <View style={styles.installmentOption}>
              <View style={styles.installmentDetails}>
                <Text style={styles.installmentPrice}>{installmentPrices.twoMonths.toLocaleString()}₫</Text>
                <Text style={styles.installmentTerms}>x 2 kỳ</Text>
              </View>
              <Text style={styles.installmentInfo}>Gốm 10.000₫ phí/tháng</Text>
            </View>
            
            <View style={styles.installmentOption}>
              <View style={styles.installmentDetails}>
                <Text style={styles.installmentPrice}>{installmentPrices.threeMonths.toLocaleString()}₫</Text>
                <Text style={styles.installmentTerms}>x 3 kỳ</Text>
              </View>
              <Text style={styles.installmentInfo}>Gốm 10.000₫ phí/tháng</Text>
            </View>
            
            <View style={styles.installmentOption}>
              <View style={styles.installmentDetails}>
                <Text style={styles.installmentPrice}>{installmentPrices.twelveMonths.toLocaleString()}₫</Text>
                <Text style={styles.installmentTerms}>x 12 kỳ</Text>
              </View>
              <Text style={styles.installmentInfo}>Gốm 10.000₫ phí/tháng</Text>
            </View>
          </View>
        </ScrollView>
        
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.addToCartButtonText}>Thêm vào Giỏ hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ProductDetailModal;