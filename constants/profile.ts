import { StyleSheet } from "react-native";


export default StyleSheet.create(
    {
        userAchivementContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
        },
        achievement: {
            flexDirection: "row",
            alignItems: "center",
            borderColor: "red",
            borderWidth: 1,
            padding: 10
        },
        userActivityContainer: {
            flexDirection: "row",
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 10,
            overflow: "hidden",
            margin: 16,
          },
          activity: {
            flex: 1,
            padding: 12,
            justifyContent: "center",
            alignItems: "center",
          },
          verticalDivider: {
            width: 1,
            backgroundColor: "#ccc",
            marginVertical: 10,
          },
          
    }
)