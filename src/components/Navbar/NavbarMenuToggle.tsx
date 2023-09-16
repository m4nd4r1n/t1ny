import type { PropsWithoutChildren } from '@/libs/types';

import { useNavBarContext } from './context';

const NavbarMenuToggle: React.FC<PropsWithoutChildren> = ({ ...props }) => {
  const { isMenuOpen, slots, toggleMenu } = useNavBarContext();

  const srOnlyText = isMenuOpen ? 'Close menu' : 'Open menu';

  return (
    <button
      className={slots.toggle()}
      onClick={toggleMenu}
      data-open={isMenuOpen}
      {...props}
    >
      <span className={slots.srOnly()}>{srOnlyText}</span>
      <span className={slots.toggleIcon()} aria-hidden />
    </button>
  );
};

export default NavbarMenuToggle;
