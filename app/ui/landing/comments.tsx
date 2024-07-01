'use client'
import { Box, Container, ContainerProps, Flex, Paper, rem, Text, Title } from '@mantine/core'
import React, { useEffect, useRef } from 'react'
import { Carousel } from '@mantine/carousel';
import { COMMENTS } from '@/app/constants';
import classes from './comments.module.css';
import { useMediaQuery } from '@mantine/hooks';
import styles from './comments.module.css';
import Autoplay from 'embla-carousel-autoplay';

function Comments() {
    const tablet_match = useMediaQuery('(max-width: 768px)');
    const autoplay = useRef(Autoplay({ delay: 2000 }));

    const BOX_PROPS: ContainerProps = {
        pt: rem(120),
        pb: rem(80),
        px: tablet_match ? rem(36) : rem(40 * 3),
        className: styles.section,
    };

 


  return (
    <Container bg="black" fluid {...BOX_PROPS}>
        <Title c="white" order={1} ta="center" mb="xl">
            What Our Customers Are Saying
        </Title>
        <Carousel
            height={200}
            slideGap={{ base: 0, sm: 'md' }}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            align="start"
            loop
            withControls={false}
            >
            {COMMENTS.map((comment, index) => (
            <Carousel.Slide key={index}>
            <Paper bg="black">
                <Box className={classes.textBoxComment}>
                    <Text c="white">{comment.text}</Text>
                </Box>
                <Flex c="white" justify={"center"}>
                    <Text c="primary" fw={500}>-{comment.author}</Text>
                </Flex>
            </Paper>
            </Carousel.Slide>
        ))}
        </Carousel>


    </Container>
  )
}

export default Comments