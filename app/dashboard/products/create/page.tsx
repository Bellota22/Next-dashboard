import { lusitana } from '@/app/ui/fonts';
import Form from '@/app/ui/products/create-form';
import { Breadcrumbs, Anchor, Title } from '@mantine/core';
import styles from './page.module.css';
import Link from 'next/link';
import { CREATE_PRODUCTS_BREADCRUMB } from '@/app/constants';

export default async function Page() {

  
  return (
    <main>
      <Breadcrumbs> 
        {CREATE_PRODUCTS_BREADCRUMB.map((item, index) => (
          <Title
            key={index}
            className={`${styles.breadcrumbs} ${item.active ? styles['breadcrumbs-active'] : ''}`}
          >
          <Link href={item.href}>
            {item.label}
          </Link>
          </Title>
        ))}
      </Breadcrumbs>

      <Form /> 
    </main>
  );
}