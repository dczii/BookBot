import { useColorScheme } from "react-native";
import { Colors, FontFamily, Spacing, FontSize, BorderRadius } from "../constants/theme";

export function useTheme() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  return {
    colors,
    fonts: FontFamily,
    spacing: Spacing,
    fontSize: FontSize,
    borderRadius: BorderRadius,
    isDark: colorScheme === "dark",
  };
}
