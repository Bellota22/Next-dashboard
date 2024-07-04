import Form from '@/app/ui/mascotas/edit-form';
import { fetchCustomers, getFilteredCustomers, getPetById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Breadcrumbs, Anchor, Title } from '@mantine/core';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import { EDIT_PET_BREADCRUMB } from '@/app/constants';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Edit Mascota',
};
export default async function Page({ params }: { 
  params: { 
    id: string;
    query?: string;
    page?: string;
    edit?: string;
   }
 }) {
    const userId = '410544b2-4001-4271-9855-fec4b6a6442a';

    const query = params?.query || '';
    const currentPage = Number(params?.page) || 1;
    const id = params.id;
    // const customers = await fetchCustomers(query, currentPage)

    const [
      pet,
      customers
    ] = await Promise.all([
      getPetById(id),
      getFilteredCustomers(query, currentPage, userId)
    ]);
    const items = EDIT_PET_BREADCRUMB(id)
    

    return (
    <main>
      <Breadcrumbs style={{ color: 'black' }}> 
      {items.map((item, index) => (
          <Title
            className={`${styles.breadcrumbs} ${item.active ? styles['breadcrumbs-active'] : ''}`}
            key={index}>
            <Link href={item.href}>
              {item.label}
            </Link>
          </Title>
        ))}
      </Breadcrumbs>
      <Form customers={customers} pet={pet} query={query} currentPage={currentPage}/>
    </main>
  );
}