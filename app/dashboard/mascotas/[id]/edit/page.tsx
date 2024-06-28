import Form from '@/app/ui/mascotas/edit-form';
import { fetchCustomers, fetchPetById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Breadcrumbs, Anchor } from '@mantine/core';
import { lusitana } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'Edit invoice',
};
export default async function Page({ params }: { 
  params: { 
    id: string;
    query?: string;
    page?: string;
   }
 }) {
    const query = params?.query || '';
    const currentPage = Number(params?.page) || 1;
    const id = params.id;
    const customers = await fetchCustomers(query, currentPage)
    const pet = await fetchPetById(id);
    
    const items = [
      { label: 'Mascotas', href: '/dashboard/mascotas' },
      {
        label: 'Editar cliente',
        href: `/dashboard/mascotas/${id}/edit`,
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
      <Form customers={customers} petId={id} pet={pet} />
    </main>
  );
}