import { getAllAppointments, getAllFilteredPets, getAllVetsSchedules, getFilteredVets } from '@/app/lib/data';
import { Metadata } from 'next';
import { Title } from '@mantine/core';
import styles from './page.module.css';
import Form from '@/app/ui/appointments/create-form';

export const metadata: Metadata = {
  title: 'Vets',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    queryPet?: string;
    page?: string;
    queryVet?: string;
  };
}) {
  const queryVet = searchParams?.queryVet || '';
  const queryPet = searchParams?.queryPet || '';
  const currentPage = Number(searchParams?.page) || 1;

  
  const [
    appointments,
    vets,
    pets,
    vetSchedule
  ] = await Promise.all([
    getAllAppointments(),
    getFilteredVets(queryVet, currentPage),
    getAllFilteredPets(queryPet, currentPage),
    getAllVetsSchedules()
  ]);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <Title className={styles.breadcrumbs} order={1}>Citas</Title>
      </div>
      <Form appointments={appointments} vetSchedule={vetSchedule} vets={vets} pets={pets}  />
    </div>
  );
}