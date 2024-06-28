import Form from '@/app/ui/products/edit-form';
import { Breadcrumbs, Anchor } from '@mantine/core';
import { fetchCustomers, fetchPetById, fetchProductById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'Edit Product',
};
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    // const customers = await fetchCustomers()
    // const pet = await fetchPetById(id);
    const product = await fetchProductById(id);
    const items = [
      { label: 'Products', href: '/dashboard/products' },
      {
        label: 'Editar Producto',
        href: `/dashboard/products/${id}/edit`,
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
      <Form id={id} product={product} />
    </main>
  );
}