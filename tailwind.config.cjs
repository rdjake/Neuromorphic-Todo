/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        bgBlue : 'var(--bg)',
        bgBodyBlue: 'var(--bg-body)',
        textBlue : 'var(--text)',
        textBlueFaded: 'var(--text-faded)',
        bgBlueSelected: 'var(--bg-selected)',
        bgBlueSelectedHover: 'var(--bg-selected-hover)',
      },
      boxShadow: {
          'neuro8': '3px 3px 6px var(--shadow-dark), -3px -3px 6px var(--shadow-light)',
          'neuro12': '5px 5px 10px var(--shadow-dark), -5px -5px 10px var(--shadow-light)',
          'neuroLogo': '8px 8px 16px var(--shadow-dark), -8px -8px 16px var(--shadow-light)',

          'neuro8Inset': 'inset 3px 3px 6px var(--shadow-dark), inset -3px -3px 6px var(--shadow-light)',
          'neuro12Inset': 'inset 5px 5px 10px var(--shadow-dark), inset -5px -5px 10px var(--shadow-light)',

          'neuro8InsetOff': 'inset 3px 3px 6px var(--shadow-dark-inset), inset -3px -3px 6px var(--shadow-light-inset)'
        },
    },
  },
  plugins: [],
}
