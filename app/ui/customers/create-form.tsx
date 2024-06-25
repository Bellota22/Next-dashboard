'use client';

import Link from 'next/link';
// import { Button } from '@/app/ui/button';
import { createCustomer } from '@/app/lib/actions';
import { Autocomplete, Box, Button, Flex, Group, Image, NumberInput, rem, Stack, Text, TextInput, ComboboxItem, OptionsFilter } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { useEffect, useState } from 'react';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import data from '@/app/lib/cities_data';

export default function Form() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      nombre: '',
      apellido: '',
      email: '',
      dni: '',
      celular: '',
      fecha_nacimiento: '',
      departamento: '',
      provincia: '',
      distrito: '',
      direccion: '',
      imagen_url: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email incorrecto'),
      dni: (value) => {
        return value.toString().length === 8 ? null : 'DNI debe tener 8 dígitos'; 
      },
      
      
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
  const [provincias, setProvincias] = useState<string[]>([]);
  const [distritos, setDistritos] = useState<string[]>([]);

  useEffect(() => {
    if (form.values.departamento) {
      const departamentoKey = form.values.departamento.toLowerCase().replace(/ /g, '_');
      setProvincias(data[departamentoKey]?.provincias || []);
      setDistritos([]);
      form.setFieldValue('provincia', '');
      form.setFieldValue('distrito', '');
    }
  }, [form.values.departamento]);

  useEffect(() => {
    if (form.values.provincia && form.values.departamento) {
      const departamentoKey = form.values.departamento.toLowerCase().replace(/ /g, '_');
      const provinciaKey = form.values.provincia.toLowerCase().replace(/ /g, '_');
      setDistritos(data[departamentoKey]?.distritos[provinciaKey] || []);
      form.setFieldValue('distrito', '');
    }
  }, [form.values.provincia, form.values.departamento]);


  return (
    <form onSubmit={form.onSubmit((values) => createCustomer(values))}>
      <Flex justify={'space-between'} className="rounded-md bg-gray-50 p-4 md:p-6">
        <Stack>
          <Flex mb={4} gap={8}>
              <TextInput
                withAsterisk
                label="Nombre"
                placeholder="Caceres"
                required
                key={form.key('nombre')}
                {...form.getInputProps('nombre')}
              />
              <TextInput
                withAsterisk
                label="Apellido"
                placeholder="Caceres"
                required
                key={form.key('apellido')}
                {...form.getInputProps('apellido')}
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
              <DateInput
                required
                label="Fecha nacimiento"
                placeholder="19/03/1999"
                key={form.key('fecha_nacimiento')}
                {...form.getInputProps('fecha_nacimiento')}
              />
          </Flex>
          <Flex mb={4} gap={8} >
              <TextInput
                withAsterisk
                label="Celular"
                placeholder="941941320"
                required
                key={form.key('celular')}
                {...form.getInputProps('celular')}
              />
              <Autocomplete
                required
                label="Departamento"
                placeholder="Trujillo"
                data={Object.keys(data).map((departamento) => ({ value: departamento.replace(/_/g, ' '), label: departamento.replace(/_/g, ' ') }))}
                filter={optionsFilter}
                key={form.key('departamento')}
                {...form.getInputProps('departamento')}
              />
              <Autocomplete
                required
                label="Distrito"
                placeholder="Distrito"
                data={distritos.map(dist => dist.replace(/_/g, ' '))}
                key={form.key('distrito')}
                {...form.getInputProps('distrito')}
              />          
              <Autocomplete
                withAsterisk
                label="Provincia" 
                placeholder="Provincia" 
                required
                key={form.key('provincia')} 
                {...form.getInputProps('provincia')}
              />
              <TextInput
                withAsterisk
                label="Dirección" 
                placeholder="Mz 29 Lt 10 Urb. Los Jardines de California" 
                required
                key={form.key('direccion')}
                {...form.getInputProps('direccion')}
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
                <div>
                  <Text size="xl" inline>
                    Drag images here or click to select files
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not exceed 5mb
                  </Text>
                </div>
              </Group>
            </Dropzone>
          ):
          <Box w={200} h={200}>
            {previews}
          </Box>
        }
        </Box>
      </Flex>
      <Flex className="mt-6 justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Crear cliente</Button>
      </Flex>
    </form>
  );
}
