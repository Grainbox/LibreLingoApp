/**
 * LibreLingo Design System
 * Centralized export of all design tokens
 */

export { colors } from "./colors";
export { spacing, dimensions } from "./spacing";
export { typography } from "./typography";

import { colors } from "./colors";
import { spacing, dimensions } from "./spacing";
import { typography } from "./typography";

/**
 * Complete theme object for convenience
 */
export const theme = {
  colors,
  spacing,
  dimensions,
  typography,
};
