module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#121212',
          850: '#1E1E1E',
          825: '#252525',
          800: '#2B2B2B',
          750: '#383838',
          700: '#444444',
          600: '#5E5E5E',
          500: '#777777',
          400: '#919191',
          300: '#AAAAAA',
          200: '#c4c4c4',
          100: '#DDDDDD',
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
