'use client';

import { createVet } from '@/app/lib/actions';
import { Autocomplete, Box, Button, Flex, Group, Image, NumberInput, rem, Stack, Text, TextInput, ComboboxItem, OptionsFilter, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Veterinary } from '@/app/lib/definitions';
import { SPECIALTIES } from '@/app/constants'
import MyCalendar from './MyCalendar';

export default function Form() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = '410544b2-4001-4271-9855-fec4b6a6442a';

  const form = useForm<Veterinary>({
    mode: 'uncontrolled',
    initialValues: {
      id: '',
      user_id: userId,
      name: '',
      email: '',
      dni: 0,
      cellphone: '',
      address: '',
      specialties: [],
      image_url: '',
      created_date: new Date(),
      updated_date: new Date(),
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


  const optionsFilter: OptionsFilter = ({ options, search }) => {
    const filtered = (options as ComboboxItem[]).filter((option) =>
      option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
    );
  
    filtered.sort((a, b) => a.label.localeCompare(b.label));
    return filtered;
  };
 
  
  const handleSubmit = async (values: Veterinary) => {

    await createVet(values);

    router.push('/dashboard/vets');
    
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
          <MyCalendar />
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
