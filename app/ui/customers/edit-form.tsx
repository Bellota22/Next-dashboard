'use client';

import Link from 'next/link';
// import { Button } from '@/app/ui/button';
import { editCustomer } from '@/app/lib/actions';
import { Box, Button, Flex, Group, Image, NumberInput, rem, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { useState } from 'react';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { UsersTable } from '@/app/lib/definitions';


type FormProps = {
  customerId: string;
  customer: UsersTable;
};
export default function Form({ customerId, customer }: FormProps) {
  console.log('customer::: ', customer);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      nombre: customer?.nombre || '',
      apellido: customer?.apellido || '',
      email: customer?.email || '',
      dni: customer?.dni || '',
      fecha_nacimiento: customer?.fecha_nacimiento || '',
      celular: customer?.celular || '',
      departamento: customer?.departamento || '',
      provincia: customer?.provincia || '',
      distrito: customer?.distrito || '',
      direccion: customer?.direccion || '',
      imagen_url: customer?.imagen_url || '',
      etiquetas: customer?.etiquetas || '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email incorrecto'),
      dni: (value) => {
        return value.toString().length === 8 ? null : 'DNI debe tener 8 dígitos'; 
      },
      
      
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState<Date | null>(null);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return <Image w={200} h={200} key={index} src={imageUrl} alt="image" onLoad={() => URL.revokeObjectURL(imageUrl)} />;
  });

  const handleSubmit = async (values: any) => {
    try {
      await editCustomer(customerId, values);
      window.location.href = '/dashboard/customers'; // Maneja la redirección aquí
    } catch (err) {
      setError('Error al actualizar el cliente');
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
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
              <TextInput
                withAsterisk
                label="Departamento"
                placeholder="Trujillo"
                required
                key={form.key('departamento')}
                {...form.getInputProps('departamento')}
              />
              <TextInput
                withAsterisk
                label="Distrito"
                placeholder="your@Distrito.com"
                required
                key={form.key('distrito')}
                {...form.getInputProps('distrito')}
              />
              <TextInput
                withAsterisk
                label="Provincia" 
                placeholder="72224455" 
                required
                key={form.key('provincia')}
                {...form.getInputProps('provincia')}
              />
              <TextInput
                withAsterisk
                label="Dirección" 
                placeholder="72224455" 
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
        <Button type="submit">Actualizar Cliente</Button>
      </Flex>
    </form>
  );
}
