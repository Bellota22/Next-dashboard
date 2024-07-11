'use client';

import Link from 'next/link';
// import { Button } from '@/app/ui/button';
import { createProduct } from '@/app/lib/actions';
import { Box, Button, Flex, Group, Image, rem, Stack, Text, TextInput, Title, NativeSelect, Autocomplete, Switch, useMantineTheme, Center, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { IconCheck, IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { Products } from '@/app/lib/definitions';
import { useRouter } from 'next/navigation';

export default function Form() {
  const [checked, setChecked] = useState(true);
  const theme = useMantineTheme();
   

  const router = useRouter();
  const [files, setFiles] = useState<FileWithPath[]>([]);
   const form = useForm<Products>({
    mode: 'uncontrolled',
    initialValues: {
      id: '',
      user_id: '',
      name: '',
      brand: '',
      measure_unit: '',
      presentation: '',
      content: '',
      supplier: '',
      bar_code: '',
      category: '',
      stock: 0,
      buy_price: 0,
      sell_price: 0,
      status: true,
      image_url: '',
      created_date: new Date(),
      updated_date: new Date(),
    },
    validate: {
      buy_price: (value) => (value > 0 ? null : 'Precio debe ser mayor a 0'),
      sell_price: (value) => (value > 0 ? null : 'Precio debe ser mayor a 0'),
      stock: (value) => (value > 0 ? null : 'Stock debe ser mayor a 0'),
      category: (value) => (value.length > 0 ? null : 'Categoria es requerida'),
    },
    
  });
  form.setFieldValue('status', checked);
  form.setFieldValue('image_url', files.length > 0 ? files[0].path || '' : '');

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return <Image w={200} h={200} key={index} src={imageUrl} alt="image" onLoad={() => URL.revokeObjectURL(imageUrl)} />;
  });

  const handleSubmit = async (values: Products) => {
    console.log('values::: ', values);
    
    await createProduct(values);
  };

  return (
    <form onSubmit={form.onSubmit((values) => (handleSubmit(values)))}>
      <Flex justify={'space-between'} className="p-4 md:p-6">
        <Stack>
          <Flex mb={4} gap={8}>
              <TextInput
                withAsterisk
                label="Nombre"
                placeholder="Producto 2"
                required
                key={form.key('name')}
                {...form.getInputProps('name')}
              />
              <TextInput
                withAsterisk
                label="Marca"
                placeholder="Lab 2"
                required
                key={form.key('brand')}
                {...form.getInputProps('brand')}
              />
              <TextInput
                withAsterisk
                label="Unidad de medida" 
                placeholder="Kg" 
                required
                key={form.key('measure_unit')}
                {...form.getInputProps('measure_unit')}
              />
              <TextInput
                required
                label="Proveedor"
                placeholder="Saa"               
                key={form.key('supplier')}
                {...form.getInputProps('supplier')}
              />
              <TextInput
                required
                label="Presentación"
                placeholder="Blister"               
                key={form.key('presentation')}
                {...form.getInputProps('presentation')}
              />
          </Flex>
          <Flex mb={4} gap={8}>
              <TextInput
                withAsterisk
                label="Contenido"
                placeholder="Pastillas de 500mg"
                required
                key={form.key('content')}
                {...form.getInputProps('content')}
              />
              <TextInput
                withAsterisk
                label="Código de barras"
                placeholder="123"
                required
                key={form.key('bar_code')}
                {...form.getInputProps('bar_code')}
              />
            
              <NumberInput
                withAsterisk
                label="Stock"
                placeholder="155"
                required
                hideControls 
                key={form.key('stock')}
                {...form.getInputProps('stock')}
              />
              <NativeSelect
                required
                withAsterisk
                label="Categoria" 
                placeholder="M"
                data={['Accesorios', 'Alimentos', 'Bocaditos', 'Camas', 'Colchonetas', 'Maletines', 'Perfumeria', 'Ropa', 'Transportadores']}
                key={form.key('category')}
                {...form.getInputProps('category')}
              />
          </Flex>
          <Flex mb={4} gap={8} align="end">
              <NumberInput
                withAsterisk
                label="Precio de compra"
                placeholder="16"
                required
                hideControls 
                key={form.key('buy_price')}
                {...form.getInputProps('buy_price')}
              />
              <NumberInput
                withAsterisk
                label="Precio de venta"
                placeholder="12"
                required
                hideControls 
                key={form.key('sell_price')}
                {...form.getInputProps('sell_price')}
              />
              <Switch
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
                onLabel="ACTIVE" offLabel="DISABLED"
                color='green'
                size='xl'
                thumbIcon={
                  checked ? (
                    <IconCheck
                      style={{ width: rem(12), height: rem(12) }}
                      color={theme.colors.green[6]}
                      stroke={3}
                    />
                  ) : (
                    <IconX
                      style={{ width: rem(12), height: rem(12) }}
                      color={theme.colors.red[6]}
                      stroke={3}
                    />
                  )
                }
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
          <Title order={6}>Crear</Title>{' '}
        </Button>
      </Flex>
    </form>
  );
} 
