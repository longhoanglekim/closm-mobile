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
import styles from '@/constants/ProductDetail';
const ProductDetail = () => {

  return (
    <View style={styles.container}>
      <View>
        <Image />
      </View>
    </View>
  );
};



export default ProductDetail;