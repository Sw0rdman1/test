import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Party } from '@/hooks/useParties'

interface PartyPreviewProps {
    party: Party
}

const PartyPreview: React.FC<PartyPreviewProps> = ({ party }) => {
    return (
        <Image style={styles.partyPreviewImage} source={{ uri: party.image }} />
    )
}

const PartyPreviewCallout: React.FC<PartyPreviewProps> = ({ party }) => {
    const openPartyPage = (id: string) => {
        router.push(`/party/${id}`);
    }
    return (
        <TouchableOpacity
            style={styles.partyPreviewContainer}
            onPress={() => openPartyPage(party.id)}
        >
            <Image
                style={styles.partyPreviewImageCallout}
                source={{ uri: party.image }}
            />
            <View style={styles.partyPreviewTextContainer}>
                <Text style={styles.partyPreviewName}>{party.name}</Text>
                <Text style={styles.partyPreviewAdress}>{party.adress}</Text>
            </View>
        </TouchableOpacity>
    )
}

export { PartyPreview, PartyPreviewCallout }

const styles = StyleSheet.create({
    partyPreviewImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    partyPreviewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
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