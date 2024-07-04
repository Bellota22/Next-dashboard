import Search from '@/app/ui/search';
import Table from '@/app/ui/mascotas/table';
import { CreatePet } from '@/app/ui/mascotas/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { getAllFilteredPets, getPetsPages } from '@/app/lib/data';
import { Metadata } from 'next';
import { Flex, Title } from '@mantine/core';
import styles from './page.module.css';
import PaginationPets from '@/app/ui/mascotas/Pagination';

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
  const userId = '410544b2-4001-4271-9855-fec4b6a6442a';

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getPetsPages(query, userId);
  const pets = await getAllFilteredPets(query, currentPage, userId);
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <Title className={styles.breadcrumbs} order={1}>Mascotas</Title>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar por nombre" />
        <CreatePet />
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