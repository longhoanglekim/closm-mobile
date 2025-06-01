import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { getProvinces, getDistrictsOfProvince, getWardsOfDistrict } from "@/api/Location/Location";

interface ShippingAddressProps {
  currentAddress?: string;
  onSave: (address: string) => void;
  onClose: () => void;
}

const ShippingAddress = ({ currentAddress, onSave, onClose }: ShippingAddressProps) => {
  // Helper tách địa chỉ
  const parseAddress = (fullAddress = '') => {
    const parts = fullAddress.split(', ');
    return {
      streetAddress: parts[0] || '',
      ward: parts[1] || '',
      district: parts[2] || '',
      city: parts[3] || '',
    };
  };

  const [formData, setFormData] = useState(parseAddress(currentAddress));
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  // Dropdown state
  const [provinceOpen, setProvinceOpen] = useState(false);
  const [districtOpen, setDistrictOpen] = useState(false);
  const [wardOpen, setWardOpen] = useState(false);

  // Giá trị chọn
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [loading, setLoading] = useState(false);

  // Lấy tỉnh/thành phố
  useEffect(() => {
    setLoading(true);
    getProvinces().then(data => {
      setProvinces(data);
      setLoading(false);
    });
  }, []);

  // Lấy giá trị khi edit
  useEffect(() => {
    if (currentAddress) {
      setFormData(parseAddress(currentAddress));
      const provinceObj = provinces.find(p => p.name === parseAddress(currentAddress).city);
      if (provinceObj) setSelectedProvince(provinceObj.code);
    }
  }, [currentAddress, provinces]);

  // Khi chọn tỉnh
  useEffect(() => {
    if (selectedProvince) {
      setLoading(true);
      getDistrictsOfProvince(selectedProvince).then(data => {
        setDistricts(data);
        setSelectedDistrict('');
        setWards([]);
        setSelectedWard('');
        setLoading(false);
      });
    } else {
      setDistricts([]); setSelectedDistrict(''); setWards([]); setSelectedWard('');
    }
  }, [selectedProvince]);

  // Khi chọn huyện
  useEffect(() => {
    if (selectedDistrict) {
      setLoading(true);
      getWardsOfDistrict(selectedDistrict).then(data => {
        setWards(data);
        setSelectedWard('');
        setLoading(false);
      });
    } else {
      setWards([]); setSelectedWard('');
    }
  }, [selectedDistrict]);

  // Auto update formData khi chọn dropdown
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      city: provinces.find(p => p.code === selectedProvince)?.name || '',
      district: districts.find(d => d.code === selectedDistrict)?.name || '',
      ward: wards.find(w => w.code === selectedWard)?.name || '',
    }));
  }, [selectedProvince, selectedDistrict, selectedWard]);

  // Đảm bảo chỉ mở 1 dropdown
  const onProvinceOpen = () => { setProvinceOpen(true); setDistrictOpen(false); setWardOpen(false); };
  const onDistrictOpen = () => { setDistrictOpen(true); setProvinceOpen(false); setWardOpen(false); };
  const onWardOpen = () => { setWardOpen(true); setProvinceOpen(false); setDistrictOpen(false); };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    const { streetAddress, ward, district, city } = formData;
    if (!streetAddress || !ward || !district || !city) {
      alert('Vui lòng điền đầy đủ thông tin địa chỉ');
      return;
    }
    const fullAddress = `${streetAddress}, ${ward}, ${district}, ${city}`;
    onSave(fullAddress);
  };

  // Chuẩn hóa data cho dropdown
  const provinceItems = provinces.map(p => ({ label: p.name, value: p.code }));
  const districtItems = districts.map(d => ({ label: d.name, value: d.code }));
  const wardItems = wards.map(w => ({ label: w.name, value: w.code }));

  return (
    <View style={simpleStyles.container}>
      <Text style={simpleStyles.header}>Thêm địa chỉ mới</Text>
      {loading && <ActivityIndicator />}
      {/* Dropdown tỉnh */}
      <View style={{ marginBottom: 18, zIndex: 3 }}>
        <Text style={simpleStyles.label}>Tỉnh/Thành phố *</Text>
        <DropDownPicker
          open={provinceOpen}
          value={selectedProvince}
          items={provinceItems}
          setOpen={setProvinceOpen}
          setValue={(val) => {
            setSelectedProvince(val);
            setProvinceOpen(false);
          }}
          placeholder="Chọn tỉnh/thành phố"
          zIndex={3000}
          zIndexInverse={1000}
          listMode="SCROLLVIEW"
          maxHeight={200}
        />

      </View>
      {/* Dropdown huyện */}
      <View style={{ marginBottom: 18, zIndex: 2 }}>
        <Text style={simpleStyles.label}>Quận/Huyện *</Text>
        <DropDownPicker
          open={districtOpen}
          value={selectedDistrict}
          items={districtItems}
          setOpen={setDistrictOpen}
          setValue={(val) => {
            setSelectedDistrict(val);
            setDistrictOpen(false);
          }}
          placeholder="Chọn quận/huyện"
          disabled={!selectedProvince}
          zIndex={2000}
          zIndexInverse={2000}
          listMode="SCROLLVIEW"
          maxHeight={200}
        />
      </View>
      {/* Dropdown xã */}
      <View style={{ marginBottom: 18, zIndex: 1 }}>
        <Text style={simpleStyles.label}>Phường/Xã *</Text>
        <DropDownPicker
          open={wardOpen}
          value={selectedWard}
          items={wardItems}
          setOpen={setWardOpen}
          setValue={(val) => {
            setSelectedWard(val);
            setWardOpen(false);
          }}
          placeholder="Chọn phường/xã"
          disabled={!selectedDistrict}
          zIndex={1000}
          zIndexInverse={3000}
          listMode="SCROLLVIEW"
          maxHeight={200}
        />


      </View>
      {/* Input số nhà */}
      <Text style={simpleStyles.label}>Số nhà, Tên đường *</Text>
      <TextInput
        style={simpleStyles.input}
        value={formData.streetAddress}
        onChangeText={(value) => handleChange('streetAddress', value)}
        placeholder="Nhập số nhà, tên đường"
        placeholderTextColor="#999"
      />
      {/* Nút */}
      <TouchableOpacity style={simpleStyles.saveButton} onPress={handleSave}>
        <Text style={simpleStyles.saveButtonText}>Thêm địa chỉ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={simpleStyles.cancelButton} onPress={onClose}>
        <Text style={simpleStyles.cancelButtonText}>Hủy</Text>
      </TouchableOpacity>
    </View>
  );
};

const simpleStyles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', borderRadius: 14 },
  header: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  label: { fontSize: 14, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#e3e3e3', borderRadius: 10, padding: 12, marginBottom: 16 },
  saveButton: { backgroundColor: '#1976d2', borderRadius: 10, alignItems: 'center', padding: 14, marginTop: 10 },
  saveButtonText: { color: '#fff', fontWeight: 'bold' },
  cancelButton: { backgroundColor: '#f2f2f2', borderRadius: 10, alignItems: 'center', padding: 14, marginTop: 10 },
  cancelButtonText: { color: '#333' },
});

export default ShippingAddress;
