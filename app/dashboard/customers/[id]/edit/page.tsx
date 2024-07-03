import Form from '@/app/ui/customers/edit-form';
import { Breadcrumbs, Anchor, Title } from '@mantine/core';
import { fetchCustomerById, getCustomberById } from '@/app/lib/data';
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import { EDIT_CUSTOMER_BREADCRUMB } from '@/app/constants';
import styles from './page.module.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Edit invoice',
};
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const customer = await getCustomberById(id);
    const items = EDIT_CUSTOMER_BREADCRUMB(id)
    return (
    <main>
      
      <Breadcrumbs style={{ color: 'black' }}> 
        {items.map((item, index) => (
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
      <Form customer={customer} />
    </main>
  );
}