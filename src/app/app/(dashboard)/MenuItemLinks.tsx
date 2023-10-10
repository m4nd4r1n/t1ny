'use client';

import { usePathname } from 'next/navigation';

import { LuLayoutDashboard, LuLink, LuSettings } from 'react-icons/lu';

import { Link } from '@/components/Link';
import { NavbarMenuItem } from '@/components/Navbar';

const menuItems = [
  {
    href: '/',
    label: 'Dashboard',
    icon: <LuLayoutDashboard className='mr-2 h-5 w-5' />,
  },
  {
    href: '/links',
    label: 'Links',
    icon: <LuLink className='mr-2 h-5 w-5' />,
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: <LuSettings className='mr-2 h-5 w-5' />,
  },
] as const;

const MenuItemLinks = () => {
  const pathname = usePathname();

  return (
    <NavbarMenuItem>
      {menuItems.map(({ href, label, icon }, index) => (
        <Link
          key={`${label}-${index}`}
          href={href}
          isBlock
          isFull
          color={pathname === href ? 'primary' : 'default'}
          justify='start'
        >
          {icon}
          {label}
        </Link>
      ))}
    </NavbarMenuItem>
  );
};

export default MenuItemLinks;