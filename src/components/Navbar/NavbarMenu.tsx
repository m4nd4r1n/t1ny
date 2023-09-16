import { createPortal } from 'react-dom';

import type { Props } from '@/libs/types';

import { useNavBarContext } from './context';

const NavbarMenu: React.FC<Props<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  const { isMenuOpen, slots, menuRoot } = useNavBarContext();

  if (!menuRoot) return null;

  return createPortal(
    <div
      className={slots.menu({
        className: isMenuOpen ? 'w-full translate-x-0' : '-translate-x-full',
      })}
      data-open={isMenuOpen}
      {...props}
    >
      {children}
    </div>,
    menuRoot,
  );
};

export default NavbarMenu;
