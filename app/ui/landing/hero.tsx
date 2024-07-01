import { PlayIcon } from '@heroicons/react/24/outline'
import { Box, Grid, Title, Button, Group, Stack, Text, Image, Flex } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import styles from './hero.module.css';

function Hero() {
  return (
    <Box className={styles.hero}>
        <Grid align="center" justify="center">
            <Grid.Col  span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
                <Stack className={styles.mobile}>
                <Box>
                    <Title
                        className={styles.title}
                        order={1}  
                        ta={{ base: 'center', md: 'left' }}
                        fw={700}
                    >
                    The simplest way to get your competitors <Text component="span" inherit c="primary">prices</Text> & <Text component="span" inherit c="primary">insights</Text>
                    </Title>
                </Box>
                <Group my="lg" justify='center'>
                    <Button
                        className={styles.button}
                        component={Link}
                        href="/dashboard"
                        rightSection={<PlayIcon width={18} />}
                        color="primary"
                        variant='outline'
                    >
                    Try PettoCare for Free!  
                    </Button>
                </Group>
                </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 10, md: 5 }} order={{ base: 1, md: 2 }}>
                <Flex className={styles.imageContainer}>
                    <Image
                    className={styles.image}
                    src={'/scrapping_cat.png'}
                    alt="/"
                    radius="xs"
                    />

                </Flex>
            </Grid.Col>
        </Grid>
    </Box>
  )
}

export default Hero
