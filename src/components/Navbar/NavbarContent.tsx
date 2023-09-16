import type { Props } from '@/libs/types';

import { useNavBarContext } from './context';

interface NavbarContentProps extends Props<HTMLUListElement> {
  justify?: 'start' | 'end';
  className?: string;
}

const NavbarContent: React.FC<NavbarContentProps> = ({
  children,
  justify = 'start',
  className,
  ...props
}) => {
  const { slots } = useNavBarContext();

  return (
    <ul
      className={slots.content({ className })}
      data-justify={justify}
      {...props}
    >
      {children}
    </ul>
  );
};

export default NavbarContent;
