// components/DeliveryTrackingMap.tsx
import React, { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  MapView,
  Camera,
  PointAnnotation,
  RasterSource,
  RasterLayer,
  ShapeSource,
  LineLayer,
  CameraRef,
} from "@maplibre/maplibre-react-native";

interface Coordinate {
  lat: number;
  lon: number;
}

interface DeliveryTrackingMapProps {
  shopLat: number;
  shopLng: number;
  customerLocation: Coordinate | null;
  routeCoords: Array<[number, number]>;
  MAPTILER_TILE_URL: string;
}

export default function DeliveryTrackingMap({
  shopLat,
  shopLng,
  customerLocation,
  routeCoords,
  MAPTILER_TILE_URL,
}: DeliveryTrackingMapProps) {
  const cameraRef = useRef<CameraRef>(null);

  const centerCoordinate: [number, number] = [
    (shopLng + (customerLocation?.lon ?? shopLng)) / 2,
    (shopLat + (customerLocation?.lat ?? shopLat)) / 2,
  ];

  return (
    <MapView style={styles.map}>
      <Camera
        ref={cameraRef}
        centerCoordinate={centerCoordinate}
        zoomLevel={13}
      />

      <RasterSource
        id="maptiler-osm"
        tileUrlTemplates={[MAPTILER_TILE_URL]}
        tileSize={256}
      >
        <RasterLayer
          id="osmRasterLayer"
          sourceID="maptiler-osm"
          style={{ rasterOpacity: 1 }}
        />
      </RasterSource>

      <PointAnnotation id="shopMarker" coordinate={[shopLng, shopLat]}>
        <View style={styles.markerShop}>
          <FontAwesome name="home" size={20} color="#fff" />
        </View>
      </PointAnnotation>

      {customerLocation && (
        <PointAnnotation
          id="custMarker"
          coordinate={[customerLocation.lon, customerLocation.lat]}
        >
          <View style={styles.markerCust}>
            <FontAwesome name="user" size={20} color="#fff" />
          </View>
        </PointAnnotation>
      )}

      {routeCoords.length > 0 && (
        <ShapeSource
          id="routeSource"
          shape={{
            type: "Feature",
            geometry: { type: "LineString", coordinates: routeCoords },
            properties: {},
          }}
        >
          <LineLayer
            id="routeLineLayer"
            sourceID="routeSource"
            style={{ lineColor: "#007AFF", lineWidth: 4, lineOpacity: 0.8 }}
          />
        </ShapeSource>
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  markerShop: {
    width: 32,
    height: 32,
    backgroundColor: "#007AFF",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 2,
  },
  markerCust: {
    width: 32,
    height: 32,
    backgroundColor: "#FF3B30",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 2,
  },
});
