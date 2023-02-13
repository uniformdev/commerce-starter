module.exports = {
  content: [
    // app content
    './src/**/*.{ts,tsx}',
    // include packages if not transpiling (required for Storybook)
    '../../packages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'animate-one': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'animate-two': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'animate-three': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'animate-four': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
      animation: {
        one: 'animate-one 1s linear infinite',
        two: 'animate-two 1s linear infinite',
        three: 'animate-three 1s linear infinite',
        four: 'animate-four 1s linear infinite',
      },
      colors: {
        gray: {
          50: 'var(--gray-50)',
          100: 'var(--gray-100)',
        },
        orange: {
          900: 'var(--orange-900)',
        },
        neutral: {
          800: 'var(--neutral-800)',
        },
      },
      fontFamily: {
        acumin: ['"acumin-pro"'],
      },
      maxWidth: {
        'screen-xl': '1136px',
      },
    },
  },
};
