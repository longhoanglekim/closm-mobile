import { StyleSheet } from "react-native";


export default StyleSheet.create({
    container: {
        marginVertical: 10,
      },
      header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
      },
      title: {
        fontSize: 18,
        fontWeight: "bold",
      },
      seeAll: {
        color: "#0066FF",
        fontWeight: "bold",
      },
      productContainer: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
        margin: 5,
        borderRadius: 8,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
      },
      image: {
        width: 150,
        height: 150,
        borderRadius: 8,
      },
      productName: {
        marginTop: 5,
        fontSize: 14,
        textAlign: "center",
      },
      price: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 5,
      },
  });