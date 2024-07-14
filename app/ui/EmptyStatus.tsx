'use client';
import React from 'react';
import { Card, Button, Container, Stack, Title } from '@mantine/core';
import Link from 'next/link';
import styles from './EmptyStatus.module.css';
import { usePathname } from 'next/navigation';
import { EMPTY_STATES } from '@/app/constants';



function EmptyStatus() {
  const currentPath = usePathname()
  const currentLink = EMPTY_STATES.find(link => link.href === currentPath);

  if (!currentLink) {
    return null;
  }


  return (
    <Container
      size="xl"
      className={styles.container}
      style={{ paddingInline: '0' }}
    >
          <Card
            component={Link} 
            href={currentLink.hrefAction}  
            key={currentLink.name} 
            shadow="xs" padding="lg" radius="md" withBorder
            className={styles.card}

            >
            <Card.Section className={styles.icon}>
            <currentLink.icon size={64} />
            </Card.Section>

            <Stack align="center" justify="center" w="100%" ta="center" mt="md" mb="xs">
              <Title order={4} ta="center">{currentLink.description}</Title>
              <Button variant="light" color="primary" fullWidth mt="md" radius="md">
              {currentLink.buttonText}  
              </Button>
            </Stack>
          </Card>
    </Container>
  );
}

export default EmptyStatus;
