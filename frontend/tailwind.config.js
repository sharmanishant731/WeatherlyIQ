/**
 * Tailwind CSS configuration file.
 * Configures dark mode, content paths, theme extensions including colors, fonts, shadows,
 * background gradients, transitions, keyframes, and animations.
 */
module.exports = {
  // Enable class-based dark mode
  darkMode: 'class',
  // Paths to all template files
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      // Custom color palette inspired by modern UI weather apps
      colors: {
        primaryGradientStart: '#4A90E2', // Soft Blue
        primaryGradientEnd: '#50E3C2', // Aqua Green
        primaryGradientDarkStart: '#0D1B2A', // Darker Navy Blue
        primaryGradientDarkMid: '#1B2A47', // Medium Navy Blue
        primaryGradientDarkEnd: '#274060', // Lighter Navy Blue
        secondaryGradientStart: '#F5A623', // Warm Orange
        secondaryGradientEnd: '#F8E71C', // Bright Yellow
        backgroundLightStart: '#E0F7FA', // Light Cyan
        backgroundLightEnd: '#B2EBF2', // Cyan
        backgroundDarkStart: '#0D1B2A', // Darker Navy Blue
        backgroundDarkMid: '#1B2A47', // Medium Navy Blue
        backgroundDarkEnd: '#274060', // Lighter Navy Blue
        textLight: '#2C3E50', // Dark Slate Blue
        textDark: '#ECF0F1', // Light Gray
        shadowLight: 'rgba(74, 144, 226, 0.5)', // Soft Blue with opacity
        shadowDark: 'rgba(44, 62, 80, 0.7)', // Dark Blue Gray with opacity
      },
      // Custom fonts
      fontFamily: {
        sans: ['"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['"Poppins"', 'sans-serif'],
      },
      // Custom box shadows
      boxShadow: {
        'custom-lg-light': '0 10px 15px -3px rgba(74, 144, 226, 0.5), 0 4px 6px -2px rgba(74, 144, 226, 0.3)',
        'custom-lg-dark': '0 10px 15px -3px rgba(44, 62, 80, 0.7), 0 4px 6px -2 rgba(44, 62, 80, 0.5)',
      },
      // Custom background gradients
      backgroundImage: {
        'primary-gradient': 'linear-gradient(90deg, #4A90E2 0%, #3B9AD9 25%, #2AC9B7 50%, #50E3C2 100%)',
        'secondary-gradient': 'linear-gradient(90deg, #F5A623 0%, #F7B93E 25%, #F7D94A 50%, #F8E71C 100%)',
        'dark-gradient': 'linear-gradient(90deg, #0D1B2A 0%, #1B2A47 33%, #274060 66%, #0F1C2B 100%)',
      },
      // Custom transition properties
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      // Custom keyframes for background pan animation
      keyframes: {
        'background-pan': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
      },
      // Custom animation using the background-pan keyframes
      animation: {
        'background-pan': 'background-pan 60s ease infinite',
      },
    },
  },
  plugins: [],
}
