import React, { useState } from "react";
import {
  View,
  Text,
  TextInput as RNTextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTheme } from "../hooks/useTheme";

type TextInputProps = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  valid?: boolean;
  error?: string;
  rightLabel?: string;
  onRightLabelPress?: () => void;
  keyboardType?: "default" | "email-address" | "numeric";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

export function TextInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  valid,
  error,
  rightLabel,
  onRightLabelPress,
  keyboardType = "default",
  autoCapitalize = "sentences",
}: TextInputProps) {
  const { colors, fonts, fontSize, spacing, borderRadius } = useTheme();
  const [isSecureVisible, setIsSecureVisible] = useState(false);

  const borderColor = error
    ? colors.error
    : valid
      ? colors.success
      : colors.border;

  return (
    <View style={styles.container}>
      {(label || rightLabel) && (
        <View style={styles.labelRow}>
          {label && (
            <Text
              style={[
                styles.label,
                { fontFamily: fonts.bodySemiBold, fontSize: fontSize.sm, color: colors.text },
              ]}
            >
              {label}
            </Text>
          )}
          {rightLabel && (
            <TouchableOpacity onPress={onRightLabelPress}>
              <Text
                style={[
                  styles.rightLabel,
                  { fontFamily: fonts.bodySemiBold, fontSize: fontSize.sm, color: colors.primary },
                ]}
              >
                {rightLabel}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor,
            borderRadius: borderRadius.sm,
            backgroundColor: colors.white,
          },
        ]}
      >
        <RNTextInput
          style={[
            styles.input,
            {
              fontFamily: fonts.body,
              fontSize: fontSize.md,
              color: colors.text,
            },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={secureTextEntry && !isSecureVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {valid && !error && (
          <Text style={[styles.validIcon, { color: colors.success }]}>✓</Text>
        )}
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsSecureVisible(!isSecureVisible)}
            accessibilityLabel={isSecureVisible ? "Hide password" : "Show password"}
          >
            <Text
              style={[
                styles.showToggle,
                { fontFamily: fonts.bodySemiBold, fontSize: fontSize.xs, color: colors.textSecondary },
              ]}
            >
              {isSecureVisible ? "HIDE" : "SHOW"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text
          style={[
            styles.errorText,
            { fontFamily: fonts.body, fontSize: fontSize.xs, color: colors.error },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  label: {},
  rightLabel: {},
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 48,
  },
  input: {
    flex: 1,
    height: 48,
  },
  validIcon: {
    fontSize: 18,
    marginLeft: 8,
  },
  showToggle: {
    marginLeft: 8,
    letterSpacing: 1,
  },
  errorText: {
    marginTop: 4,
  },
});
