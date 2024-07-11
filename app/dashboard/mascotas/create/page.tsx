import Form from '@/app/ui/mascotas/create-form';
import { Breadcrumbs, Anchor, Title } from '@mantine/core';
import {  getFilteredCustomers } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import { CREATE_PET_BREADCRUMB } from '@/app/constants';
import styles from './page.module.css';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
})  {
   
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const customers = await getFilteredCustomers(query, currentPage);
  
  return (
    <main>
      <Breadcrumbs> 
      {CREATE_PET_BREADCRUMB.map((item, index) => (
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
      <Form query={query} currentPage={currentPage} customers={customers} /> 
    </main>
  );
}