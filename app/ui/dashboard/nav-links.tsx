'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { IconPaw, IconPackage, IconUsersGroup, IconShoppingBag, IconStethoscope, IconCalendar } from '@tabler/icons-react';
import { Text, Title, useMantineTheme } from '@mantine/core';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Ventas', href: '/dashboard/ventas', icon: IconShoppingBag },
  { name: 'Clientes', href: '/dashboard/customers', icon: IconUsersGroup },
  { name: 'Mascotas', href: '/dashboard/mascotas', icon: IconPaw },
  { name: 'Productos', href: '/dashboard/products', icon: IconPackage },
  { name: 'Veterinarios', href: '/dashboard/vets', icon: IconStethoscope },
  { name: 'Citas', href: '/dashboard/appointments', icon: IconCalendar },

];

interface NavLinksProps {
  showText: boolean;
}

export default function NavLinks({ showText: showText }: NavLinksProps) {
  const pathname = usePathname();
  const theme = useMantineTheme();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] items-center gap-2 rounded-md p-3 text-sm font-medium md:p-2 md:px-3',
              { 'justify-start': !showText }
            )}
            style={{
              color: pathname === link.href ? theme.colors.primary[6] : '',
              backgroundColor: pathname === link.href ? theme.colors.primary[1] : 'transparent',
            }}
            onMouseEnter={(e) => {
              if (pathname !== link.href) {
                e.currentTarget.style.backgroundColor = theme.colors.primary[1];
                e.currentTarget.style.color = theme.colors.primary[6];
              }
            }}
            onMouseLeave={(e) => {
              if (pathname !== link.href) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '';
              }
            }}
          >
            <LinkIcon className="w-6" />
            {showText && <Text className="transition-opacity duration-500">{link.name}</Text>}
          </Link>
        );
      })}
    </>
  );
}
