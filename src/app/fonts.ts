import localFont from 'next/font/local';

export const iconFont = localFont({
  variable: '--icon-font',
  src: '../../public/fonts/icon.woff2',
  display: 'swap',
});

export const suitVariable = localFont({
  variable: '--suit-font',
  src: '../../public/fonts/SUIT-Variable.woff2',
  display: 'swap',
});
