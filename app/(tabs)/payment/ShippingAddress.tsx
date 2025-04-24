import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from "@/components/ThemedText";
import styles from '@/constants/payment/shippingAddress';

interface ShippingAddressProps {
  currentAddress?: string;
  onSave: (address: string) => void;
  onClose: () => void;
}

const ShippingAddress = ({ currentAddress, onSave, onClose }: ShippingAddressProps) =>{
  // Tách địa chỉ hiện tại thành các phần
  const parseAddress = (fullAddress: string = '') => {
    const parts = fullAddress.split(', ');
    return {
      streetAddress: parts[0] || '',
      ward: parts[1] || '',
      district: parts[2] || '',
      city: parts[3] || ''
    };
  };

  const [formData, setFormData] = useState(parseAddress(currentAddress));

  // Cập nhật form khi currentAddress thay đổi
  useEffect(() => {
    if (currentAddress) {
      setFormData(parseAddress(currentAddress));
    }
  }, [currentAddress]);

  // Cập nhật từng trường trong form
  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Xử lý khi nhấn nút lưu
  const handleSave = () => {
    const { streetAddress, ward, district, city } = formData;
    // Kiểm tra các trường bắt buộc
    if (!streetAddress || !ward || !district || !city) {
      alert('Vui lòng điền đầy đủ thông tin địa chỉ');
      return;
    }
    // Ghép các phần thành địa chỉ đầy đủ
    const fullAddress = `${streetAddress}, ${ward}, ${district}, ${city}`;
    onSave(fullAddress);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>
          {currentAddress ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}
        </ThemedText>
      </View>
      <View style={styles.formGroup}>
        <ThemedText style={styles.label}>Tỉnh/Thành phố *</ThemedText>
        <TextInput
          style={styles.input}
          value={formData.city}
          onChangeText={(value) => handleChange('city', value)}
          placeholder="Nhập tỉnh/thành phố"
          placeholderTextColor="#999"
        />
      </View>
      <View style={styles.formGroup}>
        <ThemedText style={styles.label}>Quận/Huyện *</ThemedText>
        <TextInput
          style={styles.input}
          value={formData.district}
          onChangeText={(value) => handleChange('district', value)}
          placeholder="Nhập quận/huyện"
          placeholderTextColor="#999"
        />
      </View>
      <View style={styles.formGroup}>
        <ThemedText style={styles.label}>Phường/Xã *</ThemedText>
        <TextInput
          style={styles.input}
          value={formData.ward}
          onChangeText={(value) => handleChange('ward', value)}
          placeholder="Nhập phường/xã"
          placeholderTextColor="#999"
        />
      </View>
      <View style={styles.form}>
        <View style={styles.formGroup}>
          <ThemedText style={styles.label}>Số nhà, Tên đường *</ThemedText>
          <TextInput
            style={styles.input}
            value={formData.streetAddress}
            onChangeText={(value) => handleChange('streetAddress', value)}
            placeholder="Nhập số nhà, tên đường"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
        >
          <ThemedText style={styles.buttonText}>
            {currentAddress ? 'Cập nhật' : 'Thêm địa chỉ'}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onClose}
        >
          <ThemedText style={styles.cancelButtonText}>Hủy</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ShippingAddress;