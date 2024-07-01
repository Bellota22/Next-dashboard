import Form from '@/app/ui/customers/create-form';
import { lusitana } from '@/app/ui/fonts';
import { Breadcrumbs, Anchor } from '@mantine/core';
import { Suspense } from 'react';
 
export default async function Page() {
 
  const items = [
    { label: 'Clientes', href: '/dashboard/customers' },
    {
      label: 'Crear cliente',
      href: '/dashboard/customers/create',
      active: true,
    },
  ].map((item, index) => (
    <Anchor className={`${lusitana.className}`}  href={item.href} key={index}>
      {item.label}
    </Anchor>
  ));

  return (
    <main>
      <Breadcrumbs style={{ color: 'black' }}> 
        {items}
      </Breadcrumbs>
      <Suspense fallback="Loading...">
      <Form />
      </Suspense>
    </main>
  );
}