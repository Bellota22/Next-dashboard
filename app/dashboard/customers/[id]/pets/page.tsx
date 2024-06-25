
import Form from '@/app/ui/customers/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomerPets } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Table from '@/app/ui/customers/pet-table';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import Image from 'next/image';
import { Box, Container, Group, Text } from '@mantine/core';
import { useSpring, animated } from '@react-spring/web'
import { IconDog } from '@tabler/icons-react';
import { Button } from '@/app/ui/button';
import { NotFound } from '@/app/ui/customers/not-found';

export const metadata: Metadata = {
  title: 'Edit invoice',
};
export default async function Page({ params }: { params: { id: string; query?: string; page?: string } }) {
  const id = params.id;
  const query = params?.query || '';
  const currentPage = Number(params?.page) || 1;
  const pets = await fetchCustomerPets(id); 
 
    return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Clientes', href: '/dashboard/customers' },
          { label: 'Editar cliente', href: `/dashboard/customers/${id}/edit`},
          { label: 'Mascotas', href: `/dashboard/customers/${id}/pets`, active: true },
          
        ]}
      />
      <Suspense fallback={<InvoicesTableSkeleton />}>
        {pets.length > 0 ? (
          <Table pets={pets} query={query} currentPage={currentPage} />
        ) : (
          <NotFound />
          )}
      </Suspense>
    </main>
  );
}