import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { updateFirstname } from '../../../redux/reducers/User'; 

export default function LoginScreen() {
  const [inputName, setInputName] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = () => {
    dispatch(updateFirstname({ firstname: inputName }));

    router.replace('/(tabs)/profile');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Đăng nhập</Text>
      <TextInput
        style={{ borderWidth: 1, marginVertical: 10, width: 200 }}
        placeholder="Nhập tên"
        value={inputName}
        onChangeText={setInputName}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

