module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nanum Gothic'],
        serif: ['Nanum Gothic'],
        mono: ['Nanum Gothic'],
        display: ['Nanum Gothic'],
        body: ['Nanum Gothic']
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
