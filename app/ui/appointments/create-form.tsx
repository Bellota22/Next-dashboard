'use client';

import { createAppointment, createVet, createVetSchedule } from '@/app/lib/actions';
import { Autocomplete, Box, Button, Flex, Group, Image, NumberInput, rem, Stack, Text, TextInput, ComboboxItem, OptionsFilter, Title, Badge  } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Appointments, Pets, Veterinary, VetSchedule } from '@/app/lib/definitions';
import { SPECIALTIES } from '@/app/constants'
import MyCalendar from './MyCalendar-create-form';
import { v4 as uuidv4 } from 'uuid';
import { useDebouncedCallback } from 'use-debounce';
import { stringOrDate } from 'react-big-calendar';

interface VetEvent {
  id: string;
  title: string;
  start: Date | null;
  end: Date | null;

}
interface FormProps {
  vetSchedule: VetSchedule[];
  appointments: Appointments[];
  vets: Veterinary[];
  pets: Pets[]
}
interface CalendarEvent {
  id: string;
  title: string;
  start: stringOrDate;
  end: stringOrDate;
  allDay?: boolean;
  status?: boolean;
}
export default function Form({ appointments, vetSchedule, vets, pets }: FormProps) {
  const router = useRouter();
   
  
  const [vetEvent, setVetEvent] = useState<CalendarEvent[]>([]);
  const [selectedAppointments, setSelectedAppointments] = useState<Appointments[]>([]);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id: '',
      user_id: '',
      vet_id: '',
      pet_id: '',
      title: '',
      start_time: new Date(),
      end_time: new Date(),
      status: false,
      created_date: new Date(),
      updated_date: new Date(),
    },


  });


  const handleSubmit = async (values: Appointments) => {
    const vetId = uuidv4(); 
    values.id = vetId;
    values.vet_id = selectedVetId;
    values.pet_id = selectedPetId;

    
    if (selectedAppointments.length === 0) {
      alert('Seleccione al menos un horario');
      return;
    }
    try {

      for (const appointments of selectedAppointments) {
        await createAppointment({
          id: uuidv4(),
          user_id: '',
          vet_id: selectedVetId,
          pet_id: selectedPetId,
          start_time: appointments.start_time,
          end_time: appointments.end_time,
          title: appointments.title,
          status: values.status,
          created_date: new Date(),
          updated_date: new Date(),         
        });
      }

      router.push('/dashboard/appointments');
    } catch (error) {
      console.error('Error al crear el evento del veterinario:', error);
    }
  };
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearchVet = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('queryVet', term);
    } else {
      params.delete('queryVet');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleSearchPet = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('queryPet', term);
    } else {
      params.delete('queryPet');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);


  const [selectedVetId, setSelectedVetId] = useState<string>('');
  const [selectedPetId, setSelectedPetId] = useState<string>('');




  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Flex justify={'space-between'} className="p-4 md:p-6">
        <Stack>
          <Flex mb={4} gap={8} >
          <Autocomplete
                withAsterisk
                label="Veterinario"
                placeholder="Buscar veterinario"
                required
                defaultValue={searchParams.get('query')?.toString()}
                data={vets.map((vet) => ({ value: vet.id, label: vet.name }))}
                key={form.key('vet_id')}
                {...form.getInputProps('vet_id')}
                onChange={(value) => {
                  const selectedVet = vets.find(vet => vet.name === value);
                  if (selectedVet) {
                    setSelectedVetId(selectedVet.id);
                  } else {
                    setSelectedVetId('');
                  }
                  handleSearchVet(value);
                }}
              />
          <Autocomplete
                withAsterisk
                label="Mascota"
                placeholder="Buscar mascota"
                required
                defaultValue={searchParams.get('query')?.toString()}
                data={pets.map((pet) => ({ value: pet.id, label: pet.name }))}
                key={form.key('pet_id')}
                {...form.getInputProps('pet_id')}
                onChange={(value) => {
                  const selectedPet = pets.find(pet => pet.name === value);
                  if (selectedPet) {
                    setSelectedPetId(selectedPet.id);
                  } else {
                    setSelectedPetId('');
                  }
                  handleSearchPet(value);
                }}
              />
              
          </Flex>

          <Stack gap={3}>
            <Text>Leyenda</Text>
            <Badge variant="dot" size="lg" color="primary.1"><Text size="md">Citas</Text></Badge >
            <Badge variant="dot" size="lg"  color="primary.4"><Text size="md">Horario Veterinario</Text></Badge >
          </Stack>
        
          
        </Stack>
        
      </Flex>
      <Box p={24}>
        <MyCalendar
          appointments={appointments} 
          vetSchedule={vetSchedule} 
          setSelectedAppointments={setSelectedAppointments}  
          selectedAppointments={selectedAppointments}
          setVetEvent={setVetEvent}
        />
      </Box>
        
        <Flex className="mt-6 justify-end gap-4 p-6">
          <Button
            color="gray.4"
            onClick={() => router.back()}
          >
            <Title order={6}>Cancelar</Title>{' '}
          </Button>
          <Button
            type="submit"
            color="primary.3"
          >
            <Title order={6}>Crear</Title>{' '}
          </Button>
        </Flex>

    </form>
  );
}
