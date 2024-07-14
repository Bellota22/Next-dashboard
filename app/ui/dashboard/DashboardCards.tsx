'use client';
import React from 'react';
import { Card, Image, Text, Badge, Button, Group, SimpleGrid, Container } from '@mantine/core';
import { IconShoppingBag, IconUsersGroup, IconPaw, IconPackage, IconStethoscope, IconCalendar } from '@tabler/icons-react';
import Link from 'next/link';
import styles from './DashboardCards.module.css';

const links = [
  { name: 'Ventas', href: '/dashboard/ventas', icon: IconShoppingBag, description: 'Gestione y visualice sus ventas.' },
  { name: 'Clientes', href: '/dashboard/customers', icon: IconUsersGroup, description: 'Administre la información de sus clientes.' },
  { name: 'Mascotas', href: '/dashboard/mascotas', icon: IconPaw, description: 'Controle los datos de las mascotas.' },
  { name: 'Productos', href: '/dashboard/products', icon: IconPackage, description: 'Supervise el inventario de productos.' },
  { name: 'Veterinarios', href: '/dashboard/vets', icon: IconStethoscope, description: 'Gestione la información de los veterinarios.' },
  { name: 'Citas', href: '/dashboard/appointments', icon: IconCalendar, description: 'Programe y controle las citas.' },
];

function DashboardCards() {
  return (
    <Container
      size="xl"
      className="py-8"
      style={{ paddingInline: '0' }}

    >
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing="xl"
        verticalSpacing="lg"
      >
        {links.map((link) => (
          <Card
            component={Link} 
            href={link.href}  
            key={link.name} 
            shadow="xs" padding="lg" radius="md" withBorder
            className={styles.card}

            >
            <Card.Section className={styles.icon}>
            <link.icon size={64} />
            </Card.Section>

            <Group mt="md" mb="xs">
              <Text w={500}>{link.name}</Text>
              <Badge
                variant="gradient"
                gradient={{ from: 'primary', to: 'white', deg: 90 }}
              >Nuevo</Badge>
            </Group>

            <Text size="sm" color="dimmed">
              {link.description}
            </Text>

            <Button variant="light" color="primary" fullWidth mt="md" radius="md">
              Ir a {link.name}    
            </Button>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default DashboardCards;
