import { useGlobalSearchParams } from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

const PartyScreen = () => {
    const { partyID } = useGlobalSearchParams()

    return (
        <View style={styles.container}>
            <Text>{partyID}</Text>
        </View>
    )
}

export default PartyScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})