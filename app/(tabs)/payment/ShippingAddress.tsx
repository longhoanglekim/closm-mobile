import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import styles from '@/constants/payment/shippingAddress';

export default function ShippingAddress() {
  const [country, setCountry] = useState('Viet Nam');
  const [address, setAddress] = useState('214 Nguyen Xien, Hanoi');
  const [city, setCity] = useState('Hanoi');
  const [postcode, setPostcode] = useState('100000');

  const handleSave = () => {
    
    alert('Address updated successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Shipping Address</Text>

      {/* Country */}
      <Text style={styles.label}>Country</Text>
      <TextInput
        style={styles.input}
        value={country}
        onChangeText={setCountry}
        editable={false} 
      />

      {/* Address */}
      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter your address"
      />

      {/* City */}
      <Text style={styles.label}>Town / City</Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        placeholder="Enter your city"
      />

      {/* Postcode */}
      <Text style={styles.label}>Postcode</Text>
      <TextInput
        style={styles.input}
        value={postcode}
        onChangeText={setPostcode}
        placeholder="Enter your postcode"
        keyboardType="numeric"
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}