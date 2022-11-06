/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        bgBlue : '#e3eefc',
        textBlue : '#687a90',
        selectedBg: '#cbdef0',
      },
      boxShadow: {
          'neuro3': '3px 3px 6px #c1cad6, -3px -3px 6px #ffffff',
          'neuro5': '5px 5px 10px #c1cad6, -5px -5px 10px #ffffff',
          'neuro8': '8px 8px 16px #c1cad6, -8px -8px 16px #ffffff',

          'neuro3Inset': 'inset 3px 3px 6px #c1cad6, inset -3px -3px 6px #ffffff',
          'neuro5Inset': 'inset 5px 5px 10px #c1cad6, inset -5px -5px 10px #ffffff',

          'neuro3InsetOff': 'inset 3px 3px 6px #d3ddea, inset -3px -3px 6px #f3ffff'
        },
    },
  },
  plugins: [],
}
