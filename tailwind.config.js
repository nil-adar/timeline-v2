const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Enable dark mode support using a class strategy
  theme: {
    screens: {
      'xs': '320px',  // Extra small devices, usually phones
      'sm': '640px',  // Small devices, like tablets in portrait mode
      'md': '768px',  // Medium devices, like tablets in landscape mode
      'lg': '1024px', // Large devices, such as laptops and desktops
      'xl': '1280px', // Extra large devices, like large monitors
      '2xl': '1536px', // Bigger screens, like wide monitors
      '3xl': '1920px', // Extremely large screens, like 4K TVs
    },
    extend: {
      colors: {
        'custom-blue': '#007bff', // Custom blue color for branding
        'custom-gray': '#f6f6f6', // Custom gray for backgrounds
      },
      animation: {
        aurora: "aurora 60s linear infinite", // Background animation for aurora effect
        shake: 'shake 1s ease-in-out infinite', // Animation for shaking elements
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%", // Start the background in the center
          },
          to: {
            backgroundPosition: "350% 50%", // End the background far to the right
          },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' }, // Start and end in the original position
          '50%': { transform: 'translateX(15px)' }, // Move to the right at the midpoint
        },
      },
    },
  },
  plugins: [
    function addVariablesForColors({ addBase, theme }) {
      let allColors = flattenColorPalette(theme("colors")); // Flatten the color palette to access nested colors
      let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val]) // Create CSS variables for each color
      );

      addBase({
        ":root": newVars, // Set the color variables on the root element
      });
    }
  ],
};
