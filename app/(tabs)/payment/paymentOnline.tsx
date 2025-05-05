import React from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, router } from 'expo-router';
export default function OnlinePayment() {
    const { paymentUrl } = useLocalSearchParams<{ paymentUrl: string }>();
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
        if (url.includes('/payment/vn-pay-callback')) {
          const ok = url.includes('vnp_ResponseCode=00');
          if (ok) {
            Alert.alert('Thanh toán thành công!');
            router.replace('/'); 
          } else {
            Alert.alert('Thanh toán thất bại.');
          }
        }
      }}
    />
  );
}
