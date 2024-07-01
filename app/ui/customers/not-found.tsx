'use client'
import { Button, Container, Group, Stack, Text } from '@mantine/core';
import { useSpring, animated } from '@react-spring/web'
import React from 'react';
import { IconDog } from '@tabler/icons-react';
import { useRouter } from 'next/navigation'

export function NotFound() {
  const router = useRouter();

  const animation = useSpring({
    loop: true,
    to: [{ opacity: 1, transform: 'scale(1.1)' }, { opacity: 0.7, transform: 'scale(1)' }],
    from: { opacity: 0.7, transform: 'scale(1)' },
    config: { duration: 1000 },
  });

  const handleBack = () => {
    if (router) {
      router.back();
    }
  };

  return (
    <Stack justify='center' align='center'>
      <animated.div style={animation}>
        <IconDog size={120} color="#74c0fc" />
      </animated.div>
      <Text ta="center" size="xl" w={700} mt="md">
        No se encontraron mascotas
      </Text>
      <Button onClick={() => router.back()}>
        Regresar
      </Button>
    </Stack>
  );
}