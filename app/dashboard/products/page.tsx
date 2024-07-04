import Search from '@/app/ui/search';
import Table from '@/app/ui/products/table';
import { CreateProduct } from '@/app/ui/products/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchProductsPages, getAllCostumers, getAllProducts } from '@/app/lib/data';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Flex, Title } from '@mantine/core';
import PaginationProduct from '@/app/ui/products/pagination';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Productos | PettoCare',
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
  const [
    products,
    customers,
    totalPages,
  ] = await Promise.all([
    getAllProducts(query, currentPage, userId),
    getAllCostumers(query, currentPage, userId),
    fetchProductsPages(query, userId),
  ]);


  const cookieStore = cookies();
  const savedSelectedProducts = JSON.parse(cookieStore.get('selectedProducts')?.value || '[]');
  const savedQuantities = JSON.parse(cookieStore.get('quantities')?.value || '{}');

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <Title className={styles.breadcrumbs} order={1}>Products</Title>
        
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search products..." />
        <CreateProduct />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table
          customers={customers}
          products={products}
          query={query}
          currentPage={currentPage}
          savedSelectedProducts={savedSelectedProducts}
          savedQuantities={savedQuantities}
        />
      </Suspense>
      <Flex justify="center" mt="md">
        <PaginationProduct totalPages={totalPages} currentPage={currentPage} />
      </Flex>
    </div>
  );
}