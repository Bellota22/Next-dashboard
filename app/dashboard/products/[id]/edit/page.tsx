import Form from '@/app/ui/products/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchPetById, fetchProductById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Product',
};
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    // const customers = await fetchCustomers()
    // const pet = await fetchPetById(id);
    const product = await fetchProductById(id);

    return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/dashboard/products' },
          {
            label: 'Editar Producto',
            href: `/dashboard/products/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form id={id} product={product} />
    </main>
  );
}