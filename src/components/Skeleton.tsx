import { FC, HTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';

export const skeleton = tv({
  base: 'animate-pulse rounded-md bg-default-100',
});

const Skeleton: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return <div className={skeleton({ className })} {...props} />;
};

export { Skeleton };
