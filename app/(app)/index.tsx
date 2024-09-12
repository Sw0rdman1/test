import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { useState } from 'react';
import { tint } from '@/constants/Colors';
import { calculateDistance } from '@/utils/location';
import { router } from 'expo-router';
import { useParties } from '@/hooks/useParties';
import BottomSheetDistance from '@/components/BottomSheet';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import { PartyPreview, PartyPreviewCallout } from '@/components/PartyPreview';



export default function HomeScreen() {
  const currentLocation = useCurrentLocation();
  const parties = useParties(currentLocation);
  const [width, setWidth] = useState(500);




  if (!currentLocation) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={tint} size='large' />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        showsMyLocationButton
        showsUserLocation
        initialRegion={currentLocation}
      >
        {parties.map((party) => {
          if (calculateDistance(currentLocation, party.location) > width / 1000) {
            return null;
          }
          return (
            <Marker
              key={party.id}
              coordinate={{ latitude: party.location.latitude, longitude: party.location.longitude }}
            >
              <PartyPreview party={party} />
              <Callout>
                <PartyPreviewCallout party={party} />
              </Callout>
            </Marker>
          );
        })}
        <Circle
          center={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }}
          radius={width}
          fillColor={`${tint}25`}
          strokeColor={`${tint}90`}
        />
      </MapView>
      <BottomSheetDistance width={width} setWidth={setWidth} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },


});
