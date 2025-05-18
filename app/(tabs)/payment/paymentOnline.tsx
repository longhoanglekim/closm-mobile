import React, { useEffect } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams, router } from 'expo-router';
import { updateOrderPaymentStatus } from '@/api/payment/paymentAPI';

export default function OnlinePayment() {
  const { paymentUrl } = useLocalSearchParams<{ paymentUrl: string }>();

  // ✅ Log paymentUrl khi component render
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

  function extractOrderIdFromUrl(url: string): string {
    const params = new URL(url).searchParams;
    return params.get("orderId") || "";
  }

  return (
    <WebView
      source={{ uri: paymentUrl }}
      startInLoadingState
      onNavigationStateChange={async (navState) => {
        const url = navState.url;
        console.log("🌐 NAVIGATED TO:", url); // ✅ Thêm log theo dõi URL

        if (url.includes('/payment/vn-pay-callback')) {
          const ok = url.includes('vnp_ResponseCode=00');
          if (ok) {
            const orderId = extractOrderIdFromUrl(url);
            try {
              await updateOrderPaymentStatus(orderId, "PAID");
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
