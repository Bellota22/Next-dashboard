import Search from '@/app/ui/search';
import Table from '@/app/ui/mascotas/table';
import { CreatePet } from '@/app/ui/mascotas/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { getAllFilteredPets, getPetsPages } from '@/app/lib/data';
import { Metadata } from 'next';
import { Button, Flex, Title } from '@mantine/core';
import styles from './page.module.css';
import PaginationPets from '@/app/ui/mascotas/Pagination';
import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mascotas | PettoCare',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getPetsPages(query);
  const pets = await getAllFilteredPets(query, currentPage);
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <Title className={styles.breadcrumbs} order={1}>Mascotas</Title>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar mascota..." />
        <Button
          color="primary.3"
          component={Link}
          rightSection={<PlusIcon className="h-5" />}
          href="/dashboard/mascotas/create"
        >
          <Title order={6}>Crear Mascota</Title>{' '}
        </Button>
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table pets={pets} query={query} currentPage={currentPage} />
      </Suspense>
      <Flex justify="center" mt="md">
        <PaginationPets totalPages={totalPages} currentPage={currentPage} />
      </Flex>
    </div>
  );
}