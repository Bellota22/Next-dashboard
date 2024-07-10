'use client';

import { createVet, editVet, editVetSchedule } from '@/app/lib/actions';
import { Autocomplete, Box, Button, Flex, Group, Image, NumberInput, rem, Stack, Text, TextInput, ComboboxItem, OptionsFilter, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Veterinary, VetSchedule } from '@/app/lib/definitions';
import { SPECIALTIES } from '@/app/constants'
import MyCalendar from './MyCalendar-edit-form';
import { v4 as uuidv4 } from 'uuid';

interface VeterinaryFormProps {
  vetSchedule: VetSchedule[];
  vet: Veterinary;
}

export default function Form({ vetSchedule, vet }: VeterinaryFormProps) {
  console.log('vet::: ', vet);

  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = '410544b2-4001-4271-9855-fec4b6a6442a';
  const [vetEvent, setVetEvent] = useState<VetSchedule[]>([]);

  const form = useForm<Veterinary>({
    mode: 'uncontrolled',
    initialValues: {
      id: vet.id,
      user_id: userId,
      name: vet.name,
      email: vet.email,
      dni: vet.dni,
      cellphone: vet.cellphone,
      address: vet.address,
      specialties: vet.specialties,
      image_url: vet.image_url,
      created_date: vet.created_date,
      updated_date: vet.updated_date,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email incorrecto'),
          
    },
  });

  const [files, setFiles] = useState<FileWithPath[]>([]);
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return <Image w={200} h={200} key={index} src={imageUrl} alt="image" onLoad={() => URL.revokeObjectURL(imageUrl)} />;
  });

  
  const handleSubmit = async (values: Veterinary) => {

    values.id = vet.id;
    if (vetEvent.length === 0 && vetSchedule.length === 0) {
      alert('Seleccione al menos un horario');
      return;
    }

    try {
      await editVet(values);

      // Crea cada evento en el calendario
      for (const event of vetEvent) {
        await editVetSchedule({
          id: event.id,
          user_id: event.user_id,
          vet_id: vet.id,
          title: event.title,
          start_time: event.start_time,
          end_time: event.end_time,
          status: event.status,
          created_date: event.created_date,
          updated_date: event.updated_date,
        });
      }

      router.push('/dashboard/vets');
    } catch (error) {
      console.error('Error al crear el evento del veterinario:', error);
    }
    
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Flex justify={'space-between'} className="p-4 md:p-6">
        <Stack>
          <Flex mb={4} gap={8}>
              <TextInput
                withAsterisk
                label="Nombre"
                placeholder="Juan Perez Lopez"
                required
                key={form.key('name')}
                {...form.getInputProps('name')}
              />
              <TextInput
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                required
                key={form.key('email')}
                {...form.getInputProps('email')}
              />
              <NumberInput
                hideControls
                withAsterisk
                maxLength={8}
                label="DNI" 
                placeholder="72224455"
                required
                key={form.key('dni')}
                {...form.getInputProps('dni')}
              />
             <TextInput
                withAsterisk
                label="Celular"
                placeholder="941941320"
                required
                key={form.key('cellphone')}
                {...form.getInputProps('cellphone')}
              />
              <TextInput
                withAsterisk
                label="Dirección" 
                placeholder="Mz 29 Lt 10 Urb. Los Jardines de California" 
                required
                key={form.key('address')}
                {...form.getInputProps('address')}
              />
          </Flex>
          <Flex mb={4} gap={8} >
          <Autocomplete
                required
                label="Especialidad"
                placeholder="Tags"
                data={
                  SPECIALTIES.map((tag) => ({ value: tag.id, label: tag.name }))
                }
                key={form.key('specialties')}
                {...form.getInputProps('specialties')}
              />
            
              
          </Flex>

          
        </Stack>
        <Box p={10} >
          {previews.length === 0 ? (
            <Dropzone
              onDrop={setFiles}
              onReject={(files) => console.log('rejected files', files)}
              maxSize={5 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
              style={{ width: 200, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              key={form.key('imagen_url')}
              {...form.getInputProps('imagen_url')}
            >
              <Group justify="center" gap="xl" style={{ pointerEvents: 'none' }}>
                <Dropzone.Accept>
                  <IconUpload
                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto
                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                    stroke={1.5}
                  />
                </Dropzone.Idle>
                  <Text size="xl" inline>
                    No hay foto
                  </Text>
                  
              </Group>
            </Dropzone>
          ):
          <Box w={200} h={200}>
            {previews}
          </Box>
        }
        </Box>
      </Flex>
      <Box p={24}>
        <MyCalendar vet={vet} vetSchedule={vetSchedule} setVetEvent={setVetEvent} />
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
            <Title order={6}>Editar</Title>{' '}
          </Button>
        </Flex>

    </form>
  );
}
