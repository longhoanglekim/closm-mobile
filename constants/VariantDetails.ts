import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  page: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  backIcon: {
    fontSize: 24,
  },
  headerIcon: {
    fontSize: 22,
  },
  headerMore: {
    marginLeft: 15,
  },
  productImage: {
    width: "100%",
    height: 400,
  },
  imageNavigation: {
    position: "absolute",
    top: 380,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 5,
    borderRadius: 15,
  },
  priceSection: {
    padding: 15,
  },
  price: {
    fontSize: 24,
    color: "#33CCFF",
    fontWeight: "bold",
  },
  originalPrice: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through",
  },
  installment: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  installmentText: {
    fontSize: 14,
  },
  promotionContainer: {
    flexDirection: "row",
    padding: 10,
  },
  promoBox: {
    flex: 1,
    backgroundColor: "#FFE8E8",
    padding: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  promoText: {
    fontSize: 12,
    color: "#33CCFF",
  },
  titleSection: {
    padding: 15,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  heartIcon: {
    fontSize: 22,
    color: "#33CCFF",
  },
  shippingSection: {
    padding: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#F0F0F0",
  },
  shippingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  shippingText: {
    marginLeft: 10,
    flex: 1,
  },
  sizeSection: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#F0F0F0",
  },
  sizeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sizeList: {
    flexDirection: "row",
    marginTop: 15,
  },
  sizeBox: {
    width: 60,
    height: 40,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: "#FFFFFF",
  },
  sizeBoxSelected: {
    borderColor: "#33CCFF",
    backgroundColor: "#FFF0E8",
  },
  sizeText: {
    color: "#000000",
  },
  sizeTextSelected: {
    color: "#33CCFF",
  },
  ratingSection: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#F0F0F0",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ratingText: {
    fontSize: 16,
    marginLeft: 5,
  },
  bottomBar: {
    flexDirection: "row",
    height: 50,
    borderTopWidth: 1,
    borderColor: "#F0F0F0",
  },
  bottomBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#F0F0F0",
  },
  bottomBtnText: {
    fontSize: 12,
  },
  buyBtn: {
    flex: 1,
    backgroundColor: "#33CCFF",
    justifyContent: "center",
    alignItems: "center",
  },
  buyBtnText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  colorInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingHorizontal: 12,
  },
  colorText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  stockText: {
    fontSize: 14,
    color: "#33CCFF",
    fontWeight: "500",
  },
});
