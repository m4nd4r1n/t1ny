import type { Props } from '@/types';

import { useNavBarContext } from './context';

const NavbarMenu: React.FC<Props<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  const { isMenuOpen, slots } = useNavBarContext();

  return (
    <div
      className={slots.menu({
        className: isMenuOpen ? 'w-full translate-x-0' : '-translate-x-full',
      })}
      data-open={isMenuOpen}
      {...props}
    >
      {children}
    </div>
  );
};

export default NavbarMenu;
