import { Region } from "react-native-maps";

const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
};

export const calculateDistance = (region1: Region, region2: Region) => {
    const lat1 = region1.latitude;
    const lon1 = region1.longitude;
    const lat2 = region2.latitude;
    const lon2 = region2.longitude;

    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
};

