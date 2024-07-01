'use client';
import { Box, ContainerProps, Flex, PaperProps, rem, SimpleGrid, Stack, Switch, Text, Title } from '@mantine/core'
import React, { useState } from 'react'
import PricingCard from '../PricingCard';
import { PRICING } from '@/app/constants';
import { useMediaQuery } from '@mantine/hooks';
import classes from './pricing.module.css';

function Pricing() {
    
    const [checked, setChecked] = useState(true);

    const PAPER_PROPS: PaperProps = {
        p: 'md',
        shadow: 'md',
        radius: 'md',
        
      };

    const pricingItems = PRICING.map((p) => (
        <PricingCard key={p.tier} monthly={checked} {...p} {...PAPER_PROPS} />
      ));
  return (
    <Stack id="pricing" pt={rem(120)} pb={rem(80)}>
        <Stack  align="center" gap="xl">
            <Title order={1} ta="center">
                Simple, fair pricing.
            </Title>
            <Box px="xl">
                <Text c="dimmed" size="lg" ta="center">
                All types of businesses need access to development resources, so
                we give you the option to decide how much you need to use.
                </Text>
            </Box>
            <Flex justify="center" gap="md" mb="md">
                <Text>Monthly</Text>
                <Switch
                    color="primary"
                    size="md"
                    variant='outline'
                    checked={checked}
                    onChange={(event) => setChecked(event.currentTarget.checked)}
                />
                <Text>Annual</Text>
            </Flex>
        </Stack>
        <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 3 }}
            spacing={{ base: 10, sm: 'xl' }}
            verticalSpacing={{ base: 'md', sm: 'xl' }}
        >
            {pricingItems}
        </SimpleGrid>
    </Stack>
  )
}

export default Pricing