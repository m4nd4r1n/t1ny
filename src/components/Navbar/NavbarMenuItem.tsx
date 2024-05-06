import type { Props } from '@/types';

import { useNavBarContext } from './context';

interface NavbarMenuContentProps extends Props<HTMLDivElement> {
  justify?: 'start' | 'end';
  className?: string;
}

const NavbarMenuItem: React.FC<NavbarMenuContentProps> = ({
  children,
  justify = 'start',
  className,
  ...props
}) => {
  const { slots } = useNavBarContext();

  return (
    <div
      className={slots.menuItem({ className })}
      data-justify={justify}
      {...props}
    >
      {children}
    </div>
  );
};

export default NavbarMenuItem;
