module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        dark: {
          black: '#121212',
          gray: '#1E1E1E',
          lightGray: '#282828',
        },
        light: {},
      },
    },
    screens: {
      pc: '980px',
    },
    fill: (theme) => theme('colors'),
    stroke: (theme) => theme('colors'),
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [require('daisyui')],
}
