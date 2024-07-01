'use client';

import Link from 'next/link';
// import { Button } from '@/app/ui/button';
import { createMascotas } from '@/app/lib/actions';
import { Box, Button, Flex, Group, Image, Checkbox, CheckboxProps , rem, Stack, Text, TextInput, Title, NativeSelect, Autocomplete } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { useState } from 'react';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { CustomerField } from '@/app/lib/definitions';


interface FormProps {
  customers: CustomerField[];
}


export default function Form({ customers }: FormProps) {
  
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [gender, setGender] = useState<string | null>(null);

  const [salud, setSalud] = useState<string[]>([]);
  const [grooming, setGrooming] = useState<boolean | null>(false);
  const [groomingFreq, setGroomingFreq] = useState<string>('');
  const [groomingDay, setGroomingDay] = useState<string>('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [selectedCustomerName, setSelectedCustomerName] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');

  const handleGenderChange = (value: string) => {
    setGender(prevGender => (prevGender === value ? null : value));
  };

 

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      customer_id: '',
      nombre: '',
      especie: '',
      raza: '',
      fecha_nacimiento: '',
      sexo: false,
      esterilizado:false,
      asegurado: false,
      grooming: false,
      grooming_freq: '',
      grooming_dia: '',
      etiquetas: '',
      imagen_url: '' ,
    },
    
  });

  form.setFieldValue('sexo', gender === "MACHO" ? true : false )
  form.setFieldValue('esterilizado', salud.includes('esterilizado') ? true : false )
  form.setFieldValue('asegurado', salud.includes('asegurado') ? true : false )
  form.setFieldValue('grooming', grooming ? grooming : false)
  form.setFieldValue('grooming_freq', groomingFreq ? groomingFreq : '')
  form.setFieldValue('grooming_dia', groomingDay ? groomingDay : '')
  form.setFieldValue('imagen_url', files.length > 0 ? files[0].path || '' : '')
  
  const handleCustomerChange = (value: string) => {
    setInputValue(value);

    const customer = customers.find((customer) => `${customer.nombre} ${customer.apellido}` === value);
    if (customer) {
      setSelectedCustomerName(value);
      setSelectedCustomerId(customer.id);
      form.setFieldValue('customer_id', customer.id);
    }
  };

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return <Image w={200} h={200} key={index} src={imageUrl} alt="image" onLoad={() => URL.revokeObjectURL(imageUrl)} />;
  });

  return (
    <form onSubmit={form.onSubmit((values) => (createMascotas(values)))}>
      <Flex justify={'space-between'} className="rounded-md bg-gray-50 p-4 md:p-6">
        <Stack>
          <Flex mb={4} gap={8}>
              <Autocomplete
                required
                label="Propietario"
                placeholder="Elmer Pacheco"
                data={customers.map((customer) => ({ value: `${customer.nombre} ${customer.apellido}`, label: `${customer.nombre} ${customer.apellido}` }))}
                limit={5}
                comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                key={form.key('customer_id')}
                value={inputValue}
                onChange={handleCustomerChange}
              />
              <TextInput
                withAsterisk
                label="Nombre"
                placeholder="Firulais"
                required
                key={form.key('nombre')}
                {...form.getInputProps('nombre')}
              />
              <TextInput
                withAsterisk
                label="Especie"
                placeholder="CANINO"
                required
                key={form.key('especie')}
                {...form.getInputProps('especie')}
              />
              <TextInput
                withAsterisk
                label="Raza" 
                placeholder="Golden Retriever" 
                required
                key={form.key('raza')}
                {...form.getInputProps('raza')}
              />
              <DateInput
                required
                label="Fecha nacimiento"
                placeholder="19/03/1999"   
                valueFormat="DD MMM YYYY"
                clearable            
                key={form.key('fecha_nacimiento')}
                {...form.getInputProps('fecha_nacimiento')}
              />
          </Flex>
          <Flex mb={4} gap={8} justify={"space-around"} >
              <Checkbox.Group
                withAsterisk
                label="Sexo"
                value={gender ? [gender] : []}
                onChange={() => {}}>
                  <Group mt="xs">
                    <Checkbox
                      value="MACHO" 
                      label="Macho" 
                      onChange={() => handleGenderChange("MACHO")} 
                    />
                    <Checkbox
                      value="HEMBRA" 
                      label="Hembra" 
                      onChange={() => handleGenderChange("HEMBRA")} 
                    />
                  </Group>
              </Checkbox.Group>
              <Checkbox.Group
                withAsterisk
                label="Salud"
                value={salud}
                onChange={setSalud}>
                  <Group mt="xs">
                    <Checkbox
                      value="esterilizado" 
                      label="¿Ha sido esterilizado?" 
                    />
                    <Checkbox
                      value="asegurado" 
                      label="¿Ha sido asegurado?" 
                    />
                  </Group>
              </Checkbox.Group>
              
              <TextInput
                withAsterisk
                label="Etiquetas"
                placeholder="No"
                required
                key={form.key('etiquetas')}
                {...form.getInputProps('etiquetas')}
              />
              
          </Flex>
          <Stack>
            <Title mt={10} order={5} >Opciones para grooming</Title>
              <Stack w={350}>
                <Checkbox
                  onChange={(event) => setGrooming(event.currentTarget.checked)}
                  label="Crear evento de grooming" 
                />
                <NativeSelect
                  withAsterisk
                  disabled={!grooming}
                  value={groomingFreq}
                  onChange={(event) => setGroomingFreq(event.currentTarget.value)}
                  data={['Semanal', 'Quincenal', 'Cada 3 semanas', 'Mensual']}
                />
                <NativeSelect
                  withAsterisk
                  disabled={!grooming}
                  value={groomingDay}
                  onChange={(event) => setGroomingDay(event.currentTarget.value)}
                  data={['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']}
                />
              </Stack>
            
          </Stack>
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
                    Coloca tu imagen
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
          href="/dashboard/mascotas"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Crear mascotas</Button>
      </Flex>
    </form>
  );
} 
