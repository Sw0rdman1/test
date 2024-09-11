import Colors from "@/constants/Colors";
import { useColorScheme } from "react-native";

export const useColors = () => {
    const colorScheme = useColorScheme();
    return Colors[colorScheme ?? 'light']
}
