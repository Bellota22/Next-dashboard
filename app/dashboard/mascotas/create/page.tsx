import Form from '@/app/ui/mascotas/create-form';
import { Breadcrumbs, Anchor } from '@mantine/core';
import { fetchCustomers } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
})  {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const customers = await fetchCustomers(query, currentPage);
  const items = [
    { label: 'Mascotas', href: '/dashboard/mascotas' },
    {
      label: 'Crear Mascotas',
      href: '/dashboard/mascotas/create',
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
      <Form customers={customers} /> 
    </main>
  );
}