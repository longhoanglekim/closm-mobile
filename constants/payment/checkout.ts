import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  // Section Container
  sectionContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },

  // Address Section
  addressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
    marginRight: 8,
  },
  editButton: {
    padding: 5,
  },
  addAddressButton: {
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#cccccc",
    borderRadius: 5,
  },
  addAddressText: {
    color: "#007AFF",
    fontWeight: "500",
  },

  // Info Box
  infoBox: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    position: "relative",
  },
  contactText: {
    fontSize: 14,
    marginBottom: 5,
    lineHeight: 20,
    color: "#000",
  },

  // Loading and Error
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  loadingText: {
    marginLeft: 10,
    color: "#666",
  },
  errorText: {
    color: "#d32f2f",
    textAlign: "center",
    padding: 10,
  },

  // Items Section
  itemsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  itemsTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemCountBadge: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  itemCount: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  itemsContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    padding: 10,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  productInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  quantityBadge: {
    backgroundColor: "#eeeeee",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  quantityText: {
    fontSize: 12,
    fontWeight: "600",
  },
  productName: {
    fontSize: 14,
    flex: 1,
    color: "#333",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },

  // Discounts Section
  discountHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  noDiscountsText: {
    fontSize: 12,
    color: "#888",
    fontStyle: "italic",
  },
  discountScrollView: {
    flexDirection: "row",
  },
  discountItem: {
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
    padding: 10,
    marginRight: 10,
    width: 150,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  selectedDiscount: {
    backgroundColor: "#e3f2fd",
    borderColor: "#2196f3",
  },
  discountCode: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 4,
  },
  discountDescription: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
  },
  discountAmount: {
    color: "#e53935",
    fontWeight: "600",
  },

  // Shipping Options
  shippingOptions: {
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    padding: 10,
  },
  shippingOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  selectedShipping: {
    backgroundColor: "#e3f2fd",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#007AFF",
  },
  shippingLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  shippingDetail: {
    alignItems: "flex-end",
  },
  shippingTime: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  shippingPrice: {
    fontSize: 14,
    fontWeight: "500",
  },

  // Footer
  footer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F2F2F7",
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 14,
    color: "#8E8E93",
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: "bold",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  finalRow: {
    marginTop: 10,
  },
  finalTotalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  finalTotalAmount: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  payButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 16,
    width: 150,
    alignItems: "center",
  },
  payButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },

  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});