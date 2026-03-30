import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";

type SocialButtonProps = {
  provider: "google" | "facebook";
  onPress: () => void;
};

const PROVIDER_CONFIG = {
  google: { label: "Google", icon: "G", bgColor: "transparent", textColor: "#2C1810" },
  facebook: { label: "Facebook", icon: "f", bgColor: "#B5621E", textColor: "#FFFFFF" },
} as const;

export function SocialButton({ provider, onPress }: SocialButtonProps) {
  const { colors, fonts, fontSize, borderRadius } = useTheme();
  const config = PROVIDER_CONFIG[provider];

  const isGoogle = provider === "google";

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderRadius: borderRadius.xl,
          backgroundColor: isGoogle ? "transparent" : config.bgColor,
          borderWidth: isGoogle ? 1 : 0,
          borderColor: colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`Continue with ${config.label}`}
    >
      <View style={styles.iconContainer}>
        <Text style={[styles.icon, { color: isGoogle ? "#DB4437" : "#FFFFFF" }]}>
          {config.icon}
        </Text>
      </View>
      <Text
        style={[
          styles.label,
          {
            fontFamily: fonts.bodySemiBold,
            fontSize: fontSize.md,
            color: config.textColor,
          },
        ]}
      >
        {config.label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    paddingHorizontal: 24,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  icon: {
    fontSize: 18,
    fontWeight: "700",
  },
  label: {},
});
