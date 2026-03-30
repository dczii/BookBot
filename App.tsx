import React from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useFonts } from "expo-font";
import RootNavigator from "./src/navigation/RootNavigator";
import { Colors } from "./src/constants/theme";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function App() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold: require("@expo-google-fonts/playfair-display/700Bold/PlayfairDisplay_700Bold.ttf"),
    DMSans_400Regular: require("@expo-google-fonts/dm-sans/400Regular/DMSans_400Regular.ttf"),
    DMSans_600SemiBold: require("@expo-google-fonts/dm-sans/600SemiBold/DMSans_600SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <View style={styles.loading} />;
  }

  return (
    <ConvexProvider client={convex}>
      <NavigationContainer>
        <RootNavigator />
        <StatusBar style="dark" />
      </NavigationContainer>
    </ConvexProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: Colors.light.cream,
  },
});
