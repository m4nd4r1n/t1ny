import { withTV } from 'tailwind-variants/transformer';
import type { Config } from 'tailwindcss';

export default withTV({
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config);
