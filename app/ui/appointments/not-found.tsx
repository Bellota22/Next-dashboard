'use client'
import { Button, Container, Group, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { useSpring, animated } from '@react-spring/web'
import React from 'react';
import { IconDog } from '@tabler/icons-react';
import { useRouter } from 'next/navigation'

export function NotFound() {
  const router = useRouter();
  const theme = useMantineTheme();
  const animation = useSpring({
    loop: true,
    to: [{ opacity: 1, transform: 'scale(1.1)' }, { opacity: 0.7, transform: 'scale(1)' }],
    from: { opacity: 0.7, transform: 'scale(1)' },
    config: { duration: 1000 },
  });



  return (
    <Stack justify='center' align='center' mt="100px">
      <animated.div style={animation}>
        <IconDog size={120} color="var(--mantine-color-primary-3)" />
      </animated.div>
      <Text ta="center" size="xl" w={700} mt="md">
        No se encontraron mascotas
      </Text>
      <Button
        color='primary'
        onClick={() => router.back()}>
        <Title order={6}>Regresar</Title>
      </Button>
    </Stack>
  );
}