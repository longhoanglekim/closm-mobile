import { StyleSheet } from "react-native";


export default StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
      height: "80%",
      backgroundColor: "white",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
    },
    modalHeader: {
      flexDirection: "row",
      justifyContent: "flex-end",
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    closeButton: {
      padding: 5,
    },
    closeButtonText: {
      fontSize: 20,
      color: "#333",
    },
    modalContent: {
      flex: 1,
    },
    productInfoContainer: {
      flexDirection: "row",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    productThumbnail: {
      width: 80,
      height: 80,
      borderRadius: 4,
    },
    productInfo: {
      marginLeft: 12,
      justifyContent: "center",
    },
    price: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#33CCFF",
      marginBottom: 4,
    },
    stock: {
      fontSize: 14,
      color: "#757575",
    },
    sectionContainer: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 12,
    },
    sizeOptionsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 20,
    },
    sizeOption: {
      width: 60,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#dbdbdb",
      borderRadius: 4,
      marginRight: 8,
      marginBottom: 8,
    },
    selectedSizeOption: {
      borderColor: "#33CCFF",
      backgroundColor: "#fff8f7",
    },
    sizeOptionText: {
      fontSize: 14,
      color: "#333",
    },
    selectedSizeOptionText: {
      color: "#33CCFF",
    },
    quantitySelector: {
      flexDirection: "row",
      alignItems: "center",
    },
    quantityButton: {
      width: 36,
      height: 36,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#dbdbdb",
    },
    quantityButtonText: {
      fontSize: 16,
    },
    quantityValueContainer: {
      width: 50,
      height: 36,
      justifyContent: "center",
      alignItems: "center",
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: "#dbdbdb",
    },
    quantityValue: {
      fontSize: 14,
    },
    installmentContainer: {
      padding: 16,
    },
    installmentOption: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    installmentHighlight: {
      backgroundColor: "#33CCFF",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 2,
      marginRight: 8,
    },
    installmentHighlightText: {
      color: "white",
      fontSize: 12,
    },
    installmentDetails: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    installmentPrice: {
      fontWeight: "500",
      marginRight: 4,
    },
    installmentTerms: {
      color: "#757575",
    },
    installmentInfo: {
      fontSize: 12,
      color: "#757575",
    },
    footerContainer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: "#eee",
    },
    addToCartButton: {
      backgroundColor: "#33CCFF",
      borderRadius: 4,
      height: 48,
      justifyContent: "center",
      alignItems: "center",
    },
    addToCartButtonText: {
      color: "white",
      fontWeight: "500",
      fontSize: 16,
    },
  });