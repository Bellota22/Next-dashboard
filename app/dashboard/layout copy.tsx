import SideNav from '@/app/ui/dashboard/sidenav';
import { getAllEmployees } from '../lib/data';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '../ui/skeletons';
import { AppShell, Burger, Group, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default async function Layout({ children }: { children: React.ReactNode }) {

  const employees = await getAllEmployees();
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav employees={employees} />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}