import { useState } from 'react';

import type { Props } from '@/libs/types';

import { navbar } from './Navbar.styles';
import { NavbarContext } from './context';

const Navbar: React.FC<Props> = ({ children, ...props }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuRoot, setMenuRoot] = useState<HTMLDivElement | null>(null);

  const slots = navbar();

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const context = { isMenuOpen, slots, toggleMenu, menuRoot };

  return (
    <NavbarContext.Provider value={context}>
      <nav className={slots.nav()} {...props}>
        <header className={slots.wrapper()}>{children}</header>
      </nav>
      <div ref={(el) => setMenuRoot(el)}></div>
    </NavbarContext.Provider>
  );
};

export default Navbar;
