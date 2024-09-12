import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Circle, Marker, Region } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import ChangeWidth from '@/components/ChangeWidth';
import { tint } from '@/constants/Colors';
import { calculateDistance } from '@/utils/location';
import { router } from 'expo-router';
import { useParties } from '@/hooks/useParties';
import BottomSheetDistance from '@/components/BottomSheet';



export default function HomeScreen() {
  const [region, setRegion] = useState<Region | null>(null);
  const parties = useParties(region);
  const [width, setWidth] = useState(500);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { coords } = location;
      const region = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

      setRegion(region);

    })();
  }, []);

  const openPartyPage = (id: string) => {
    router.push(`/party/${id}`);
  }


  if (region === null) {
    return null
  }

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        showsMyLocationButton
        showsUserLocation
        initialRegion={region}
      >
        {parties.map((party) => {
          if (calculateDistance(region, party.location) > width / 1000) {
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
          center={{ latitude: region.latitude, longitude: region.longitude }}
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
