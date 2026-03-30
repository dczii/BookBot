export const Colors = {
  light: {
    // Espresso palette
    espresso: "#2C1810",
    mocha: "#5C3423",
    caramel: "#B5621E",
    toffee: "#D4855A",
    latte: "#F2E8DC",
    cream: "#FAF4EC",
    // Semantic aliases
    primary: "#B5621E",
    background: "#FAF4EC",
    card: "#F2E8DC",
    text: "#2C1810",
    textSecondary: "#5C3423",
    border: "#D4855A",
    error: "#C23B22",
    success: "#4A7C59",
    white: "#FFFFFF",
  },
  dark: {
    // Espresso palette (dark)
    darkRoast: "#0D0806",
    deepBrew: "#160D08",
    roasted: "#2A1710",
    toffee: "#D4855A",
    latte: "#C4A08A",
    steamed: "#F5E6D3",
    // Semantic aliases
    primary: "#D4855A",
    background: "#0D0806",
    card: "#160D08",
    text: "#F5E6D3",
    textSecondary: "#C4A08A",
    border: "#2A1710",
    error: "#E5634D",
    success: "#6DAE7F",
    white: "#FFFFFF",
  },
} as const;

export const FontFamily = {
  displayBold: "PlayfairDisplay_700Bold",
  body: "DMSans_400Regular",
  bodySemiBold: "DMSans_600SemiBold",
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  xxl: 32,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
