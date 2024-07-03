import Search from '@/app/ui/search';
import Table from '@/app/ui/customers/table';
import { CreateCustomer } from '@/app/ui/customers/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { getCustomersPages, getFilteredCustomers } from '@/app/lib/data';
import { Metadata } from 'next';
import { Flex, Title } from '@mantine/core';
import PaginationCustomers from '@/app/ui/customers/Pagination';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Usuarios',
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
  const customers = await getFilteredCustomers(query, currentPage, userId);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <Title className={styles.breadcrumbs} order={1}>Clientes</Title>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateCustomer />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table customers={customers} query={query} currentPage={currentPage} />
      </Suspense>
      <Flex justify="center" mt="md">
        <PaginationCustomers totalPages={totalPages} currentPage={currentPage} />
      </Flex>
    </div>
  );
}