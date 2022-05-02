module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      fontFamily: {
        OpenSans: ['Open Sans', 'sans-serif'],
        Bodoni: ['Libre Bodoni', 'serif']
      },
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
