import NextLink from 'next/link';

import type { VariantProps } from 'tailwind-variants';

import type { Props } from '@/libs/types';

import { link } from './Link.styles';

type LinkVariants = VariantProps<typeof link>;

interface LinkProps extends Props<HTMLAnchorElement>, LinkVariants {
  href?: string;
  isExternal?: boolean;
  className?: string;
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
