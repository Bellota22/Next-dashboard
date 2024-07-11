'use client';

import Link from 'next/link';
// import { Button } from '@/app/ui/button';
import { editPet } from '@/app/lib/actions';
import { Box, Button, Flex, Group, Image, Checkbox, CheckboxProps , rem, Stack, Text, TextInput, Title, NativeSelect, Autocomplete } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { useEffect, useState } from 'react';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { Customers, Pets, PetWithCustomer } from '@/app/lib/definitions';
import Search from '../search';
import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getFilteredCustomers } from '@/app/lib/data';
import { set } from 'zod';

interface FormProps {
  pet: PetWithCustomer;
  customers: Customers[];
  query: string;
  currentPage: number;
}


export default function Form({ customers, pet,  query, currentPage }: FormProps) {
  
   

  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [gender, setGender] = useState<string | null>(pet.gender ? 'MACHO' : 'HEMBRA');
  const [sterelized, setSterelized] = useState<boolean>(pet.sterelized);
  const [insured, setInsured] = useState<boolean>(pet.insured);

  const [selectedCustomer, setSelectedCustomer] = useState<Customers | null>(pet.customer);
  const [inputValue, setInputValue] = useState<string>(pet.customer.name);
  const [saludValues, setSaludValues] = useState<string[]>(
    pet.sterelized && pet.insured ? ['sterelized', 'insured'] : pet.sterelized ? ['sterelized'] : pet.insured ? ['insured'] : []
  );

  
  const [grooming, setGrooming] = useState<boolean | undefined>(pet.grooming);
  const [groomingFreq, setGroomingFreq] = useState<string | undefined>(pet.grooming_freq);
  const [groomingDay, setGroomingDay] = useState<string | undefined>(pet.grooming_day);
  const [error, setError] = useState<string | null>(null);

  const handleGenderChange = (value: string) => {
    setGender(prevGender => (prevGender === value ? null : value));
  };
  const handleSterelizedChange = (checked: boolean) => {
    setSterelized(checked);
    setSaludValues((prev) => (checked ? [...prev, 'sterelized'] : prev.filter((value) => value !== 'sterelized')));
  };
  const handleInsuredChange = (checked: boolean) => {
    setInsured(checked);
    setSaludValues((prev) => (checked ? [...prev, 'insured'] : prev.filter((value) => value !== 'insured')));
  };

  const form = useForm<Pets>({
    mode: 'uncontrolled',
    initialValues: {
      id: pet.id,
      user_id: '',
      customer_id: pet.customer_id,
      name: pet.name,
      birthday: pet.birthday || new Date(),
      specie: pet.specie,
      race: pet.race,
      gender: pet.gender,
      sterelized: pet.sterelized,
      insured: pet.insured,
      tags: pet.tags,
      grooming: pet.grooming,
      grooming_freq: pet.grooming_freq,
      grooming_day: pet.grooming_day,
      image_url: pet.image_url,
      created_date: pet.created_date,
      updated_date: pet.updated_date,
    },
    
  });

  form.setFieldValue('gender', gender === "MACHO" ? true : false);
  form.setFieldValue('sterelized', sterelized);
  form.setFieldValue('insured', insured);
  form.setFieldValue('grooming', grooming);
  form.setFieldValue('grooming_freq', groomingFreq);
  form.setFieldValue('grooming_day', groomingDay);
  form.setFieldValue('image_url', files.length > 0 ? files[0].path || '' : '');

  
  
  
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return <Image w={200} h={200} key={index} src={imageUrl} alt="image" onLoad={() => URL.revokeObjectURL(imageUrl)} />;
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const router = useRouter();

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

  const handleChange = (value: string) => {
    setInputValue(value);
    handleSearch(value);

    const foundCustomer = customers.find((customer) => customer.name === value) || null;
    setSelectedCustomer(foundCustomer);


    form.setFieldValue('customer_id', foundCustomer ? foundCustomer.id : '');
};

  const handleSubmit = async (values: Pets) => {
    if (!selectedCustomer) {
      setError('Debe seleccionar un propietario válido.');
      return;
    }
    setInputValue(selectedCustomer.name);
    values.customer_id =  selectedCustomer.id ;
    await editPet(values);
    router.push("/dashboard/mascotas");

};

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Flex justify={'space-between'} className="p-4 md:p-6">
        <Stack>
          <Flex mb={4} gap={8}>
            <Autocomplete
              withAsterisk
              label="Propietario"
              placeholder="Buscar propietario"
              required
              value={inputValue}
              defaultValue={searchParams.get('query')?.toString()}
              key={form.key('customer_id')}
              {...form.getInputProps('customer_id')}
              data={customers.map((customer) => ({ value: customer.id, label: customer.name }))}
              onChange={handleChange}
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
                      color="primary"
                      
                      variant='outline'
                      value="MACHO" 
                      label="Macho" 
                      onChange={() => handleGenderChange("MACHO")} 
                    />
                    <Checkbox
                      color="primary"
                      variant='outline'
                      value="HEMBRA" 
                      label="Hembra" 
                      onChange={() => handleGenderChange("HEMBRA")} 
                    />
                  </Group>
              </Checkbox.Group>
              <Checkbox.Group
                withAsterisk
                label="Salud"
                value={saludValues} 
                onChange={() => {}}>
                  <Group mt="xs">
                    <Checkbox
                      color="primary"
                      variant='outline'
                      value="sterelized" 
                      label="¿Ha sido esterilizado?" 
                      checked={sterelized}
                      onChange={(event) => handleSterelizedChange(event.currentTarget.checked)}
                      />
                    <Checkbox
                      color="primary"
                      variant='outline'
                      value="insured" 
                      label="¿Ha sido asegurado?" 
                      checked={insured}
                      onChange={(event) => handleInsuredChange(event.currentTarget.checked)}
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
                  color="primary"
                  variant='outline'
                  onChange={(event) => setGrooming(event.currentTarget.checked)}
                  defaultChecked={pet.grooming}
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
      <Flex className="mt-6 justify-end gap-4 p-8">
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
