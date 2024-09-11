import { Text } from '@/components/Themed'
import { useParty } from '@/hooks/useParties'
import { useGlobalSearchParams } from 'expo-router'
import { Image, StyleSheet, View } from 'react-native'

const PartyScreen = () => {
    const { partyID } = useGlobalSearchParams()
    const party = useParty(partyID as string)

    if (!party) {
        return null
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: party.image }} style={{ width: 200, height: 200 }} />
            <Text style={styles.name}>{party.name}</Text>
            <Text style={styles.adress}>{party.adress}</Text>
        </View>
    )
}

export default PartyScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    adress: {
        color: 'grey'
    }

})