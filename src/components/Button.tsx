import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from "react-native";
import { useTheme } from "../hooks/useTheme";

type ButtonVariant = "primary" | "secondary" | "text";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
};

export function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  fullWidth = true,
  style,
}: ButtonProps) {
  const { colors, fonts, fontSize, borderRadius, spacing } = useTheme();

  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const isText = variant === "text";

  const containerStyle = [
    styles.base,
    isPrimary && { backgroundColor: colors.primary, borderRadius: borderRadius.xl },
    isSecondary && {
      backgroundColor: "transparent",
      borderWidth: 1.5,
      borderColor: colors.primary,
      borderRadius: borderRadius.xl,
    },
    isText && { backgroundColor: "transparent", paddingHorizontal: 0 },
    fullWidth && styles.fullWidth,
    disabled && { opacity: 0.5 },
    style,
  ];

  const textStyle = [
    {
      fontFamily: fonts.bodySemiBold,
      fontSize: fontSize.md,
    },
    isPrimary && { color: colors.white },
    isSecondary && { color: colors.primary },
    isText && { color: colors.primary },
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? colors.white : colors.primary} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  fullWidth: {
    width: "100%",
  },
});
