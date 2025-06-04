import { StyleSheet, Dimensions } from "react-native";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F6",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F4F6",
  },

  // ===== ẢNH TRÊN CÙNG & BACK BUTTON =====
  topImageContainer: {
    width: "100%",
    height: SCREEN_WIDTH, // làm vuông (1:1) hoặc bạn có thể tăng chiều cao
    backgroundColor: "#eee",
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  backIcon: {
    fontSize: 20,
    color: "#333",
  },

  // ===== CARD CHỨA NỘI DUNG =====
  cardContainer: {
    position: "absolute",
    top: SCREEN_WIDTH - 30, // kéo card chồng lên ảnh (overlap 30px)
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // Header: tên & giá
  headerContainer: {
    marginBottom: 16,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1C1C1C",
    flex: 1,
    marginRight: 10,
  },
  heartIcon: {
    fontSize: 22,
    color: "#FF6F61",
  },
  priceTag: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: "600",
    color: "#FF6F61",
  },

  // Rating
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  ratingText: {
    color: "#FFA500",
    fontSize: 16,
    marginRight: 6,
  },
  ratingCount: {
    fontSize: 14,
    color: "#888",
  },

  // Section title (ví dụ: Chọn Size, Mô Tả, ...)
  sectionTitle: {
    marginBottom: 8,
  },
  sectionTitleText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  // Size pills
  sizeScroll: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  sizePill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#CCC",
    marginRight: 12,
    backgroundColor: "#FFF",
  },
  sizePillSelected: {
    backgroundColor: "#FFEBE8",
    borderColor: "#FF6F61",
  },
  sizePillText: {
    fontSize: 14,
    color: "#333",
  },
  sizePillTextSelected: {
    color: "#FF6F61",
    fontWeight: "600",
  },

  // Thuộc tính (Màu, Số lượng)
  attributeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 16,
  },
  attrLabel: {
    fontSize: 14,
    color: "#555",
  },
  attrValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginHorizontal: 4,
  },
  attrSpacer: {
    fontSize: 14,
    color: "#CCC",
    marginHorizontal: 4,
  },

  // Mô tả
  descriptionText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },

  // Thông tin shipping & bảo hành
  infoCardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  infoCard: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFFAF9",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginRight: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
    flexShrink: 1,
  },

  // ===== BOTTOM BAR =====
  bottomBar: {
    position: "absolute",
    left: 20,
    right: 20,
    flexDirection: "row",
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    alignItems: "center",
    paddingHorizontal: 12,
  },
  chatButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F4F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  chatIcon: {
    fontSize: 20,
  },
  cartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFEFF0",
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5,
    marginRight: 12,
  },
  cartIcon: {
    fontSize: 18,
    marginRight: 6,
    color: "#FF6F61",
  },
  cartText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF6F61",
  },
  buyButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FF6F61",
    justifyContent: "center",
    alignItems: "center",
  },
  buyText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFF",
  },
});