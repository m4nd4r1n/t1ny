import { styled } from '@/styled-system/jsx';

export const Button = styled('button', {
  base: {
    display: 'inline-block',
    cursor: 'pointer',
    borderRadius: '3em',
    borderWidth: '0px',
    fontFamily: 'sans',
    fontWeight: 'bold',
    lineHeight: '1',
  },
  variants: {
    primary: {
      true: {
        backgroundColor: '#1ea7fd',
        color: 'white',
      },
      false: {
        backgroundColor: 'transparent',
        color: '#333',
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset',
      },
    },
    size: {
      small: {
        fontSize: '12px',
        px: '4',
        py: '2.5',
      },
      medium: {
        fontSize: '14px',
        px: '5',
        py: '2.5',
      },
      large: {
        fontSize: '16px',
        px: '6',
        py: '3',
      },
    },
  },
});
