import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Banner = () => {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}>Big Sale - Up to 50% Off</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark background
    borderRadius: 8,
    marginVertical: 10,
  },
  bannerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  }
});

export default Banner;