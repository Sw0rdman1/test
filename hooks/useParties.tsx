import { useEffect, useState } from "react";
import { Region } from "react-native-maps";

export interface Party {
    id: string;
    name: string;
    image: string;
    adress: string;
    location: Region;
}

const DUMMY_PARTIES: Partial<Party>[] = [
    { id: '1', name: 'Flag and Sparrow', adress: 'Krakjice Marije 12', image: 'https://flagandsparrow.rs/assets/img/flag-and-sparrow-share.jpg' },
    { id: '2', name: 'KST', adress: 'Bulevara Kralja Aleksandra 123', image: 'https://best.rs/wp-content/uploads/2022/09/kst_baner-750x350-1.jpg' },
    { id: '3', name: 'KPTM', adress: 'Niksicka 14', image: 'https://belgrade-beat.com/photos/venues/123/c-1519416455.jpg' },
    { id: '4', name: 'KPTM', adress: 'Kurca Moga 69', image: 'https://kafanapavlekorcagin.rs/assets/images/galerija/oblak/1a.jpg' },
]

const NUMBER_OF_PARTIES = DUMMY_PARTIES.length;

const generateRandomLocationsWithin3km = (center: Region) => {
    const locations = [];
    for (let i = 0; i < NUMBER_OF_PARTIES; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * 3000;
        const latitude = center.latitude + radius * Math.cos(angle) / 111000;
        const longitude = center.longitude + radius * Math.sin(angle) / 111000;
        locations.push({ ...DUMMY_PARTIES[i], location: { latitude, longitude } } as Party);
    }
    return locations;
}

export const useParties = (currentUserLocation: Region | null) => {
    const [parties, setParties] = useState<Party[]>([]);

    useEffect(() => {
        if (!currentUserLocation) return;
        const parties = generateRandomLocationsWithin3km(currentUserLocation);
        setParties(parties);
    }, [currentUserLocation]);

    return parties;
}

export const useParty = (id: string) => {
    const [party, setParty] = useState<Party | null>(null);

    useEffect(() => {
        const party = DUMMY_PARTIES.find(party => party.id === id) as Party;
        setParty(party);
    }, [id]);

    return party;
}