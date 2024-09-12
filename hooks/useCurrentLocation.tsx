import { useEffect, useState } from "react";
import { Region } from "react-native-maps";
import * as Location from 'expo-location';


export const useCurrentLocation = () => {
    const [region, setCurrentLocation] = useState<Region | null>(null);

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

            setCurrentLocation(region);

        })();
    }, []);

    return region;
}