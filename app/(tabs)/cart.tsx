import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useStateContext } from "@/context/StateContext"; // Adjust import path as needed
import styles from "@/constants/Cart";
import { useSelector } from "react-redux";
import LoginScreen from "../view/login";

export default function CartScreen() {
  const { cartItems, addToCart, removeFromCart, updateQuantity } =
    useStateContext();
  const user = useSelector((state) => state.user);
  if (user.isLoggedIn) {
    console.log("User is logged in:", user.userInfo.email);
  }

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    router.push("/view/checkout");
  };

  const addWishlistItemToCart = (item) => {
    addToCart({
      ...item,
      quantity: 1,
    });
  };

  return (
    (!user.isLoggedIn && <LoginScreen />) || (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <ThemedText style={styles.headerTitle}>Cart</ThemedText>
            <ThemedText style={styles.cartCount}>{cartItems.length}</ThemedText>
          </View>

          {/* Shipping Address */}
          <View style={styles.addressContainer}>
            <ThemedText style={styles.sectionTitle}>
              Shipping Address
            </ThemedText>
            <View style={styles.addressContent}>
              <View style={styles.addressTextContainer}>
                <ThemedText style={styles.addressText}>
                  214 nguyen xien
                </ThemedText>
                <ThemedText style={styles.addressText}>HN </ThemedText>
              </View>
              <TouchableOpacity style={styles.editButton}>
                <Ionicons name="pencil" size={20} color="#0066FF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Cart Items */}
          {cartItems.length > 0 ? (
            <View style={styles.cartItemsContainer}>
              {cartItems.map((item, index) => (
                <View
                  key={`${item.id}-${item.size}-${item.color}`}
                  style={styles.cartItem}
                >
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                  <View style={styles.productDetails}>
                    <ThemedText style={styles.productName}>
                      {item.name}
                    </ThemedText>
                    <ThemedText style={styles.productVariant}>
                      {item.color}, Size {item.size}
                    </ThemedText>
                    <Text style={styles.productPrice}>
                      {item.price.toLocaleString()}đ
                    </Text>

                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => {
                          if (item.quantity > 1) {
                            updateQuantity(
                              item.id,
                              item.size,
                              item.color,
                              item.quantity - 1
                            );
                          }
                        }}
                      >
                        <ThemedText style={styles.quantityButtonText}>
                          −
                        </ThemedText>
                      </TouchableOpacity>

                      <View style={styles.quantityTextContainer}>
                        <ThemedText style={styles.quantityText}>
                          {item.quantity}
                        </ThemedText>
                      </View>

                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() =>
                          updateQuantity(
                            item.id,
                            item.size,
                            item.color,
                            item.quantity + 1
                          )
                        }
                      >
                        <ThemedText style={styles.quantityButtonText}>
                          +
                        </ThemedText>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() =>
                      removeFromCart(item.id, item.size, item.color)
                    }
                  >
                    <Ionicons name="trash-outline" size={22} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyCartContainer}>
              <ThemedText style={styles.emptyCartText}>
                Your cart is empty
              </ThemedText>
            </View>
          )}
        </ScrollView>

        {/* Total and Checkout */}
        <ThemedView style={styles.footer}>
          <View style={styles.totalContainer}>
            <ThemedText style={styles.totalLabel}>Total</ThemedText>
            <ThemedText style={styles.totalAmount}>
              {calculateTotal().toLocaleString()}đ
            </ThemedText>
          </View>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}
          >
            <ThemedText style={styles.checkoutButtonText}>Checkout</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </SafeAreaView>
    )
  );
}
