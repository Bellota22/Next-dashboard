import Search from '@/app/ui/search';
import Table from '@/app/ui/ventas/table';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { getAllSales, getSalesPages } from '@/app/lib/data';
import { Metadata } from 'next';
import PaginationProduct from '@/app/ui/ventas/pagination';
import { Flex, Title } from '@mantine/core';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Ventas | PettoCare',
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
  // const totalPages = await fetchInvoicesPages(query);
  const [sales, totalPages] = await Promise.all([
    getAllSales(query, currentPage),
    getSalesPages(query),
  ]);

  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <Title className={styles.breadcrumbs} order={1}>Ventas</Title>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar por nombre" />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table sales={sales} query={query} currentPage={currentPage}/>
      </Suspense>
      <Flex justify="center" mt="md">
        <PaginationProduct totalPages={totalPages} currentPage={currentPage} />
      </Flex>
    </div>
  );
}