'use client';

import Link from 'next/link';
import { editPet } from '@/app/lib/actions';
import { Box, Button, Flex, Group, Image, Checkbox, CheckboxProps , rem, Stack, Text, TextInput, Title, NativeSelect, Autocomplete, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { useEffect, useState } from 'react';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { Customers, MedicalHistory, Pets, PetWithCustomer } from '@/app/lib/definitions';
import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { NotFound } from './not-found';

interface FormProps {
  query: string;
  currentPage: number;
  pet: PetWithCustomer;
}


export default function Form({ pet, query, currentPage }: FormProps) {
  
  const userId = '410544b2-4001-4271-9855-fec4b6a6442a';

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

  const form = useForm<MedicalHistory>({
    mode: 'uncontrolled',
    initialValues: {
      id: '',
      user_id: userId,
      pet_id: pet.id,
      date: new Date(),
      reason: '',
      anamnesis: '',
      weight: 0,
      respiratory_rate: 0,
      heart_rate: 0,
      temperature: 0,
      rectal_test: 0,
      arterial_pressure: 0,
      filled_hair_time: 0,
      dehydration: 0,
      clinical_test: '',
      diagnosis: '',
      auxiliary_test: '',
      treatment: '',
      preescription: '',
      observation: '',
      created_date: new Date(),
      updated_date: new Date(),      
    },
    
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


  const handleSubmit = async (values: MedicalHistory) => {
    console.log('values::: ', values);
    if (!selectedCustomer) {
      setError('Debe seleccionar un propietario válido.');
      return;
    }
    setInputValue(selectedCustomer.name);
    await editPet(values);
    router.push("/dashboard/mascotas");

};

const [isMedicalHistory, setIsMedicalHistory] = useState<boolean>(false);
const handleCreateMedicalHistory = () => {
  setIsMedicalHistory(true);

}

  return (
    <Box>
      {isMedicalHistory ? (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex justify={'space-between'} className="p-4 md:p-6">
          <Stack>
            <Stack bd={20}>
              <Flex mb={4} gap={8}>
               
                  <DateInput
                    required
                    label="Fecha nacimiento"
                    placeholder="19/03/1999"   
                    valueFormat="DD MMM YYYY"
                    clearable            
                    key={form.key('birthday')}
                    {...form.getInputProps('birthday')}
                  />
                  <TextInput
                    withAsterisk
                    w="100%"
                    label="Motivo de atención"
                    placeholder="Consultoria"
                    required
                    key={form.key('reason')}
                    {...form.getInputProps('reason')}
                  />
                  
                  
              </Flex>
              <Textarea
                withAsterisk
                resize="both"
                w="100%"
                label="Anamnesis y descripción del caso"
                placeholder=""
                required
                key={form.key('anamnesis')}
                {...form.getInputProps('anamnesis')}
              />
            </Stack>
              
            <Flex mb={4} gap={8}>
                <TextInput
                  withAsterisk
                  label="Peso (Kg)" 
                  placeholder="45 " 
                  required
                  key={form.key('weight')}
                  {...form.getInputProps('weight')}
                />
                <TextInput
                  withAsterisk
                  label="Frecuencia respiratoria (rpm)"
                  placeholder="124"
                  required
                  key={form.key('respiratory_rate')}
                  {...form.getInputProps('respiratory_rate')}
                />
                <TextInput
                  withAsterisk
                  label="Motivo de atención (rpm)"
                  placeholder="145"
                  required
                  key={form.key('heart_rate')}
                  {...form.getInputProps('heart_rate')}
                />
                
                <TextInput
                  withAsterisk
                  label="Temperatura (C°)"
                  placeholder="30"
                  required
                  key={form.key('temperature')}
                  {...form.getInputProps('temperature')}
                />
                
                
            </Flex>
            <Flex mb={4} gap={8}>
                <TextInput
                  withAsterisk
                  label="DRE" 
                  placeholder="" 
                  required
                  key={form.key('rectal_test')}
                  {...form.getInputProps('rectal_test')}
                />
                <TextInput
                  withAsterisk
                  label="presión arterial"
                  placeholder="124"
                  required
                  key={form.key('arterial_pressure')}
                  {...form.getInputProps('arterial_pressure')}
                />
                <TextInput
                  withAsterisk
                  label="TLC"
                  placeholder="145"
                  required
                  key={form.key('filled_hair_time')}
                  {...form.getInputProps('filled_hair_time')}
                />
                
                <TextInput
                  withAsterisk
                  label="DHT"
                  placeholder="30"
                  required
                  key={form.key('dehydration')}
                  {...form.getInputProps('dehydration')}
                />
                
                
            </Flex>
            <Textarea
                withAsterisk
                resize="both"
                w="100%"
                label="Examen clínico"
                placeholder=""
                required
                key={form.key('clinical_test')}
                {...form.getInputProps('clinical_test')}
              />
            <Textarea
                withAsterisk
                resize="both"
                w="100%"
                label="Diagnóstico"
                placeholder=""
                required
                key={form.key('diagnosis')}
                {...form.getInputProps('diagnosis')}
              />
              <Textarea
                withAsterisk
                resize="both"
                w="100%"
                label="Examen auxiliar"
                placeholder=""
                required
                key={form.key('auxiliary_test')}
                {...form.getInputProps('auxiliary_test')}
              />
              
              <Textarea
                withAsterisk
                resize="both"
                w="100%"
                label="Tratamiento"
                placeholder="Tratamiento"
                required
                key={form.key('treatment')}
                {...form.getInputProps('treatment')}
              />
              <Textarea
                withAsterisk
                resize="both"
                w="100%"
                label="Preescripcion"
                placeholder=""
                required
                key={form.key('preescription')}
                {...form.getInputProps('preescription')}
              />
              <Textarea
                withAsterisk
                resize="both"
                w="100%"
                label="Observaciones"
                placeholder=""
                required
                key={form.key('observation')}
                {...form.getInputProps('observation')}
              />

          </Stack>
         
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
            <Title order={6}>Crear</Title>{' '}
          </Button>
        </Flex>
      </form>
      ) : (
        <NotFound handleCreateMedicalHistory={handleCreateMedicalHistory} />
      )}
    </Box>
  );
} 
