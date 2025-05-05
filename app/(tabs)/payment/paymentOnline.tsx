import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSearchParams } from 'expo-router';

export default function OnlinePayment() {
  const { paymentUrl } = useSearchParams<{ paymentUrl: string }>();

  if (!paymentUrl) {
    return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator/></View>;
  }

  return (
    <WebView
      source={{ uri: paymentUrl }}
      startInLoadingState
      onNavigationStateChange={navState => {
        // nếu detect callback success/cancel thì router.replace('/payment/success')…
      }}
    />
  );
}
