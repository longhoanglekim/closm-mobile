import { StyleSheet } from "react-native";


export default StyleSheet.create({
    container: {
      marginVertical: 10,
      borderWidth: 1,
      borderColor: '#e0e0e0',
      borderRadius: 8,
      padding: 12,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    seeAllButton: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    seeAllText: {
      fontSize: 14,
      marginRight: 4,
    },
    seeAllIcon: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#0066FF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    arrowIcon: {
      color: '#FFFFFF',
      fontSize: 12,
    },
    categoriesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    categoryGroup: {
      width: '48%',
      marginBottom: 16,
      borderWidth: 1, 
      borderColor: '#dcdcdc', 
      borderRadius: 8, 
      padding: 10, 
      backgroundColor: '#ffffff', 
    },
    categoryImagesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    categoryTouhablepacity: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      gap: 3,
      paddingLeft: 10,
    },
    categoryImage: {
      width: 70,
      height: 80,
      borderRadius: 8,
      marginBottom: 4,
    },
    categoryInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    categoryName: {
      fontSize: 16,
      fontWeight: '500',
    },
    countBadge: {
      backgroundColor: '#F0F0F0',
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 12,
    },
    countText: {
      fontSize: 12,
      color: '#666666',
    },
  });