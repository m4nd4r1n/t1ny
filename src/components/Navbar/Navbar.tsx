import { useState } from 'react';

import type { Props } from '@/libs/types';

import { navbar } from './Navbar.styles';
import { NavbarContext } from './context';

interface NavbarProps extends Props {
  menu?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children, menu, ...props }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const slots = navbar();

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const context = { isMenuOpen, slots, toggleMenu };

  return (
    <NavbarContext.Provider value={context}>
      <nav className={slots.nav()} {...props}>
        <header className={slots.wrapper()}>{children}</header>
      </nav>
      {menu}
    </NavbarContext.Provider>
  );
};

export default Navbar;
