import DashboardCards from '@/app/ui/dashboard/DashboardCards';
import { Badge, Button, Card, Group, Text, Title } from '@mantine/core';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {

 
  return (
    <main>
      <Title c="primary.3" opacity={0.7} order={1}>Bienvenido a PettoCare</Title>
      <DashboardCards />
    </main>
  );
}