'use client';

import Link from 'next/link';
// import { Button } from '@/app/ui/button';
import { createPet } from '@/app/lib/actions';
import { Box, Button, Flex, Group, Image, Checkbox, CheckboxProps , rem, Stack, Text, TextInput, Title, NativeSelect, Autocomplete } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { useState } from 'react';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { Customers, Pets } from '@/app/lib/definitions';
import Search from '../search';
import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getFilteredCustomers } from '@/app/lib/data';


interface FormProps {
  customers: Customers[];
  query: string;
  currentPage: number;
}


export default function Form({ customers, query, currentPage }: FormProps) {
  
  const userId = '410544b2-4001-4271-9855-fec4b6a6442a';
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [gender, setGender] = useState<string | null>(null);

  const [salud, setSalud] = useState<string[]>([]);
  const [grooming, setGrooming] = useState<boolean | null>(false);
  const [groomingFreq, setGroomingFreq] = useState<string>('');
  const [groomingDay, setGroomingDay] = useState<string>('');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [selectedCustomerName, setSelectedCustomerName] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleGenderChange = (value: string) => {
    setGender(prevGender => (prevGender === value ? null : value));
  };

  const form = useForm<Pets>({
    mode: 'uncontrolled',
    initialValues: {
      id: '',
      user_id: userId,
      customer_id: '',
      name: '',
      birthday: new Date(),
      specie: '',
      race: '',
      gender: true,
      sterelized: false,
      insured:false,
      tags: '',
      grooming: false,
      grooming_freq: '',
      grooming_day: '',
      image_url: '' ,
      created_date: new Date(),
      updated_date: new Date(),
    },
    
  });

  form.setFieldValue('gender', gender === "MACHO" ? true : false )
  form.setFieldValue('sterelized', salud.includes('sterelized') ? true : false);
  form.setFieldValue('insured', salud.includes('insured') ? true : false);
  form.setFieldValue('grooming', grooming ? grooming : false)
  form.setFieldValue('grooming_freq', groomingFreq ? groomingFreq : '')
  form.setFieldValue('grooming_day', groomingDay ? groomingDay : '');
  form.setFieldValue('image_url', files.length > 0 ? files[0].path || '' : '')
  
  const handleSubmit = async (values: Pets) => {
    if (!selectedCustomerId) {
      setError('Debe seleccionar un propietario válido.');
      return;
    }
    values.customer_id = selectedCustomerId;  // Set customer_id before submitting
    await createPet(values);
  };

  
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return <Image w={200} h={200} key={index} src={imageUrl} alt="image" onLoad={() => URL.revokeObjectURL(imageUrl)} />;
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Flex justify={'space-between'} className="rounded-md bg-gray-50 p-4 md:p-6">
        <Stack>
          <Flex mb={4} gap={8}>
              <Autocomplete
                withAsterisk
                label="Propietario"
                placeholder="Buscar propietario"
                required
                defaultValue={searchParams.get('query')?.toString()}
                data={customers.map((customer) => ({ value: customer.id, label: customer.name }))}
                key={form.key('customer_id')}
                {...form.getInputProps('customer_id')}
                onChange={(value) => {
                  const selectedCustomer = customers.find(customer => customer.name === value);
                  if (selectedCustomer) {
                    setSelectedCustomerId(selectedCustomer.id);
                    setSelectedCustomerName(selectedCustomer.name);
                  } else {
                    setSelectedCustomerId('');
                    setSelectedCustomerName('');
                  }
                  handleSearch(value);
                  setInputValue(value);
                }}
              />

              <TextInput
                withAsterisk
                label="Nombre"
                placeholder="Firulais"
                required
                key={form.key('name')}
                {...form.getInputProps('name')}
              />
              <TextInput
                withAsterisk
                label="Especie"
                placeholder="CANINO"
                required
                key={form.key('specie')}
                {...form.getInputProps('specie')}
              />
              <TextInput
                withAsterisk
                label="Raza" 
                placeholder="Golden Retriever" 
                required
                key={form.key('race')}
                {...form.getInputProps('race')}
              />
              <DateInput
                required
                label="Fecha nacimiento"
                placeholder="19/03/1999"   
                valueFormat="DD MMM YYYY"
                clearable            
                key={form.key('birthday')}
                {...form.getInputProps('birthday')}
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
              
              <Autocomplete
                withAsterisk
                label="Etiquetas"
                placeholder="No"
                required
                data={['Nuevo', 'Frecuente', 'Vip']}
                key={form.key('tags')}
                {...form.getInputProps('tags')}
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
