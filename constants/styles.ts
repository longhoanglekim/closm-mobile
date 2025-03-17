import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    marginLeft: 10,
  },
  announcement: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  announcementText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  recentlyViewed: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  orderButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  orderButton: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  storyCard: {
    width: 120,
    height: 150,
    borderRadius: 10,
    backgroundColor: "#FFF",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  storyImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});