import { StyleSheet } from "react-native";

const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: { marginRight: 10 },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#333" },
  // Footer & Pay Button
  footer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F2F2F7",
  },
  payButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  disabledButton: { backgroundColor: "#cccccc" },
  payButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});
export default layoutStyles;