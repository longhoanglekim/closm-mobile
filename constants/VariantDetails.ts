// File: @/constants/VariantDetails.js
import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const PRIMARY_COLOR = "#FF5500";         // Màu cam chủ đạo
const TEXT_COLOR = "#333333";            // Màu chữ chính
const SUBTEXT_COLOR = "#777777";         // Màu chữ phụ
const BACKGROUND = "#FFFFFF";            // Màu nền chung
const CARD_BACKGROUND = "#F9F9F9";       // Màu nền card, section

export default StyleSheet.create({
  // ======== Container chính ========
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACKGROUND,
  },

  // ======== Header ========
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: BACKGROUND,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
    zIndex: 10,
  },
  backIcon: {
    fontSize: 24,
    color: TEXT_COLOR,
  },
  headerIcon: {
    fontSize: 22,
    color: TEXT_COLOR,
    marginHorizontal: 12,
  },
  headerMore: {
    marginLeft: 8,
  },
  headerSpacer: {
    flex: 1,
  },

  // ======== Ảnh sản phẩm ========
  productImage: {
    width: width,
    height: width * 0.9, // Tỷ lệ 1:0.9 để bớt lấn chỗ, vẫn to và rõ
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  imageWrapper: {
    backgroundColor: BACKGROUND,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: "hidden",
  },
  imageNavigation: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  imageNavText: {
    color: "#FFFFFF",
    fontSize: 12,
  },

  // ======== Phần giá & khuyến mãi ========
  priceSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: BACKGROUND,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  price: {
    fontSize: 30,
    fontWeight: "700",
    color: PRIMARY_COLOR,
  },
  originalPrice: {
    fontSize: 16,
    color: SUBTEXT_COLOR,
    textDecorationLine: "line-through",
    marginLeft: 12,
    marginBottom: 2,
  },
  installment: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  installmentText: {
    color: PRIMARY_COLOR,
    fontSize: 14,
    fontWeight: "500",
    marginRight: 4,
  },
  promoContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 12,
  },
  promoBox: {
    backgroundColor: "#FFF2F0",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  promoText: {
    color: PRIMARY_COLOR,
    fontSize: 13,
    fontWeight: "600",
  },

  // ======== Tiêu đề & yêu thích ========
  titleSection: {
    paddingHorizontal: 20,
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "600",
    color: TEXT_COLOR,
    flex: 1,
    marginRight: 12,
  },
  heartIcon: {
    fontSize: 24,
    color: "#DD3333",
  },

  // ======== Thông tin vận chuyển ========
  shippingSection: {
    marginTop: 16,
    paddingHorizontal: 20,
  },
  shippingCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CARD_BACKGROUND,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  shippingIcon: {
    fontSize: 18,
  },
  shippingText: {
    marginLeft: 12,
    flex: 1,
    fontSize: 14,
    color: TEXT_COLOR,
  },
  shippingArrow: {
    fontSize: 16,
    color: SUBTEXT_COLOR,
  },

  // ======== Chọn SIZE & COLOR & STOCK ========
  sizeSection: {
    marginTop: 16,
    paddingHorizontal: 20,
  },
  sizeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  sizeHeaderText: {
    fontSize: 15,
    fontWeight: "500",
    color: TEXT_COLOR,
  },
  sizeArrow: {
    fontSize: 16,
    color: SUBTEXT_COLOR,
  },
  sizeList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  sizeBox: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginBottom: 10,
  },
  sizeBoxSelected: {
    borderColor: PRIMARY_COLOR,
    backgroundColor: "#FFF2F0",
  },
  sizeText: {
    fontSize: 14,
    color: TEXT_COLOR,
  },
  sizeTextSelected: {
    fontSize: 14,
    color: PRIMARY_COLOR,
    fontWeight: "600",
  },
  colorStockRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  colorText: {
    fontSize: 14,
    color: TEXT_COLOR,
    fontWeight: "500",
  },
  stockText: {
    fontSize: 14,
    color: SUBTEXT_COLOR,
    marginLeft: 6,
  },

  // ======== Đánh giá sản phẩm ========
  ratingSection: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: BACKGROUND,
    paddingBottom: 8,
  },
  ratingHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingIcon: {
    fontSize: 18,
    color: PRIMARY_COLOR,
    marginRight: 6,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "500",
    color: TEXT_COLOR,
  },
  ratingAll: {
    fontSize: 14,
    color: PRIMARY_COLOR,
    marginLeft: "auto",
  },

  // ======== Bottom Bar ========
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    padding: 10,
    backgroundColor: BACKGROUND,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  bottomBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: CARD_BACKGROUND,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  bottomBtnText: {
    color: TEXT_COLOR,
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 6,
  },
  buyBtn: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  buyBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  // ======== Ví dụ bổ sung: số lượng (Quantity) ========
  // Nếu bạn muốn thêm phần chọn số lượng trong modal hoặc dưới size:
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    paddingHorizontal: 20,
  },
  quantityBtn: {
    fontSize: 22,
    fontWeight: "600",
    color: PRIMARY_COLOR,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "500",
    color: TEXT_COLOR,
    marginHorizontal: 16,
  },
});
