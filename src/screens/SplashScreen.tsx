import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";
import { Colors, FontFamily, FontSize, Spacing } from "../constants/theme";
import { STORAGE_KEYS } from "../constants/storage";

type SplashNav = NativeStackNavigationProp<RootStackParamList, "Splash">;

export default function SplashScreen() {
  const navigation = useNavigation<SplashNav>();
  const loadingWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate loading bar over 1.2s
    Animated.timing(loadingWidth, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false,
    }).start(async () => {
      // Smart routing after animation
      const hasOnboarded = await AsyncStorage.getItem(STORAGE_KEYS.HAS_ONBOARDED);
      if (hasOnboarded) {
        navigation.replace("Home");
      } else {
        navigation.replace("Onboarding");
      }
    });
  }, []);

  const animatedWidth = loadingWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <LinearGradient
      colors={[Colors.light.cream, Colors.light.latte, Colors.light.toffee]}
      style={styles.container}
    >
      {/* Camera icon placeholder */}
      <View style={styles.iconContainer}>
        <Text style={styles.cameraIcon}>📷</Text>
      </View>

      {/* Wordmark */}
      <Text style={styles.wordmark}>SnapBook</Text>
      <Text style={styles.subtitle}>PRINT YOUR MEMORIES</Text>

      {/* Loading bar */}
      <View style={styles.loadingTrack}>
        <Animated.View
          style={[
            styles.loadingBar,
            { width: animatedWidth, backgroundColor: Colors.light.caramel },
          ]}
        />
      </View>
      <Text style={styles.loadingText}>Loading...</Text>

      {/* Footer */}
      <Text style={styles.footer}>Made in the Philippines 🇵🇭</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "rgba(44, 24, 16, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
  },
  cameraIcon: {
    fontSize: 28,
  },
  wordmark: {
    fontFamily: FontFamily.displayBold,
    fontSize: 28,
    color: Colors.light.caramel,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.xs,
    color: Colors.light.mocha,
    letterSpacing: 4,
    textTransform: "uppercase",
  },
  loadingTrack: {
    width: 80,
    height: 2,
    backgroundColor: "rgba(44, 24, 16, 0.1)",
    borderRadius: 1,
    marginTop: Spacing.xxl,
    overflow: "hidden",
  },
  loadingBar: {
    height: "100%",
    borderRadius: 1,
  },
  loadingText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.light.mocha,
    marginTop: Spacing.sm,
    opacity: 0.6,
  },
  footer: {
    position: "absolute",
    bottom: Spacing.xxl,
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.light.mocha,
    opacity: 0.5,
  },
});
