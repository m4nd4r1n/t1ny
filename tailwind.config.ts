import { withTV } from 'tailwind-variants/transformer';
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default withTV({
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      scale: {
        '97': '.97',
      },
      transitionDuration: {
        '250': '250ms',
      },
      borderRadius: {
        '1.5xl': '0.875rem',
      },
      minWidth: {
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
      },
      borderWidth: {
        '3': '3px',
      },
      minHeight: {
        'screen-header': 'calc(100dvh - 4rem)',
      },
      transitionProperty: {
        background: 'background',
      },
    },
    colors: {
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      white: colors.white,
      black: colors.black,
      default: {
        50: 'hsl(0 0% 98%)',
        100: 'hsl(240 5% 96%)',
        200: 'hsl(240 6% 90%)',
        300: 'hsl(240 5% 84%)',
        400: 'hsl(240 5% 65%)',
        500: 'hsl(240 4% 46%)',
        600: 'hsl(240 5% 34%)',
        700: 'hsl(240 5% 26%)',
        800: 'hsl(240 4% 16%)',
        900: 'hsl(240 6% 10%)',
        DEFAULT: 'hsl(240 5% 26%)',
      },
      primary: 'hsl(212,100%,47%)',
      secondary: 'hsl(270,59%,58%)',
      danger: 'hsl(339,90%,51%)',
      gray: {
        light: colors.stone[100],
        DEFAULT: colors.stone[500],
        dark: colors.stone[900],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
} satisfies Config);
