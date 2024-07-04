import Form from '@/app/ui/customers/create-form';
import { lusitana } from '@/app/ui/fonts';
import { Breadcrumbs, Anchor, Title } from '@mantine/core';
import Link from 'next/link';
import { Suspense } from 'react';
import styles from './page.module.css';
import { CREATE_CUSTOMER_BREADCRUMB } from '@/app/constants';
export default async function Page() {

  return (
    <main>
      <Breadcrumbs> 
        {CREATE_CUSTOMER_BREADCRUMB.map((item, index) => (
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
      <Suspense fallback="Loading...">
        <Form />
      </Suspense>
    </main>
  );
}