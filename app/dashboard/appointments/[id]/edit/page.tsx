import { Breadcrumbs, Title } from '@mantine/core';
import { getVetById, getVetSchedule } from '@/app/lib/data';
import { Metadata } from 'next';
import { EDIT_VETS_BREADCRUMB } from '@/app/constants';
import styles from './page.module.css';
import Link from 'next/link';
import { Suspense } from 'react';
import Form from '@/app/ui/vets/edit-form';

export const metadata: Metadata = {
  title: 'Edit Vet',
};
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    // const customer = await getCustomerById(id);
    const items = EDIT_VETS_BREADCRUMB(id)

    const vetSchedule = await getVetSchedule(id);
    const vet = await getVetById(id);

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
      <Suspense fallback="Loading...">
        <Form vet={vet} vetSchedule={vetSchedule} />
      </Suspense>
    </main>
  );
}