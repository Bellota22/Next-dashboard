import Form from '@/app/ui/customers/edit-form';
import { Breadcrumbs, Anchor } from '@mantine/core';
import { fetchCustomerById } from '@/app/lib/data';
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'Edit invoice',
};
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const customer = await fetchCustomerById(id);
    const items = [
      { label: 'Clientes', href: '/dashboard/customers' },
      { label: 'Editar cliente', href: `/dashboard/customers/${id}/edit`, active: true },
      { label: 'Mascotas', href: `/dashboard/customers/${id}/pets` },
      
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
      <Form customerId={id} customer={customer} />
    </main>
  );
}