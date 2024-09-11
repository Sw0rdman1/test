import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text, View } from './Themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tint } from '@/constants/Colors';
import { useColors } from '@/hooks/useColors';

interface ChangeWidthProps {
    width: number;
    setWidth: (width: number) => void;
}

const ChangeWidth: React.FC<ChangeWidthProps> = ({ width, setWidth }) => {
    const { top } = useSafeAreaInsets();
    const { background, text } = useColors();
    return (
        <View style={[styles.changeWidthContainer, { marginTop: top, shadowColor: text }]}>
            <TouchableOpacity
                onPress={() => setWidth(width - 100)}
                style={[styles.button, { backgroundColor: background, shadowColor: text }]}
            >
                <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.width}>{width}m</Text>
            <TouchableOpacity
                onPress={() => setWidth(width + 100)}
                style={[styles.button, { backgroundColor: background, shadowColor: text }]}
            >
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>

        </View>
    )
}

export default ChangeWidth

const styles = StyleSheet.create({
    changeWidthContainer: {
        gap: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        zIndex: 1,
        borderRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 25,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: tint,
        fontSize: 20,
        fontWeight: 'bold',
    },
    width: {
        width: 80,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',

    }
})