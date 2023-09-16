import type { Props } from '@/libs/types';

import { useNavBarContext } from './context';

const NavbarMenuItem: React.FC<Props> = ({ children, ...props }) => {
  const { slots } = useNavBarContext();

  return (
    <div className={slots.menuItem()} {...props}>
      {children}
    </div>
  );
};

export default NavbarMenuItem;
