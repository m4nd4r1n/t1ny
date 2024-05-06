import type { Props } from '@/types';

import { useState } from 'react';

import { NavbarContext } from './context';
import { navbar } from './Navbar.styles';

interface NavbarProps extends Props {
  menu?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children, menu, ...props }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const slots = navbar({ hasMenu: !!menu });

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const context = { isMenuOpen, slots, toggleMenu };

  return (
    <NavbarContext.Provider value={context}>
      <header className={slots.header()} {...props}>
        <nav className={slots.nav()}>{children}</nav>
      </header>
      {menu}
    </NavbarContext.Provider>
  );
};

export default Navbar;
