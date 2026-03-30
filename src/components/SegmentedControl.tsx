import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";

type SegmentedControlProps = {
  tabs: string[];
  activeIndex: number;
  onChange: (index: number) => void;
};

export function SegmentedControl({ tabs, activeIndex, onChange }: SegmentedControlProps) {
  const { colors, fonts, fontSize, borderRadius, spacing } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.card, borderRadius: borderRadius.xl },
      ]}
    >
      {tabs.map((tab, index) => {
        const isActive = index === activeIndex;
        return (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              {
                borderRadius: borderRadius.xl,
                backgroundColor: isActive ? colors.primary : "transparent",
              },
            ]}
            onPress={() => onChange(index)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={tab}
          >
            <Text
              style={[
                styles.tabText,
                {
                  fontFamily: fonts.bodySemiBold,
                  fontSize: fontSize.md,
                  color: isActive ? colors.white : colors.textSecondary,
                },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 4,
  },
  tab: {
    flex: 1,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  tabText: {},
});
