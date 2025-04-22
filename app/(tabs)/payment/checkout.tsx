import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useStateContext } from "@/context/StateContext";
import { useSelector } from "react-redux";
import styles from "@/constants/payment/checkout";
import ShippingAddress from "@/app/(tabs)/payment/ShippingAddress";
import { useCheckoutLogic } from "./useCheckoutLogic";

const Checkout = () => {
  const { cartItems } = useStateContext();
  const user = useSelector((state) => state.user);
  const userInfo = user?.userInfo || { fullname: "", phone: "", email: "" };
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [shippingCost, setShippingCost] = useState(0);
  const [isShippingModalVisible, setIsShippingModalVisible] = useState(false);
  const [userAddress, setUserAddress] = useState("");

  const {
    distance,
    availableDiscounts,
    selectedDiscounts,
    deliveryFee,
    calculateSubtotal,
    calculateTotal,
    calculateFinalPrice,
    handleSubmitOrder,
    handleSelectDiscount
  } = useCheckoutLogic(cartItems, user, userAddress, shippingCost);

  const handlePayment = () => {
    setIsShippingModalVisible(true);
  };

  const closeShippingModal = () => {
    setIsShippingModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>Payment</ThemedText>
        </View>

        {/* Shipping Address */}
        <View style={styles.sectionContainer}>
          <View style={styles.addressHeader}>
            <ThemedText style={styles.sectionTitle}>Địa chỉ giao hàng</ThemedText>
          </View>
          <View style={styles.infoBox}>
            {userAddress ? (
              <View style={styles.addressContainer}>
                <ThemedText style={styles.addressText}>{userAddress}</ThemedText>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => setIsShippingModalVisible(true)}
                >
                  <Ionicons name="pencil" size={20} color="#007AFF" />
                  
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addAddressButton}
                onPress={() => setIsShippingModalVisible(true)}
              >
                <ThemedText style={styles.addAddressText}>
                  + Thêm địa chỉ giao hàng
                </ThemedText>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Thông tin liên hệ</ThemedText>
          <View style={styles.infoBox}>
            <ThemedText style={styles.contactText}>
              {userInfo.fullName || "Chưa có tên"}
            </ThemedText>
            <ThemedText style={styles.contactText}>
              {userInfo.phone || "Chưa có số điện thoại"}
            </ThemedText>
            <ThemedText style={styles.contactText}>
              {userInfo.email || "Chưa có email"}
            </ThemedText>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Items */}
        <View style={styles.sectionContainer}>
          <View style={styles.itemsHeader}>
            <View style={styles.itemsTitleContainer}>
              <ThemedText style={styles.sectionTitle}>Sản phẩm</ThemedText>
              <View style={styles.itemCountBadge}>
                <ThemedText style={styles.itemCount}>{cartItems.length}</ThemedText>
              </View>
            </View>
            <TouchableOpacity style={styles.voucherButton}>
              <ThemedText style={styles.voucherButtonText}>Thêm Voucher</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.itemsContainer}>
            {cartItems.map((item) => (
              <View key={`${item.id}-${item.size}-${item.color}`} style={styles.cartItem}>
                <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <View style={styles.productInfo}>
                    <View style={styles.quantityBadge}>
                      <ThemedText style={styles.quantityText}>{item.quantity}</ThemedText>
                    </View>
                    <ThemedText style={styles.productName}>
                      {item.name}
                    </ThemedText>
                  </View>
                  <ThemedText style={styles.productPrice}>{(item.price).toLocaleString()}đ</ThemedText>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Discounts Section */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Mã giảm giá</ThemedText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {availableDiscounts.map((discount) => (
              <TouchableOpacity
                key={discount.id}
                style={[
                  styles.discountItem,
                  selectedDiscounts.includes(discount) && styles.selectedDiscount
                ]}
                onPress={() => handleSelectDiscount(discount)}
              >
                <ThemedText style={styles.discountCode}>{discount.code}</ThemedText>
                <ThemedText style={styles.discountAmount}>
                  -{discount.amount.toLocaleString()}đ
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Shipping Options */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Shipping Options</ThemedText>
          <View style={styles.shippingOptions}>
            <TouchableOpacity
              style={[
                styles.shippingOption,
                selectedShipping === "standard" && styles.selectedShipping
              ]}
              onPress={() => {
                setSelectedShipping("standard");
                setShippingCost(0);
              }}
            >
              <View style={styles.radioContainer}>
                <View style={styles.radioOuter}>
                  {selectedShipping === "standard" && <View style={styles.radioInner} />}
                </View>
                <ThemedText style={styles.shippingLabel}>Standard</ThemedText>
              </View>
              <View style={styles.shippingDetail}>
                <ThemedText style={styles.shippingTime}>5-7 days</ThemedText>
                <ThemedText style={styles.shippingPrice}>FREE</ThemedText>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.shippingOption,
                selectedShipping === "express" && styles.selectedShipping
              ]}
              onPress={() => {
                setSelectedShipping("express");
                setShippingCost(12000);
              }}
            >
              <View style={styles.radioContainer}>
                <View style={styles.radioOuter}>
                  {selectedShipping === "express" && <View style={styles.radioInner} />}
                </View>
                <ThemedText style={styles.shippingLabel}>Express</ThemedText>
              </View>
              <View style={styles.shippingDetail}>
                <ThemedText style={styles.shippingTime}>1-2 days</ThemedText>
                <ThemedText style={styles.shippingPrice}>12.000đ</ThemedText>
              </View>
            </TouchableOpacity>
          </View>

          <ThemedText style={styles.deliveryDate}>
            Ngày đến dự kiến chưa có
          </ThemedText>
        </View>

        {/* Payment Method */}
        <View style={styles.sectionContainer}>
          <View style={styles.paymentMethodHeader}>
            <ThemedText style={styles.sectionTitle}>Payment Method</ThemedText>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.paymentMethodBox}>
            <ThemedText style={styles.paymentMethodText}>Card</ThemedText>
          </View>
        </View>
      </ScrollView>

      {/* Total and Pay Button - Updated to include delivery fee and discounts */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <ThemedText style={styles.totalLabel}>Tạm tính</ThemedText>
            <ThemedText style={styles.totalAmount}>{calculateSubtotal().toLocaleString()}đ</ThemedText>
          </View>
          <View style={styles.totalRow}>
            <ThemedText style={styles.totalLabel}>Phí vận chuyển ({distance.toFixed(1)}km)</ThemedText>
            <ThemedText style={styles.totalAmount}>{deliveryFee.toLocaleString()}đ</ThemedText>
          </View>
          <View style={styles.totalRow}>
            <ThemedText style={styles.totalLabel}>Giảm giá</ThemedText>
            <ThemedText style={styles.totalAmount}>
              -{selectedDiscounts.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}đ
            </ThemedText>
          </View>
          <View style={styles.totalRow}>
            <ThemedText style={styles.totalLabel}>Tổng cộng</ThemedText>
            <ThemedText style={styles.totalAmount}>{calculateFinalPrice().toLocaleString()}đ</ThemedText>
          </View>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={handleSubmitOrder}>
          <ThemedText style={styles.payButtonText}>Đặt hàng</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Shipping Address Modal */}
      <Modal
        visible={isShippingModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeShippingModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ShippingAddress
              key={userAddress}
              currentAddress={userAddress}
              onSave={(address) => {
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