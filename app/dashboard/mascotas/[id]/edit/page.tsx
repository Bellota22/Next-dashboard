import Form from '@/app/ui/mascotas/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers, fetchPetById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit invoice',
};
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const customers = await fetchCustomers()
    const pet = await fetchPetById(id);
    

    return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Mascotas', href: '/dashboard/mascotas' },
          {
            label: 'Editar cliente',
            href: `/dashboard/mascotas/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form customers={customers} petId={id} pet={pet} />
    </main>
  );
}