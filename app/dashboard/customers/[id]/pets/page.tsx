
import Form from '@/app/ui/customers/edit-form';
import { Breadcrumbs, Anchor } from '@mantine/core';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Table from '@/app/ui/customers/pet-table';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { NotFound } from '@/app/ui/customers/not-found';
import { lusitana } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'Edit invoice',
};
export default async function Page({ params }: { params: { id: string; query?: string; page?: string } }) {
  const id = params.id;
  const query = params?.query || '';
  const currentPage = Number(params?.page) || 1;
  const items = [
    { label: 'Clientes', href: '/dashboard/customers' },
    { label: 'Editar cliente', href: `/dashboard/customers/${id}/edit`},
    { label: 'Mascotas', href: `/dashboard/customers/${id}/pets`, active: true },
    
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
      {/* <Suspense fallback={<InvoicesTableSkeleton />}>
        {pets.length > 0 ? (
          <Table pets={pets} query={query} currentPage={currentPage} />
        ) : (
          <NotFound />
          )}
      </Suspense> */}
    </main>
  );
}