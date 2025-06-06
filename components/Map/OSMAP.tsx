// components/OSMap.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { UrlTile, Marker } from 'react-native-maps';

const OSMap = () => {
  return (
    <View style={styles.container}>
      <MapView
        
        initialRegion={{
          latitude: 21.0285,
          longitude: 105.8542,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Sử dụng UrlTile để load tile OpenStreetMap */}
        <UrlTile
          urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />

        {/* Marker ví dụ */}
        <Marker
          coordinate={{ latitude: 21.0285, longitude: 105.8542 }}
          title="Hà Nội"
          description="Thủ đô Việt Nam"
        />
      </MapView>
    </View>
  );
};

export default OSMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200, 
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },

});
