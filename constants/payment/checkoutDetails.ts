import { StyleSheet } from "react-native";


const detailStyles = StyleSheet.create({
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
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10, color: "#333" },

  // Address Section
  addressHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  addressContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  addressText: { flex: 1, fontSize: 14, lineHeight: 20, color: "#333", marginRight: 8 },
  addAddressButton: { padding: 10, alignItems: "center", borderWidth: 1, borderStyle: "dashed", borderColor: "#cccccc", borderRadius: 5 },
  addAddressText: { color: "#007AFF", fontWeight: "500" },
  editButton: { padding: 5 },
  infoBox: { padding: 10, backgroundColor: "#f9f9f9", borderRadius: 5 },

  // Contact Text
  contactText: { fontSize: 14, marginBottom: 5, lineHeight: 20, color: "#000" },

  // Loading and Error
  loadingContainer: { flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 10 },
  loadingText: { marginLeft: 10, color: "#666" },
  errorText: { color: "#d32f2f", textAlign: "center", padding: 10 },

  // Delivery Info
  deliveryInfoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8 },
  deliveryInfoLabel: { fontSize: 14, color: "#555" },
  deliveryInfoValue: { fontSize: 14, fontWeight: "500", color: "#000" },

  // Items Section
  itemsHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 },
  itemsTitleContainer: { flexDirection: "row", alignItems: "center" },
  itemCountBadge: { backgroundColor: "#007AFF", borderRadius: 12, width: 24, height: 24, justifyContent: "center", alignItems: "center", marginLeft: 8 },
  itemCount: { color: "#ffffff", fontSize: 12, fontWeight: "600" },
  itemsContainer: { backgroundColor: "#f9f9f9", borderRadius: 5, padding: 10 },
  cartItem: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#eeeeee" },
  productImage: { width: 60, height: 60, borderRadius: 5, marginRight: 10 },
  productDetails: { flex: 1, justifyContent: "space-between", flexDirection: "row", alignItems: "center" },
  productInfo: { flex: 1, flexDirection: "row", alignItems: "center" },
  quantityBadge: { backgroundColor: "#eeeeee", borderRadius: 12, width: 24, height: 24, justifyContent: "center", alignItems: "center", marginRight: 10 },
  quantityText: { fontSize: 12, fontWeight: "600" },
  productName: { fontSize: 14, flex: 1, color: "#333" },
  productPrice: { fontSize: 14, fontWeight: "600", color: "#000" },

  // Discounts Section
  discountHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  noDiscountsText: { fontSize: 12, color: "#888", fontStyle: "italic" },
  discountScrollView: { flexDirection: "row" },
  discountItem: { backgroundColor: "#f0f0f0", borderRadius: 6, padding: 10, marginRight: 10, width: 150, borderWidth: 1, borderColor: "#e0e0e0" },
  selectedDiscount: { backgroundColor: "#e3f2fd", borderColor: "#2196f3" },
  discountCode: { fontWeight: "600", fontSize: 14, marginBottom: 4 },
  discountDescription: { fontSize: 12, color: "#666", marginBottom: 6 },
  discountAmount: { color: "#e53935", fontWeight: "600" },

  // Shipping Options
  shippingOptions: { backgroundColor: "#f9f9f9", borderRadius: 5, padding: 10 },
  shippingOption: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: "#eeeeee" },
  selectedShipping: { backgroundColor: "#e3f2fd" },
  radioContainer: { flexDirection: "row", alignItems: "center" },
  radioOuter: { height: 20, width: 20, borderRadius: 10, borderWidth: 2, borderColor: "#007AFF", alignItems: "center", justifyContent: "center", marginRight: 10 },
  radioInner: { height: 10, width: 10, borderRadius: 5, backgroundColor: "#007AFF" },
  shippingLabel: { fontSize: 14, fontWeight: "500" },
  shippingDetail: { alignItems: "flex-end" },
  shippingTime: { fontSize: 12, color: "#666", marginBottom: 4 },
  shippingPrice: { fontSize: 14, fontWeight: "500" },

  // Payment Method
  paymentMethodHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  paymentMethodBox: { backgroundColor: "#f9f9f9", borderRadius: 5, padding: 10, marginBottom: 16 },
  paymentMethodText: { fontSize: 14, color: "#000" },

  // Totals
  totalContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  totalLabel: {
    fontSize: 15,
    color: '#666',
  },
  totalAmount: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  totalSubtext: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  summaryContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    marginTop: 8,
    paddingVertical: 12,
  },
  finalTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  finalTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  finalTotalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  paymentButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  paymentButtonDisabled: {
    backgroundColor: '#ccc',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Modal Styles
  modalContainer: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "#fff", padding: 16, borderTopLeftRadius: 12, borderTopRightRadius: 12 }
});
  
  export default detailStyles;