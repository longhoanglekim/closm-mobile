import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const ProductDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
//   const { categoryName } = route.params;

  // Mock data - replace with your actual product data
  const products = [
    {
      id: 1,
      name: 'Classic T-Shirt',
      price: 29.99,
      image: 'https://picsum.photos/300/400?random=1'
    },
    {
      id: 2,
      name: 'Stylish Hoodie',
      price: 49.99,
      image: 'https://picsum.photos/300/400?random=2'
    },
    {
      id: 3,
      name: 'Trendy Jacket',
      price: 79.99,
      image: 'https://picsum.photos/300/400?random=3'
    },
    {
      id: 4,
      name: 'Casual Shirt',
      price: 39.99,
      image: 'https://picsum.photos/300/400?random=4'
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        {/* <Text style={styles.headerTitle}>{categoryName}</Text> */}
      </View>

      {/* Product Grid */}
      <ScrollView contentContainerStyle={styles.productGrid}>
        {products.map((product) => (
          <TouchableOpacity 
            key={product.id} 
            style={styles.productCard}
            onPress={() => {/* Navigate to product detail */}}
          >
            <Image 
              source={{ uri: product.image }} 
              style={styles.productImage} 
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>${product.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  backButton: {
    marginRight: 15
  },
  backButtonText: {
    fontSize: 16,
    color: '#333'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10
  },
  productCard: {
    width: '48%',
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  productImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  productInfo: {
    padding: 10
  },
  productName: {
    fontSize: 16,
    fontWeight: '600'
  },
  productPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 5
  }
});

export default ProductDetail;