import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useStateContext } from "@/context/StateContext";
import { useSelector } from "react-redux";
import styles from "@/constants/checkout";


const Checkout = () => {
  const { cartItems } = useStateContext();
  const user = useSelector((state) => state.user);
  
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [shippingCost, setShippingCost] = useState(0);
  
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + shippingCost;
  };
  
  const handlePayment = () => {
    alert("Payment successful!");
    router.push("/");
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>Payment</ThemedText>
        </View>
        
        {/* Shipping Address */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Địa chỉ giao hàng</ThemedText>
          <View style={styles.infoBox}>
            <ThemedText style={styles.addressText}>
              địa chỉ giao hàng đến
            </ThemedText>
            <ThemedText style={styles.addressText}>Thành phố</ThemedText>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Contact Information */}
        <View style={styles.sectionContainer}>
          <ThemedText style={styles.sectionTitle}>Thông tin liên hệ</ThemedText>
          <View style={styles.infoBox}>
            <ThemedText style={styles.contactText}>099999999</ThemedText>
            <ThemedText style={styles.contactText}>mail</ThemedText>
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
            {cartItems.map((item, index) => (
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
            Ngày đến duwjw kiến chưa có
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
      
      {/* Total and Pay Button */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <ThemedText style={styles.totalLabel}>Tổng</ThemedText>
          <ThemedText style={styles.totalAmount}>{(calculateTotal()).toLocaleString()}đ</ThemedText>
        </View>
        
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <ThemedText style={styles.payButtonText}>Thanh toán</ThemedText>
        </TouchableOpacity>
      </View>
      
      {/* Bottom Tab Bar
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="heart-outline" size={24} color="#8E8E93" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="document-text-outline" size={24} color="#8E8E93" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="cart-outline" size={24} color="#8E8E93" />
          <View style={styles.cartBadge} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="#8E8E93" />
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

export default Checkout;