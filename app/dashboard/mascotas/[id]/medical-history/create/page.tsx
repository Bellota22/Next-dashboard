import Form from '@/app/ui/mascotas/medical-history-form';
import { getFilteredCustomers, getPetById, getMedicalHistoriesByPetId } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Breadcrumbs, Anchor, Title } from '@mantine/core';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import { MEDICAL_HISTORY_PET_BREADCRUMB } from '@/app/constants';
import styles from './page.module.css';
import { NotFound } from '@/app/ui/mascotas/not-found';

export const metadata: Metadata = {
  title: 'Medical History Pet',
};
export default async function Page({ params }: { 
  params: { 
    id: string;
    query?: string;
    page?: string;
   }
 }) {
     

    const query = params?.query || '';
    const currentPage = Number(params?.page) || 1;
    const id = params.id;

    const [
      pet,
      customers,
      medicalHistories
    ] = await Promise.all([
      getPetById(id),
      getFilteredCustomers(query, currentPage),
      getMedicalHistoriesByPetId(id)
    ]);
    const items = MEDICAL_HISTORY_PET_BREADCRUMB(id)
    console.log('medicalHistories::: ', medicalHistories);


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
      <Form medicalHistories={medicalHistories} pet={pet} query={query} currentPage={currentPage}/>
  

    </main>
  );
}