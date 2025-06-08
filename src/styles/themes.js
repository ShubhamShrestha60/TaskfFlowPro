const commonTokens = {
  // Font families
  fontPrimary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontSecondary: "'Plus Jakarta Sans', sans-serif",

  // Font sizes
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },

  // Font weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },

  // Border radius
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },

  // Shadows
  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  // Transitions
  transition: {
    fast: 'all 0.2s ease',
    base: 'all 0.3s ease',
    slow: 'all 0.5s ease',
  },

  // Z-index
  zIndex: {
    hide: -1,
    base: 0,
    raised: 1,
    dropdown: 1000,
    sticky: 1100,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
  },
};

// Mixins for common styles
const mixins = {
  glassmorphism: (theme) => `
    background: ${theme.glassBackground};
    backdrop-filter: ${theme.glassBackdropFilter};
    border: ${theme.glassBorder};
  `,
  
  flexCenter: `
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  flexBetween: `
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

  textEllipsis: `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,

  scrollbar: (theme) => `
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: ${theme.borderColor}20;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${theme.borderColor};
      border-radius: 3px;
      
      &:hover {
        background: ${theme.borderColorStrong};
      }
    }
  `,
};

export const lightTheme = {
  ...commonTokens,
  
  // Core colors
  primary: '#3B82F6', // Blue
  secondary: '#6366F1', // Indigo
  success: '#10B981', // Emerald
  warning: '#F59E0B', // Amber
  error: '#EF4444', // Red
  info: '#3B82F6', // Blue

  // Text colors
  text: '#1F2937', // Gray 800
  textSecondary: '#6B7280', // Gray 500
  textTertiary: '#9CA3AF', // Gray 400
  textInverse: '#FFFFFF',

  // Background colors
  bg: '#F9FAFB', // Gray 50
  bgSecondary: '#F3F4F6', // Gray 100
  cardBg: '#FFFFFF',
  
  // Border colors
  borderColor: '#E5E7EB', // Gray 200
  borderColorStrong: '#D1D5DB', // Gray 300

  // Status colors with opacity variants
  primary10: '#3B82F610',
  primary20: '#3B82F620',
  success10: '#10B98110',
  success20: '#10B98120',
  warning10: '#F59E0B10',
  warning20: '#F59E0B20',
  error10: '#EF444410',
  error20: '#EF444420',

  // Shadows with colors
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  shadowColorStrong: 'rgba(0, 0, 0, 0.2)',

  // Glass effect
  glassBackground: 'rgba(255, 255, 255, 0.8)',
  glassBackgroundStrong: 'rgba(255, 255, 255, 0.9)',
  glassBorder: '1px solid rgba(255, 255, 255, 0.3)',
  glassBackdropFilter: 'blur(8px)',

  // Add mixins to the theme object
  mixins,
};

export const darkTheme = {
  ...commonTokens,

  // Core colors (slightly desaturated for dark mode)
  primary: '#60A5FA', // Blue 400
  secondary: '#818CF8', // Indigo 400
  success: '#34D399', // Emerald 400
  warning: '#FBBF24', // Amber 400
  error: '#F87171', // Red 400
  info: '#60A5FA', // Blue 400

  // Text colors
  text: '#F9FAFB', // Gray 50
  textSecondary: '#D1D5DB', // Gray 300
  textTertiary: '#9CA3AF', // Gray 400
  textInverse: '#1F2937', // Gray 800

  // Background colors
  bg: '#111827', // Gray 900
  bgSecondary: '#1F2937', // Gray 800
  cardBg: '#1F2937', // Gray 800

  // Border colors
  borderColor: '#374151', // Gray 700
  borderColorStrong: '#4B5563', // Gray 600

  // Status colors with opacity variants
  primary10: '#60A5FA10',
  primary20: '#60A5FA20',
  success10: '#34D39910',
  success20: '#34D39920',
  warning10: '#FBBF2410',
  warning20: '#FBBF2420',
  error10: '#F8717110',
  error20: '#F8717120',

  // Shadows with colors
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  shadowColorStrong: 'rgba(0, 0, 0, 0.4)',

  // Glass effect
  glassBackground: 'rgba(31, 41, 55, 0.8)', // Based on Gray 800
  glassBackgroundStrong: 'rgba(31, 41, 55, 0.9)',
  glassBorder: '1px solid rgba(255, 255, 255, 0.1)',
  glassBackdropFilter: 'blur(8px)',

  // Add mixins to the theme object
  mixins,
};

// Export mixins separately for direct use if needed
export { mixins };