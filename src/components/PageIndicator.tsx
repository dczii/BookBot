import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";

type PageIndicatorProps = {
  total: number;
  current: number;
};

export function PageIndicator({ total, current }: PageIndicatorProps) {
  const { colors, borderRadius } = useTheme();

  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === current;
        return (
          <View
            key={index}
            style={[
              styles.dot,
              {
                width: isActive ? 20 : 6,
                height: 6,
                borderRadius: borderRadius.full,
                backgroundColor: isActive ? colors.primary : colors.border,
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  dot: {},
});
