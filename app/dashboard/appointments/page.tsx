import Search from '@/app/ui/search';
import Table from '@/app/ui/vets/table';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { getCustomersPages, getFilteredVets } from '@/app/lib/data';
import { Metadata } from 'next';
import { Button, Flex, Title } from '@mantine/core';
import PaginationVets from '@/app/ui/vets/Pagination';
import styles from './page.module.css';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Vets',
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
  const totalPages = await getCustomersPages(query, userId);
  const vets = await getFilteredVets(query, currentPage, userId);

  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <Title className={styles.breadcrumbs} order={1}>Citas</Title>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar veterinarios..." />
        <Button
          color="primary.3"
          component={Link}
          rightSection={<PlusIcon className="h-5" />}
          href="/dashboard/vets/create"
        >
          <Title order={6}>Crear Veterinario</Title>{' '}
        </Button>
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table vets={vets} query={query} currentPage={currentPage} />
      </Suspense>
      <Flex justify="center" mt="md">
        <PaginationVets totalPages={totalPages} currentPage={currentPage} />
      </Flex>
    </div>
  );
}