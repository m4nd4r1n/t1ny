import type { Props } from '@/types';
import type { VariantProps } from 'tailwind-variants';

import NextLink from 'next/link';

import { link } from './Link.styles';

type LinkVariants = VariantProps<typeof link>;

interface LinkProps extends Props<HTMLAnchorElement>, LinkVariants {
  href?: string;
  isExternal?: boolean;
  className?: string;
  justify?: 'start' | 'end' | 'center';
}

const Link: React.FC<LinkProps> = ({
  href = '#',
  children,
  isExternal,
  isBlock,
  color,
  size,
  isDisabled,
  isFull,
  className,
  justify,
  ...props
}) => {
  const variants = {
    color,
    isBlock,
    isDisabled,
    isFull,
    size,
    isExternal,
    className,
    justify,
  };

  const relTargetAttributes = isExternal
    ? { rel: 'noopener noreferrer', target: '_blank' }
    : {};

  return (
    <NextLink
      className={link(variants)}
      href={href}
      {...relTargetAttributes}
      {...props}
    >
      {children}
    </NextLink>
  );
};

export default Link;
