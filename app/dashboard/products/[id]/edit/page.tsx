import Form from '@/app/ui/products/edit-form';
import { Breadcrumbs, Anchor, Title } from '@mantine/core';
import { fetchCustomers, getProductById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import styles from './page.module.css';
import { EDIT_PRODUCTS_BREADCRUMB } from '@/app/constants';

export const metadata: Metadata = {
  title: 'Edit Product',
};
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    // const customers = await fetchCustomers()
    // const pet = await fetchPetById(id);
    const product = await getProductById(id);
    const items = EDIT_PRODUCTS_BREADCRUMB(id)

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
      <Form product={product} />
    </main>
  );
}