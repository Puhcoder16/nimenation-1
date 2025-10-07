import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto Mono', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'nime-orange': '#C04000',
        'nime-cream': '#E6BF83',
      },
      backgroundImage: {
        'nime-diagonal': 'linear-gradient(135deg, #C04000 49.9%, #E6BF83 50.1%)',
      }
    },
  },
  plugins: [],
}