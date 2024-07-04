import { Breadcrumbs, Anchor, Title } from '@mantine/core';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Table from '@/app/ui/customers/pet-table';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { NotFound } from '@/app/ui/customers/not-found';
import { PETS_CUSTOMER_BREADCRUMB } from '@/app/constants';
import styles from './page.module.css';
import Link from 'next/link';
import { getPetsByCustomerId } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Mis Mascotas',
};
export default async function Page({ params }: { params: { id: string; query?: string; page?: string } }) {
  const id = params.id;
  const query = params?.query || '';
  const currentPage = Number(params?.page) || 1;

  const pets = await getPetsByCustomerId(id);
  const items = PETS_CUSTOMER_BREADCRUMB(id)

    return (
    <main>
      <Breadcrumbs style={{ color: 'black' }}> 
      {items.map((item, index) => (
          <Title
            className={`${styles.breadcrumbs} ${item.active ? styles['breadcrumbs-active'] : ''}`}
            key={index}
          >
            <Link href={item.href}>
              {item.label}
            </Link>
          </Title>
        ))}
      </Breadcrumbs>
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