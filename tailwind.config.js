module.exports = {
  theme: {
    fontFamily: {
      body: ['Noto Sans', 'sans-serif'],
    },
    spacing: {
      px: '1px',
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '8': '2rem',
      '10': '2.5rem',
      '12': '3rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '32': '8rem',
      '40': '10rem',
      '48': '12rem',
      '56': '14rem',
      '64': '16rem',
      '2/3': '66.666667%',
    },
    padding: theme => theme('spacing'),
    maxWidth: theme => theme('spacing'),
    opacity: {
      '0': '0',
      '25': '0.25',
      '50': '0.5',
      '75': '0.75',
      '90': '0.9',
      '100': '1',
    },
    extend: {}
  },
  variants: {},
  plugins: []
}
