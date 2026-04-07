/**
 * LibreLingo Spacing Scale
 * Based on 8px grid system for consistency
 */

export const spacing = {
  // Base scale (8px multiples)
  xs: 4,      // 4px
  sm: 8,      // 8px
  md: 12,     // 12px
  lg: 16,     // 16px
  xl: 24,     // 24px
  "2xl": 32,  // 32px
  "3xl": 40,  // 40px
  "4xl": 48,  // 48px
  "5xl": 64,  // 64px

  // Semantic shortcuts
  gutter: 16,           // Standard horizontal padding
  section: 24,          // Space between sections
  componentGap: 12,     // Space between components
  borderRadius: 8,      // Default border radius
  borderRadiusLg: 12,   // Large border radius
  borderRadiusXl: 16,   // Extra large border radius

  // Safe area offsets (mobile)
  safeTop: 16,
  safeBottom: 16,
};

/**
 * Dimensions for common UI elements
 */
export const dimensions = {
  // Button sizes
  buttonHeight: {
    sm: 32,
    md: 44,
    lg: 56,
  },

  // Tab bar height
  tabBarHeight: 64,

  // Card heights
  cardHeight: {
    sm: 80,
    md: 120,
    lg: 160,
  },

  // Icon sizes
  iconSize: {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  },

  // Avatar
  avatarSize: {
    sm: 32,
    md: 48,
    lg: 64,
  },
};
