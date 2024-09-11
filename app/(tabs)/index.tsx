import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import MapView, { Callout, Circle, Marker, Region } from 'react-native-maps';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import ChangeWidth from '@/components/ChangeWidth';
import { tint } from '@/constants/Colors';
import { calculateDistance } from '@/utils/location';
import { router } from 'expo-router';

const generateRandomLocationsWithin3km = (center: Region, count: number) => {
  const locations = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.random() * 3000;
    const latitude = center.latitude + radius * Math.cos(angle) / 111000;
    const longitude = center.longitude + radius * Math.sin(angle) / 111000;
    locations.push({ latitude, longitude } as Region);
  }
  return locations;
}




export default function TabOneScreen() {
  const [region, setRegion] = useState<Region | null>(null);
  const [parties, setParties] = useState<Region[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [width, setWidth] = useState(1000);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
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
      const parties = generateRandomLocationsWithin3km(region, 10);
      setParties(parties);

    })();
  }, []);

  const openPartyPage = (index: number) => {
    router.push(`/party/${index}`);
  }


  if (region === null) {
    return null
  }

  return (
    <View style={styles.container}>
      <ChangeWidth width={width} setWidth={setWidth} />
      <MapView
        style={StyleSheet.absoluteFillObject}
        showsMyLocationButton
        showsUserLocation
        initialRegion={region}
      >
        {parties.map((party, index) => {
          if (calculateDistance(region, party) > width / 1000) {
            return null;
          }
          return (
            <Marker
              key={index}
              coordinate={{ latitude: party.latitude, longitude: party.longitude }}
            >
              <Callout>
                <TouchableOpacity onPress={() => openPartyPage(index)}>
                  <Text>Party {index}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },


});
