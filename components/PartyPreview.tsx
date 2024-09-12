import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Party } from '@/hooks/useParties'
import { Callout, Marker } from 'react-native-maps'

const { width } = Dimensions.get('window')

interface PartyPreviewProps {
    party: Party
    isDisplayed?: boolean
}

const PartyPreviewMarker: React.FC<PartyPreviewProps> = ({ party }) => {
    return (
        <Image style={styles.partyPreviewImage} source={{ uri: party.image }} />
    )
}

const PartyPreviewCallout: React.FC<PartyPreviewProps> = ({ party }) => {

    return (
        <View
            style={styles.partyPreviewContainer}
        >
            <Image
                style={styles.partyPreviewImageCallout}
                source={{ uri: party.image }}
            />
            <View style={styles.partyPreviewTextContainer}>
                <Text style={styles.partyPreviewName}>{party.name}</Text>
                <Text style={styles.partyPreviewAdress}>{party.adress}</Text>
            </View>
        </View>
    )
}

const PartyPreview: React.FC<PartyPreviewProps> = ({ party, isDisplayed }) => {
    if (!isDisplayed) return null;

    const openPartyPage = (id: string) => {
        router.push(`/party/${id}`);
    }
    return (
        <Marker
            coordinate={{ latitude: party.location.latitude, longitude: party.location.longitude }}
        >
            <PartyPreviewMarker party={party} />
            <Callout onPress={() => openPartyPage(party.id)}>
                <PartyPreviewCallout party={party} />
            </Callout>
        </Marker>
    )
}

export default PartyPreview

const styles = StyleSheet.create({
    partyPreviewImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    partyPreviewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    partyPreviewImageCallout: {
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
})