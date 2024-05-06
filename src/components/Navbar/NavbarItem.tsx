import type { Props } from '@/types';

import { useNavBarContext } from './context';

interface NavbarItemProps extends Props<HTMLLIElement> {
  className?: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({
  children,
  className,
  ...props
}) => {
  const { slots } = useNavBarContext();

  return (
    <li className={slots.item({ className })} {...props}>
      {children}
    </li>
  );
};

export default NavbarItem;
