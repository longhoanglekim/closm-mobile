// app/(tabs)/payment/OnlinePayment.tsx
import React from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSearchParams, router } from 'expo-router';

export default function OnlinePayment() {
  const { paymentUrl } = useSearchParams<{ paymentUrl: string }>();

  if (!paymentUrl) {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <WebView
      source={{ uri: paymentUrl }}
      startInLoadingState
      onNavigationStateChange={navState => {
        const url = navState.url;
        // Khi VNPay redirect về callback
        if (url.includes('/payment/vn-pay-callback')) {
          const ok = url.includes('vnp_ResponseCode=00');
          if (ok) {
            Alert.alert('Thanh toán thành công!');
            // router.replace('/(tabs)/payment/Success'); 
          } else {
            Alert.alert('Thanh toán thất bại.');
            // router.replace('/(tabs)/payment/Failed');
          }
        }
      }}
    />
  );
}
