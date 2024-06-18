'use client'

import { PlayIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import classes from './page.module.css';
import {
  Box,
  Button,
  Grid,
  Group,
  Image,
  Text,
  Title,
  Stack,
  Tooltip,
  UnstyledButton,
  SimpleGrid,
  Container,
  rem,
  ContainerProps,
  Paper,
  Divider,
  Flex,
  PaperProps,
  Switch,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { COMMENTS, FEATURES, PRICING } from '@/app/constants';
import { Carousel } from '@mantine/carousel';
import React, { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import Autoplay from 'embla-carousel-autoplay';

import 'aos/dist/aos.css';

import Faqs from './ui/Faqs/Faqs';
import PricingCard from './ui/PricingCard/PricingCard';
import Surface from './ui/Surface';

const PAPER_PROPS: PaperProps = {
  p: 'md',
  shadow: 'md',
  radius: 'md',
  className: classes.paper,
};

export default function Page() {
  const tablet_match = useMediaQuery('(max-width: 768px)');
  const [checked, setChecked] = useState(false);

  const BOX_PROPS: ContainerProps = {
    pt: rem(120),
    pb: rem(80),
    px: tablet_match ? rem(36) : rem(40 * 3),
    className: classes.section,
  };
  const pricingItems = PRICING.map((p) => (
    <PricingCard key={p.tier} monthly={checked} {...p} {...PAPER_PROPS} />
  ));

  const autoplay = useRef(Autoplay as any);
  autoplay.current({ delay: 1000 });

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  
  return (
    <main className="flex min-h-screen flex-col">
      <Box className={classes.hero}>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
              <Stack>
                <Text>Easy data for you</Text>
                <Title className={classes.title}>
                  The simplest and fastest way to get your competitors {' '}
                  <Text component="span" inherit className={classes.highlight}>
                    prices{' '}
                  </Text>
                  &{' '}
                  <Text component="span" inherit className={classes.highlight}>
                    insights{' '}
                  </Text>

                </Title>
                <Group my="lg">
                  <Button
                    size="md"
                    rightSection={<PlayIcon width={18} />}
                    bg={'#3ea9c3'}
                  >
                    Try ScrappingCat for Free!  
                  </Button>
                </Group>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 10, md: 5 }} order={{ base: 1, md: 2 }}>
              <Image
                src={'/scrapping_cat.png'}
                alt="/"
              />
            </Grid.Col>
          </Grid>
        </Box>
        <Container fluid {...BOX_PROPS}>

          <SimpleGrid
            cols={{ base: 1, sm: 1, md: 2, lg: 3, xl: 3 }}
            spacing={{ base: 'sm', sm: 'sm', md: 'sm', lg: 'lg' }}
            verticalSpacing={{ base: 'sm', sm: 'sm', md: 'sm', lg: 'lg' }}
          >
            {FEATURES.map((feature) => (
              <Paper
                key={feature.title}
                p="md"
                className={classes.featureCard}
                data-aos="fade-up"
              >
                <Stack align='center' >
                  <Box w={250} h={250} >
                    <Image
                      src={feature.src}
                      alt={feature.title}
                      fit="contain"
                      />
                  </Box>
                  <Stack gap={4} align='center'>
                    <Title order={4}>{feature.title}</Title>
                    <Text fz="md" ta="center" >{feature.description}</Text>
                  </Stack>
                </Stack>
              </Paper>
            ))}
          </SimpleGrid>
        </Container>

        <Divider />
        <Container fluid {...BOX_PROPS}>
          <Title order={1} ta="center" mb="xl">
            What Our Customers Are Saying
          </Title>
          <Carousel
            height={200}
            slideGap={{ base: 0, sm: 'md' }}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            align="start"
            withControls={false}
          >
            {COMMENTS.map((comment, index) => (
              <Carousel.Slide key={index}>
                <Paper>
                  <Box className={classes.textBoxComment}><Text>{comment.text}</Text></Box>
                  <Flex justify={"center"}>
                    -<Text className={classes.authorComment}>{comment.author}</Text>
                  </Flex>
                </Paper>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Container>
        <Divider />
        <Container fluid {...BOX_PROPS}>
          <Stack gap="lg">
            <Paper style={{ backgroundColor: 'transparent' }}>
              <Stack>
                <Title order={2} ta="center">
                  Simple, fair pricing.
                </Title>
                <Text size="lg" ta="center">
                  All types of businesses need access to development resources, so
                  we give you the option to decide how much you need to use.
                </Text>
                <Flex justify="center" gap="md">
                  <Text>Annual</Text>
                  <Switch
                  color="#3ea9c3"
                    size="md"
                    checked={checked}
                    onChange={(event) => setChecked(event.currentTarget.checked)}
                  />
                  <Text>Monthly</Text>
                </Flex>
              </Stack>
            </Paper>
            <SimpleGrid
              cols={{ base: 1, sm: 2, lg: 3 }}
              spacing={{ base: 10, sm: 'xl' }}
              verticalSpacing={{ base: 'md', sm: 'xl' }}
            >
              {pricingItems}
            </SimpleGrid>
            <Surface component={Paper} {...PAPER_PROPS}>
              <Faqs />
            </Surface>
            <Surface
              component={Paper}
              style={{ backgroundColor: 'transparent' }}
              p="md"
            >
              <Stack align="center" gap="xs">
                <Text>Still have questions?</Text>
                <Button
                  variant="subtle"
                  rightSection={<ChevronRightIcon width={18} />}
                  c="#3ea9c3"
                >
                  Contact Us
                </Button>
              </Stack>
            </Surface>
          </Stack>
        </Container>
        <Divider />

    </main>
  );
}
