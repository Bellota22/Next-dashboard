'use client';

import Link from 'next/link';
import { createMedicalHistory } from '@/app/lib/actions';
import { Box, Button, Flex, Group, Image, Checkbox, CheckboxProps , rem, Stack, Text, TextInput, Title, NativeSelect, Autocomplete, Textarea, NumberInput, Card, Badge, ActionIcon, List } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import {  useState } from 'react';
import { Customers, MedicalHistory, Pets, PetWithCustomer } from '@/app/lib/definitions';
import { NotFound } from './not-found';
import { useRouter } from 'next/navigation';
import classes from './medical-history-cards.module.css';
import { IconActivityHeartbeat, IconHeart, IconLungs, IconTemperature, IconThermometer, IconWeight } from '@tabler/icons-react';

interface FormProps {
  query: string;
  currentPage: number;
  pet: PetWithCustomer;
  medicalHistories: MedicalHistory[];
}

export default function Form({ pet, medicalHistories, query, currentPage }: FormProps) {
  const router = useRouter();
  const userId = '410544b2-4001-4271-9855-fec4b6a6442a';
  
  const handleCreateMedicalHistory = () => {
    
    router.push(`/dashboard/mascotas/${pet.id}/medical-history/create`);

  }


  return (
    <Box>
      {medicalHistories.length > 0 ? (
        medicalHistories.map((history) => (
          <Card key={history.id} withBorder className={classes.card}>
            <Card.Section className={classes.section} mt="md">
                <Stack ta="left" gap={0}>
                  <Badge size="sm" variant="light">
                    {history.reason}
                  </Badge>
                  <Text size="xs" className={classes.date} >{new Date(history.date).toLocaleDateString()}</Text>
                </Stack>
                <Stack mt={16} pl={8} gap={0}>
                  <Title order={6}>Anamnesis:</Title>
                  <List>
                    <List.Item><Text>{history.anamnesis}</Text></List.Item>
                  </List>
                  <Title order={6}>
                    Diagnosis:
                  </Title>
                  <List>
                    <List.Item><Text>{history.diagnosis}</Text></List.Item>
                  </List>
                </Stack>                
            </Card.Section>
      
            <Card.Section className={classes.section}>
              <Text mt="md" pl={8} className={classes.label} c="dimmed">
                Detalles adicionales
              </Text>
              <Group gap={7} mt={5}>
                <Badge color="primary" variant="light" key="weight" leftSection={<IconWeight color='grey' size={20}/> }>
                {history.weight} kg
                </Badge>
                <Badge color="primary" variant="light" key="temperature" leftSection={<IconTemperature  size={20} /> }>
                  {history.temperature} °C
                </Badge>
                <Badge color="primary" variant="light" key="heart_rate" leftSection={<IconActivityHeartbeat color='green' size={20} />}>
                  {history.heart_rate} bpm
                </Badge>
                <Badge color="primary" variant="light" key="respiratory_rate" leftSection={<IconLungs color='pink' size={20} />}>
                 {history.respiratory_rate} rpm
                </Badge>
                <Badge color="primary" variant="light" key="arterial_pressure" leftSection={<IconHeart color="red" size={20}/>}>
                  {history.arterial_pressure} mm Hg
                </Badge>
              </Group>
            </Card.Section>
      
            
          </Card>
        ))
      ) : (
        <NotFound handleCreateMedicalHistory={handleCreateMedicalHistory} />
      )}
    </Box>
  );
} 
