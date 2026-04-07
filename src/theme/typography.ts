/**
 * LibreLingo Typography
 * System fonts for consistency across platforms
 */

export const typography = {
  // Font families (system fonts for React Native)
  family: {
    body: "System",
    mono: "Courier New",
  },

  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 28,
    "4xl": 32,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // Font weights
  weight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  // Text presets (combine font size + weight + line height)
  preset: {
    // Display text
    display: {
      fontSize: 32,
      fontWeight: "700",
      lineHeight: 1.2,
    },

    // Headings
    h1: {
      fontSize: 28,
      fontWeight: "700",
      lineHeight: 1.2,
    },

    h2: {
      fontSize: 24,
      fontWeight: "700",
      lineHeight: 1.3,
    },

    h3: {
      fontSize: 20,
      fontWeight: "600",
      lineHeight: 1.4,
    },

    // Body text
    bodyLg: {
      fontSize: 16,
      fontWeight: "400",
      lineHeight: 1.5,
    },

    body: {
      fontSize: 14,
      fontWeight: "400",
      lineHeight: 1.5,
    },

    bodySm: {
      fontSize: 12,
      fontWeight: "400",
      lineHeight: 1.5,
    },

    // Captions
    caption: {
      fontSize: 12,
      fontWeight: "400",
      lineHeight: 1.4,
    },

    // Labels
    label: {
      fontSize: 12,
      fontWeight: "600",
      lineHeight: 1.4,
    },

    // Button text
    button: {
      fontSize: 16,
      fontWeight: "600",
      lineHeight: 1.5,
    },

    buttonSm: {
      fontSize: 14,
      fontWeight: "600",
      lineHeight: 1.4,
    },
  },
};
