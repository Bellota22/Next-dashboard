'use client'
import React, { useEffect, useRef } from 'react'
import { Carousel } from "@mantine/carousel";
import { Box, Center, Image, Space, Stack, Text, Title } from "@mantine/core";
import Autoplay from 'embla-carousel-autoplay';
import { ASSETS } from '@/app/constants';
import styles from './Slider.module.css';

export default function Slider() {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  return (
    <Carousel
      mx="auto"
      loop
      align="end"
      withControls={false}
      height={700}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
      styles={{
        indicator: {
          width: 5,
          backgroundColor: "black",
          height: 4,
          transition: "width 250ms ease",

          "&[data-active]": {
            width: 20,
          },
        },
      }}
    >
      {ASSETS.map((item) => {
        return (
          <Carousel.Slide key={item.id}>
            <Stack>
              <Box className={styles.imageContainer} >
                <Image className={styles.image} alt={item.title} src={item.src} />
              </Box>
              <Stack className={styles.textContainer}>
                  <Title order={1}>
                    {item.title}
                  </Title>
                  <Text size="sm" c="dimmed" >
                    {item.text}
                  </Text>
                  <Text size="xs" c="dimmed" >
                    {item.sunText}
                  </Text>
              </Stack>

            </Stack>
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
}
