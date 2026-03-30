import React from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts, PlayfairDisplay_700Bold } from "@expo-google-fonts/playfair-display";
import { DMSans_400Regular, DMSans_600SemiBold } from "@expo-google-fonts/dm-sans";
import RootNavigator from "./src/navigation/RootNavigator";
import { Colors } from "./src/constants/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_700Bold,
    DMSans_400Regular,
    DMSans_600SemiBold,
  });

  if (!fontsLoaded) {
    return <View style={styles.loading} />;
  }

  return (
    <NavigationContainer>
      <RootNavigator />
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: Colors.light.cream,
  },
});
