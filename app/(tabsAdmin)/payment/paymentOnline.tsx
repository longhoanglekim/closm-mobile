import React, { useEffect } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, router } from 'expo-router';
import { updateOrderPaymentStatus } from '@/api/payment/paymentAPI';
import { useSelector } from 'react-redux';

export default function OnlinePayment() {
  const token = useSelector((state: any) => state.user.token);

  const { paymentUrl } = useLocalSearchParams<{ paymentUrl: string }>();

  useEffect(() => {
    console.log("📦 paymentUrl:", paymentUrl);
  }, [paymentUrl]);

  if (!paymentUrl) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  function extractOrderIdFromUrl(url: string): string | null {
  const params = new URL(url).searchParams;
  return params.get("vnp_TxnRef"); 
}


  return (
    <WebView
      source={{ uri: paymentUrl }}
      startInLoadingState
      onNavigationStateChange={async (navState) => {
        const url = navState.url;
        console.log("🌐 NAVIGATED TO:", url);

        if (url.includes('/payment/vn-pay-callback')) {
          const ok = url.includes('vnp_ResponseCode=00');
          const orderId = extractOrderIdFromUrl(url);

          if (!orderId) {
            Alert.alert("Không tìm thấy mã đơn hàng trong callback.");
            return;
          }

          if (ok) {
            try {
              await updateOrderPaymentStatus(orderId.toString(), "PAID", token);
              Alert.alert('Thanh toán thành công!');
              router.replace('/');
            } catch (err) {
              Alert.alert('Lỗi cập nhật trạng thái đơn hàng:', (err as Error).message);
            }
          } else {
            Alert.alert('Thanh toán thất bại.');
          }
        }
      }}
      onError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.warn("❌ WebView error: ", nativeEvent);
        Alert.alert("Lỗi khi tải trang thanh toán.");
      }}
    />
  );
}
