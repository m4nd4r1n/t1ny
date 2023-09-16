import type { Props } from '@/libs/types';

import { useNavBarContext } from './context';

const NavbarLogo: React.FC<Props<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  const { slots } = useNavBarContext();

  return (
    <div className={slots.logo()} {...props}>
      {children}
    </div>
  );
};

export default NavbarLogo;
