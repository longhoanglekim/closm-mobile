import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useStateContext } from "@/context/StateContext";
import { useSelector } from "react-redux";
import detailStyles from "@/constants/payment/checkoutDetails";
import layoutStyles from "@/constants/payment/checkout";
import ShippingAddress from "@/app/(tabs)/payment/ShippingAddress";
import { useCheckoutLogic } from "./useCheckoutLogic";

const Checkout = () => {
  const { cartItems } = useStateContext();
  const user = useSelector((state: any) => state.user);
  const userInfo = user?.userInfo || { fullname: "", phone: "", email: "" };
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [shippingCost, setShippingCost] = useState(0);
  const [isShippingModalVisible, setIsShippingModalVisible] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  console.log("Redux user state:", user);
  console.log("User Info:", userInfo);
  const {
    distance,
    availableDiscounts,
    selectedDiscounts,
    deliveryFee,
    isCalculatingDistance,
    calculationError,
    calculateSubtotal,
    calculateTotal,
    calculateFinalPrice,
    handleSubmitOrder,
    handleSelectDiscount,
    calculateDiscountAmount
  } = useCheckoutLogic(cartItems, userInfo, userAddress, shippingCost);

  const closeShippingModal = () => {
    setIsShippingModalVisible(false);
  };

  // Check if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng trống. Vui lòng thêm sản phẩm trước khi thanh toán.');
      router.push('/cart');
    }
  }, [cartItems]);

  return (
    <SafeAreaView style={layoutStyles.container}>
      <ScrollView style={layoutStyles.scrollView}>

        <View style={layoutStyles.header}>
          <TouchableOpacity
            style={layoutStyles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <ThemedText style={layoutStyles.headerTitle}>Thanh toán</ThemedText>
        </View>

        {/* Shipping Address */}
        <View style={detailStyles.sectionContainer}>
          <View style={detailStyles.discountHeader}>
            <ThemedText style={detailStyles.sectionTitle}>Mã giảm giá</ThemedText>
            {availableDiscounts.length === 0 && (
              <ThemedText style={detailStyles.noDiscountsText}>
                Không có mã giảm giá khả dụng
              </ThemedText>
            )}
          </View>
          {availableDiscounts.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={detailStyles.discountScrollView}
            >
              {availableDiscounts.map((discount) => (
                <TouchableOpacity
                  key={discount.id}
                  style={[
                    detailStyles.discountItem,
                    selectedDiscounts.some((d) => d.id === discount.id) &&
                    detailStyles.selectedDiscount,
                  ]}
                  onPress={() => handleSelectDiscount(discount)}
                >
                  <ThemedText style={detailStyles.discountCode}>
                    {discount.description}
                  </ThemedText>
                  <ThemedText style={detailStyles.discountDescription}>
                    Giảm {discount.discountPercentage}% - Hết hạn:{" "}
                    {new Date(discount.endDate).toLocaleDateString()}
                  </ThemedText>
                  <ThemedText style={detailStyles.discountAmount}>
                    -{calculateDiscountAmount(discount).toLocaleString()}đ
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
        {/* Distance and Delivery Information */}
        {userAddress ? (
          <View style={detailStyles.sectionContainer}>
            <ThemedText style={detailStyles.sectionTitle}>Thông tin vận chuyển</ThemedText>
            <View style={detailStyles.infoBox}>
              <ThemedText style={detailStyles.deliveryInfoValue}>
                {userAddress}
              </ThemedText>
              <TouchableOpacity
                style={detailStyles.editButton}
                onPress={() => setIsShippingModalVisible(true)}
              >
                <Ionicons name="pencil" size={20} color="#007AFF" />
              </TouchableOpacity>
            </View>
            {isCalculatingDistance ? (
              <View style={detailStyles.loadingContainer}>
                <ActivityIndicator size="small" color="#007AFF" />
                <ThemedText style={detailStyles.loadingText}>Đang tính khoảng cách...</ThemedText>
              </View>
            ) : calculationError ? (
              <ThemedText style={detailStyles.errorText}>{calculationError}</ThemedText>
            ) : (
              <>
                <View style={detailStyles.deliveryInfoRow}>
                  <ThemedText style={detailStyles.deliveryInfoLabel}>Khoảng cách:</ThemedText>
                  <ThemedText style={detailStyles.deliveryInfoValue}>{distance.toFixed(1)} km</ThemedText>
                </View>
                <View style={detailStyles.deliveryInfoRow}>
                  <ThemedText style={detailStyles.deliveryInfoLabel}>Phí vận chuyển:</ThemedText>
                  <ThemedText style={detailStyles.deliveryInfoValue}>{deliveryFee.toLocaleString()}đ</ThemedText>
                </View>
              </>
            )}
          </View>
        ) : (
          <View style={detailStyles.sectionContainer}>
            <ThemedText style={detailStyles.sectionTitle}>Thông tin vận chuyển</ThemedText>
            <ThemedText style={detailStyles.errorText}>
              Vui lòng nhập địa chỉ giao hàng.
            </ThemedText>
            <TouchableOpacity
              style={detailStyles.editButton}
              onPress={() => setIsShippingModalVisible(true)}
            >
              <Ionicons name="pencil" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>
        )}

        {/* Contact Information */}
        <View style={detailStyles.sectionContainer}>
          <ThemedText style={detailStyles.sectionTitle}>Thông tin liên hệ</ThemedText>
          <View style={detailStyles.infoBox}>
            <ThemedText style={detailStyles.contactText}>
              {userInfo.fullName || "Chưa có tên"}
            </ThemedText>
            <ThemedText style={detailStyles.contactText}>
              {userInfo.phone || "Chưa có số điện thoại"}
            </ThemedText>
            <ThemedText style={detailStyles.contactText}>
              {userInfo.email || "Chưa có email"}
            </ThemedText>
            <TouchableOpacity style={detailStyles.editButton}>
              <Ionicons name="pencil" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Items */}
        <View style={detailStyles.sectionContainer}>
          <View style={detailStyles.itemsHeader}>
            <View style={detailStyles.itemsTitleContainer}>
              <ThemedText style={detailStyles.sectionTitle}>Sản phẩm</ThemedText>
              <View style={detailStyles.itemCountBadge}>
                <ThemedText style={detailStyles.itemCount}>{cartItems.length}</ThemedText>
              </View>
            </View>
          </View>

          <View style={detailStyles.itemsContainer}>
            {cartItems.map((item) => (
              <View key={`${item.id}-${item.size}-${item.color}`} style={detailStyles.cartItem}>
                <Image source={{ uri: item.imageUrl }} style={detailStyles.productImage} />
                <View style={detailStyles.productDetails}>
                  <View style={detailStyles.productInfo}>
                    <View style={detailStyles.quantityBadge}>
                      <ThemedText style={detailStyles.quantityText}>{item.quantity}</ThemedText>
                    </View>
                    <ThemedText style={detailStyles.productName}>
                      {item.name}
                    </ThemedText>
                  </View>
                  <ThemedText style={detailStyles.productPrice}>{(item.price).toLocaleString()}đ</ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Discounts Section */}


        {/* Shipping Options */}
        <View style={detailStyles.sectionContainer}>
          <ThemedText style={detailStyles.sectionTitle}>Phương thức vận chuyển</ThemedText>
          <View style={detailStyles.shippingOptions}>
            <TouchableOpacity
              style={[
                detailStyles.shippingOption,
                selectedShipping === "standard" && detailStyles.selectedShipping
              ]}
              onPress={() => {
                setSelectedShipping("standard");
                setShippingCost(0);
              }}
            >
              <View style={detailStyles.radioContainer}>
                <View style={detailStyles.radioOuter}>
                  {selectedShipping === "standard" && <View style={detailStyles.radioInner} />}
                </View>
                <ThemedText style={detailStyles.shippingLabel}>Tiêu chuẩn</ThemedText>
              </View>
              <View style={detailStyles.shippingDetail}>
                <ThemedText style={detailStyles.shippingTime}>5-7 ngày</ThemedText>
                <ThemedText style={detailStyles.shippingPrice}>Miễn phí</ThemedText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                detailStyles.shippingOption,
                selectedShipping === "express" && detailStyles.selectedShipping
              ]}
              onPress={() => {
                setSelectedShipping("express");
                setShippingCost(12000);
              }}
            >
              <View style={detailStyles.radioContainer}>
                <View style={detailStyles.radioOuter}>
                  {selectedShipping === "express" && <View style={detailStyles.radioInner} />}
                </View>
                <ThemedText style={detailStyles.shippingLabel}>Nhanh</ThemedText>
              </View>
              <View style={detailStyles.shippingDetail}>
                <ThemedText style={detailStyles.shippingTime}>1-2 ngày</ThemedText>
                <ThemedText style={detailStyles.shippingPrice}>12.000đ</ThemedText>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Method */}
        <View style={detailStyles.sectionContainer}>
          <View style={detailStyles.paymentMethodHeader}>
            <ThemedText style={detailStyles.sectionTitle}>Phương thức thanh toán</ThemedText>
            <TouchableOpacity style={detailStyles.editButton}>
              <Ionicons name="pencil" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>
          <View style={detailStyles.paymentMethodBox}>
            <ThemedText style={detailStyles.paymentMethodText}>Thanh toán khi nhận hàng (COD)</ThemedText>
          </View>
        </View>
      </ScrollView>
      {/* Total and Pay Button */}
      <View style={layoutStyles.footer}>


        <View style={detailStyles.totalContainer}>
          {/* Tạm tính */}
          <View style={detailStyles.totalRow}>
            <Text style={detailStyles.totalLabel}>Tạm tính</Text>
            <Text style={detailStyles.totalAmount}>
              {calculateSubtotal().toLocaleString()}đ
            </Text>
          </View>

          {/* Phí vận chuyển */}
          <View style={detailStyles.totalRow}>
            <Text style={detailStyles.totalLabel}>Phí vận chuyển</Text>
            <Text style={detailStyles.totalAmount}>
              {deliveryFee.toLocaleString()}đ
            </Text>
          </View>

          {/* Giảm giá */}
          <View style={detailStyles.totalRow}>
            <Text style={detailStyles.totalLabel}>Giảm giá</Text>
            <Text style={detailStyles.totalAmount}>
              -{selectedDiscounts
                .reduce((sum, discount) => sum + (discount.amount || 0), 0)
                .toLocaleString()}đ
            </Text>
          </View>

          {/* Tổng cộng */}
          <View style={detailStyles.summaryContainer}>
            <View style={detailStyles.finalTotalRow}>
              <Text style={detailStyles.finalTotalLabel}>Tổng cộng:</Text>
              <Text style={detailStyles.finalTotalAmount}>
                {calculateFinalPrice().toLocaleString()}đ
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[
            layoutStyles.payButton,
            (!userAddress || isCalculatingDistance) && layoutStyles.disabledButton,
          ]}
          onPress={handleSubmitOrder}
          disabled={!userAddress || isCalculatingDistance}
        >
          <ThemedText style={layoutStyles.payButtonText}>
            {isCalculatingDistance
              ? "Đang tính phí vận chuyển..."
              : "Thanh toán"}
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Shipping Address Modal */}
      <Modal
        visible={isShippingModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeShippingModal}
      >
        <View style={detailStyles.modalContainer}>
          <View style={detailStyles.modalContent}>
            <ShippingAddress
              key={userAddress}
              currentAddress={userAddress}

              onSave={(address) => {
                console.log("Địa chỉ vừa lưu:", address);
                setUserAddress(address);
                closeShippingModal();
              }}
              onClose={closeShippingModal}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Checkout;