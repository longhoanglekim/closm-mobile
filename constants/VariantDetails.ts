// VariantDetails.ts
import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  // ====== Container chính ======
  container: {
    flex: 1,
    backgroundColor: "#F5F5F8", // xám rất nhạt để nền không quá chói
  },

  // ====== Loading ======
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F8",
  },

  // ====== HEADER ======
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E0E0E0",
    // Đổ bóng nhẹ ở Android
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
    }),
  },
  backIcon: {
    fontSize: 22,
    color: "#333333",
  },
  headerSpacer: {
    flex: 1,
  },
  headerIcon: {
    fontSize: 22,
    color: "#333333",
    marginHorizontal: 12,
  },
  headerMore: {
    paddingLeft: 8,
  },

  // ====== ẢNH SẢN PHẨM ======
  imageWrapper: {
    width: "100%",
    aspectRatio: 1, 
    backgroundColor: "#EFEFEF",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  imageNavigation: {
    position: "absolute",
    bottom: 12,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  imageNavText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "500",
  },

  // ====== TIÊU ĐỀ SẢN PHẨM & MÔ TẢ & YÊU THÍCH ======
  titleSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
  },
  titleText: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700",
    color: "#222222",
    lineHeight: 28,
  },
  descriptionText: {
    fontSize: 15,
    color: "#666666",
    marginTop: 4,
    lineHeight: 22,
  },
  heartIcon: {
    fontSize: 24,
    color: "#FF4D4F", // đỏ nổi bật
    marginLeft: 12,
    marginTop: 2,
  },

  // ====== PHẦN GIÁ & KHUYẾN MÃI ======
  priceSection: {
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: "#FFFFFF",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  price: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FF5500",
  },
  originalPrice: {
    fontSize: 16,
    color: "#999999",
    textDecorationLine: "line-through",
    marginLeft: 12,
  },
  installment: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  installmentText: {
    fontSize: 13,
    color: "#FF5500",
    fontWeight: "600",
  },

  promoContainer: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  promoBox: {
    flex: 1,
    backgroundColor: "#FFF5E6",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 12,
    // Đổ bóng nhẹ
    ...Platform.select({
      android: {
        elevation: 1,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 1,
      },
    }),
  },
  promoText: {
    fontSize: 13,
    color: "#FF7733",
    fontWeight: "600",
  },
  // Xóa marginRight của promoBox cuối cùng
  promoBoxLast: {
    marginRight: 0,
  },

  // ====== THÔNG TIN VẬN CHUYỂN ======
  shippingSection: {
    marginTop: 4,
    backgroundColor: "#FFFFFF",
  },
  shippingCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E0E0E0",
  },
  shippingIcon: {
    fontSize: 18,
    marginRight: 10,
    color: "#555555",
  },
  shippingText: {
    flex: 1,
    fontSize: 14,
    color: "#333333",
    lineHeight: 20,
  },
  shippingArrow: {
    fontSize: 14,
    color: "#AAAAAA",
  },

  // ====== CHỌN SIZE & COLOR & STOCK ======
  sizeSection: {
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E0E0E0",
  },
  sizeHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  sizeHeaderText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  sizeArrow: {
    fontSize: 14,
    color: "#AAAAAA",
  },
  sizeList: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  sizeBox: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 12,
    marginBottom: 12,
    backgroundColor: "#FAFAFA",
  },
  sizeBoxSelected: {
    borderColor: "#1183ED",
    backgroundColor: "#E6F2FF",
  },
  sizeText: {
    fontSize: 14,
    color: "#444444",
    fontWeight: "500",
  },
  sizeTextSelected: {
    color: "#1183ED",
    fontWeight: "700",
  },
  colorStockRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    paddingHorizontal: 20,
  },
  colorText: {
    fontSize: 14,
    color: "#333333",
    fontWeight: "500",
  },
  stockText: {
    fontSize: 14,
    color: "#333333",
    marginLeft: 12,
    fontWeight: "500",
  },

  // ====== ĐÁNH GIÁ SẢN PHẨM ======
  ratingSection: {
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E0E0E0",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  ratingHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingIcon: {
    fontSize: 18,
    marginRight: 8,
    color: "#FFC107", // màu vàng cho icon sao
  },
  ratingText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  ratingAll: {
    fontSize: 14,
    color: "#1183ED",
    fontWeight: "500",
  },

  // ====== BOTTOM BAR ======
  bottomBar: {
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    justifyContent: "space-around",
    // Đổ bóng nhẹ
    ...Platform.select({
      android: {
        elevation: 4,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
    }),
  },
  bottomBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: "#F5F5F8",
    // Đổ bóng
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 1,
      },
    }),
  },
  bottomBtnText: {
    fontSize: 15,
    color: "#333333",
    fontWeight: "600",
  },

  // Nếu bạn muốn nút Buy Now riêng màu
  bottomBtnPrimary: {
    backgroundColor: "#1183ED",
  },
  bottomBtnPrimaryText: {
    color: "#FFFFFF",
  },
});
