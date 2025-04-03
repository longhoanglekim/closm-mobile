import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Your original styles
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
  },
  cameraButton: {
    padding: 10,
  },
  cameraButtonText: {
    fontSize: 20,
  },
  categoryTabs: {
    paddingVertical: 10,
  },
  categoryTabsScroll: {
    paddingHorizontal: 10,
  },
  categoryTab: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  },
  categoryTabText: {
    color: '#333',
  },
  allItemsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  allItemsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterButton: {
    padding: 10,
  },
  filterButtonText: {
    fontSize: 20,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flex: 1,
  },
  productItem: {
    width: '100%',
    height: '100%',
    marginBottom: 15,
    aspectRatio: 1,
  },
  productImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  productPrice: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  categoryContainer: {
    width: '48%',
    marginBottom: 20,
  },
  imagesContainer: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  selectedCategoryTab: {
    backgroundColor: '#f0f0f0',
    borderColor: '#ddd',
  },
  selectedCategoryTabText: {
    fontWeight: 'bold',
  },

  // Additional styles from my suggestion
  variantsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  variantItem: {
    width: '48%',
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  // variantImage: {
  //   width: '100%',
  //   height: '100%',
  // },
  selectedCategoryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  selectedCategoryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedCountBadge: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  selectedCountText: {
    fontSize: 14,
  },
  noProductsText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
    color: '#888',
    width: '100%',
  },
  //neww
  variantCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
  },
  variantImage: {
    width: '100%',
    height: 140,
  },
  variantInfo: {
    padding: 10,
  },
  variantName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#333',
  },
  variantPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d42f2f',
    marginBottom: 4,
  },
  //details items
  variantDesc: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  variantMeta: {
    fontSize: 12,
    color: '#777',
  },
  
  
});