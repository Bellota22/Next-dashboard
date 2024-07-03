import Search from '@/app/ui/search';
import Table from '@/app/ui/ventas/table';
import { CreatePet } from '@/app/ui/ventas/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { getAllCostumers, getAllProducts, getAllSales, getSalesPages } from '@/app/lib/data';
import { Metadata } from 'next';
import PaginationProduct from '@/app/ui/ventas/pagination';
import { Flex } from '@mantine/core';

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
  const userId = '410544b2-4001-4271-9855-fec4b6a6442a';
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  // const totalPages = await fetchInvoicesPages(query);
  const [sales, totalPages] = await Promise.all([
    getAllSales(query, currentPage, userId),
    getSalesPages(query, userId),
  ]);
  
  console.log('sales::: ', sales.length);
  console.log('totalPages::: ', totalPages);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Ventas</h1>
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