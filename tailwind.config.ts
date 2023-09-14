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
    },
    colors: {
      current: colors.current,
      transparent: colors.transparent,
      white: colors.white,
      black: colors.black,
      default: 'hsl(240,5%,26%)',
      primary: 'hsl(212,100%,47%)',
      secondary: 'hsl(270,59%,58%)',
      danger: 'hsl(339,90%,51%)',
    },
  },
  plugins: [],
} satisfies Config);
