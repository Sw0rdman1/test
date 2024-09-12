import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import { useState } from 'react';
import { tint } from '@/constants/Colors';
import { calculateDistance } from '@/utils/location';
import { router } from 'expo-router';
import { useParties } from '@/hooks/useParties';
import BottomSheetDistance from '@/components/BottomSheet';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';



export default function HomeScreen() {
  const currentLocation = useCurrentLocation();
  const parties = useParties(currentLocation);
  const [width, setWidth] = useState(500);


  const openPartyPage = (id: string) => {
    router.push(`/party/${id}`);
  }

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
              image={require('../../assets/images/mirror-ball.png')}
              key={party.id}
              coordinate={{ latitude: party.location.latitude, longitude: party.location.longitude }}
            >
              <Callout >
                <TouchableOpacity
                  style={styles.partyPreviewContainer}
                  onPress={() => openPartyPage(party.id)}
                >
                  <Image
                    style={styles.partyPreviewImage}
                    source={{ uri: party.image }}
                  />
                  <View style={styles.partyPreviewTextContainer}>
                    <Text style={styles.partyPreviewName}>{party.name}</Text>
                    <Text style={styles.partyPreviewAdress}>{party.adress}</Text>
                  </View>
                </TouchableOpacity>
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

  partyPreviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  partyPreviewImage: {
    width: 50,
    height: 50,
  },
  partyPreviewTextContainer: {
    marginLeft: 10,
  },
  partyPreviewName: {
    fontWeight: 'bold',
  },
  partyPreviewAdress: {
    color: 'grey',
  },

});
