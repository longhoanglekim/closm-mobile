import { StyleSheet } from "react-native";


export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8F8FA",
    },
    scrollView: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: "#FFFFFF",
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "600",
    },
    cartCount: {
      marginLeft: 8,
      fontSize: 18,
      color: "#666",
    },
    addressContainer: {
      backgroundColor: "#FFFFFF",
      marginTop: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      justifyContent: "center",
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 8,
      
    },
    addressContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    addressTextContainer: {
      flex: 1,
    },
    addressText: {
      fontSize: 14,
      color: "#555",
      lineHeight: 20,
    },
    editButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "#E6F0FF",
      justifyContent: "center",
      alignItems: "center",
    },
    cartItemsContainer: {
      backgroundColor: "#FFFFFF",
      marginTop: 8,
    },
    cartItem: {
      flexDirection: "row",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#F0F0F0",
    },
    productImage: {
      width: 80,
      height: 100,
      borderRadius: 8,
    },
    productDetails: {
      flex: 1,
      marginLeft: 12,
    },
    productName: {
      fontSize: 14,
      fontWeight: "400",
      marginBottom: 4,
    },
    productVariant: {
      fontSize: 14,
      color: "#666",
      marginBottom: 8,
    },
    productPrice: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 12,
    },
    quantityContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
    },
    quantityButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "#DDD",
      justifyContent: "center",
      alignItems: "center",
    },
    quantityButtonText: {
      fontSize: 18,
      fontWeight: "500",
    },
    quantityTextContainer: {
      width: 40,
      alignItems: "center",
    },
    quantityText: {
      fontSize: 16,
    },
    removeButton: {
      marginLeft: 8,
      justifyContent: "center",
    },
    emptyCartContainer: {
      padding: 24,
      alignItems: "center",
    },
    emptyCartText: {
      fontSize: 16,
      color: "#666",
    },
    wishlistContainer: {
      backgroundColor: "#FFFFFF",
      marginTop: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    wishlistTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 16,
    },
    wishlistItem: {
      flexDirection: "row",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#F0F0F0",
    },
    wishlistImage: {
      width: 70,
      height: 80,
      borderRadius: 6,
    },
    wishlistItemDetails: {
      flex: 1,
      marginLeft: 12,
    },
    wishlistItemName: {
      fontSize: 14,
      fontWeight: "400",
      marginBottom: 4,
    },
    wishlistItemPrice: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 8,
    },
    wishlistVariantContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    variantPill: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
      backgroundColor: "#F0F0F0",
      marginRight: 8,
    },
    variantText: {
      fontSize: 12,
    },
    addToCartButton: {
      padding: 4,
      marginRight: 8,
    },
    removeWishlistButton: {
      padding: 4,
    },
    footer: {
      backgroundColor: "#FFFFFF",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: "#F0F0F0",
    },
    totalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    totalLabel: {
      fontSize: 16,
      fontWeight: "500",
    },
    totalAmount: {
      fontSize: 20,
      fontWeight: "700",
    },
    checkoutButton: {
      backgroundColor: "#0066FF",
      borderRadius: 8,
      paddingVertical: 14,
      alignItems: "center",
    },
    checkoutButtonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
    },
  });