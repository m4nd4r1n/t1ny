import { withTV } from 'tailwind-variants/transformer';
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

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
        'screen-header': 'calc(100dvh - 4rem - 1px)',
      },
      height: {
        'screen-header': 'calc(100dvh - 4rem - 1px)',
      },
      maxWidth: {
        nav: 'calc(1280px + 24rem)',
      },
      fontFamily: {
        icon: 'var(--icon-font)',
        suit: ['var(--suit-font)', ...defaultTheme.fontFamily.sans],
      },
      content: {
        logo: "'\\e900'",
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
      content: 'hsl(220,9%,46%)',
      blue: colors.blue['500'],
      cyan: colors.cyan['500'],
      sky: colors.sky['500'],
      indigo: colors.indigo['500'],
      violet: colors.violet['500'],
      purple: colors.purple['500'],
      fuchsia: colors.fuchsia['500'],
      pink: colors.pink['500'],
      rose: colors.rose['500'],
      red: colors.red['500'],
      orange: colors.orange['500'],
      amber: colors.amber['500'],
      yellow: colors.yellow['500'],
      lime: colors.lime['500'],
      green: colors.green['500'],
      teal: colors.teal['500'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
  safelist: [
    {
      pattern:
        /^(bg-(?:primary|secondary|blue|cyan|sky|indigo|violet|purple|fuchsia|pink|rose|red|orange|amber|yellow|lime|green|teal))$/,
    },
    {
      pattern:
        /^(text-(?:primary|secondary|blue|cyan|sky|indigo|violet|purple|fuchsia|pink|rose|red|orange|amber|yellow|lime|green|teal))$/,
    },
    {
      pattern:
        /^(stroke-(?:primary|secondary|blue|cyan|sky|indigo|violet|purple|fuchsia|pink|rose|red|orange|amber|yellow|lime|green|teal))$/,
    },
    {
      pattern:
        /^(fill-(?:primary|secondary|blue|cyan|sky|indigo|violet|purple|fuchsia|pink|rose|red|orange|amber|yellow|lime|green|teal))$/,
    },
  ],
} satisfies Config);
