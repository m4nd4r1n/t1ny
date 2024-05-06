import type { navbar } from './Navbar.styles';

import { createContext, useContext } from 'react';

interface NavbarContext {
  isMenuOpen?: boolean;
  slots: ReturnType<typeof navbar>;
  toggleMenu: () => void;
}

export const NavbarContext = createContext<NavbarContext | undefined>(
  undefined,
);

export const useNavBarContext = () => {
  const context = useContext(NavbarContext);

  if (!context) {
    const error = new Error('You forgot to wrap component within <Navbar />');
    error.name = 'NavBarContextError';
    Error.captureStackTrace(error, useNavBarContext);
    throw error;
  }

  return context;
};
