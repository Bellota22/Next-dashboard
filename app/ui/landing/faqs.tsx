import React from 'react'
import Surface from '../Surface';
import { Accordion, Box, Paper, Button, rem, Stack, Text, Title } from '@mantine/core';
import classes from './faqs.module.css';
import { useMediaQuery } from '@mantine/hooks';
import { FAQS } from '@/app/constants';
import { ChevronRightIcon } from '@heroicons/react/24/outline';


const Faqs = () => {
    const tablet_match = useMediaQuery('(max-width: 768px)');

    return (
      <Box
        id="faqs"
        bg="black" 
        pt={rem(120)} 
        pb={rem(80)} 
        px={tablet_match ? rem(36) : rem(40 * 3)}
        >
        <Title c="white" order={1} my="md" ta="center">
          Frequently Asked Questions
        </Title>
  
        <Accordion radius="md" classNames={classes}>
          {FAQS.map((faq) => (
            <Accordion.Item key={faq.question} value={faq.question}>
              <Accordion.Control>{faq.question}</Accordion.Control>
              <Accordion.Panel>{faq.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>

        <Stack align="center" gap="xs" >
          <Text c="dimmed">Still have questions?</Text>
          <Button
            variant="outline"
            rightSection={<ChevronRightIcon width={18} />}
            color="primary"
          >
            Contact Us
          </Button>
        </Stack>
      </Box>
    );
  };
  
  export default Faqs;