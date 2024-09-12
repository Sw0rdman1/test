import React, { useCallback, useRef } from 'react';
import { Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Slider from '@react-native-community/slider';
import { useColors } from '@/hooks/useColors';

interface BottomSheetDistanceProps {
    width: number;
    setWidth: (width: number) => void;
}

const BottomSheetDistance: React.FC<BottomSheetDistanceProps> = ({ width, setWidth }) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const { tint } = useColors();

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <BottomSheet
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
            snapPoints={[75, 200]}
        >
            <BottomSheetView style={styles.contentContainer}>
                <Text style={styles.title}>
                    Select distance to show parties
                </Text>
                <Slider
                    style={{ width: '80%' }}
                    minimumValue={300}
                    maximumValue={3000}
                    step={100}
                    value={width}
                    onValueChange={(value) => setWidth(value)}
                    minimumTrackTintColor={tint}
                    maximumTrackTintColor='lightgray'
                />
                <Text style={styles.widthText}>
                    {width} m
                </Text>
            </BottomSheetView>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    widthText: {
        fontSize: 18,
        marginTop: 10,
    },
});

export default BottomSheetDistance;