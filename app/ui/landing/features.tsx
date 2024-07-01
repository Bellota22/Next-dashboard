'use client';

import { FEATURES, PRICING } from '@/app/constants'
import { Box, Container, ContainerProps, Image, Paper, PaperProps, rem, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import PricingCard from '../PricingCard';
import { useMediaQuery } from '@mantine/hooks';
import styles from './features.module.css';
import AOS from 'aos';

function Features() {
    const tablet_match = useMediaQuery('(max-width: 768px)');

    const BOX_PROPS: ContainerProps = {
        pt: rem(120),
        pb: rem(80),
        px: tablet_match ? rem(36) : rem(40 * 3),
        className: styles.section,
    };
     
      
    useEffect(() => {
        AOS.init({
             duration: 800,
             once: false,
           })
     }, [])

  return (
    <Container id="features" fluid {...BOX_PROPS}>
        <SimpleGrid
        cols={{ base: 1, sm: 1, md: 2, lg: 3, xl: 3 }}
        spacing={{ base: 'sm', sm: 'sm', md: 'sm', lg: 'lg' }}
        verticalSpacing={{ base: 'sm', sm: 'sm', md: 'sm', lg: 'lg' }}
        >
        {FEATURES.map((feature) => (
            <Paper
            key={feature.title}
            p="md"
            bg={"transparent"}
            data-aos="fade-up"
            >
            <Stack align='center' >
                <Box w={250} h={250}>
                    <Image
                        src={feature.src}
                        alt={feature.title}

                    />
                </Box>
                <Stack w={300} gap={4} align='center'>
                    <Title order={3}>{feature.title}</Title>
                    <Text fz="md" ta="center" >{feature.description}</Text>
                </Stack>
            </Stack>
            </Paper>
        ))}
        </SimpleGrid>
    </Container>
  )
}

export default Features