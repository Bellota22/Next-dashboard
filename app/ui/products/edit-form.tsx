'use client';

import Link from 'next/link';
// import { Button } from '@/app/ui/button';
import { createProduct, editProduct } from '@/app/lib/actions';
import { Box, Button, Flex, Group, Image, rem, Stack, Text, TextInput, Title, NativeSelect, Autocomplete, Switch, useMantineTheme, Center, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { IconCheck, IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { Products } from '@/app/lib/definitions';



export default function Form({ product }: { product: Products }) {
  const [checked, setChecked] = useState(product.status);
  const theme = useMantineTheme();
  const userId = '410544b2-4001-4271-9855-fec4b6a6442a';

  const [files, setFiles] = useState<FileWithPath[]>(product.image_url ? [{ path: product.image_url } as FileWithPath] : []);
   const form = useForm<Products>({
    mode: 'uncontrolled',
    initialValues: {
      id: product.id,
      user_id: product.user_id,
      name: product.name,
      brand: product.brand,
      measure_unit: product.measure_unit,
      presentation: product.presentation,
      content: product.content,
      supplier: product.supplier,
      bar_code: product.bar_code,
      category: product.category,
      stock: product.stock,
      buy_price: product.buy_price,
      sell_price: product.sell_price,
      status: product.status,
      image_url: product.image_url,
      created_date: product.created_date,
      updated_date: product.updated_date,     
      
    },
    validate: {
      buy_price: (value) => (value > 0 ? null : 'Precio debe ser mayor a 0'),
      sell_price: (value) => (value > 0 ? null : 'Precio debe ser mayor a 0'),
      stock: (value) => (value > 0 ? null : 'Stock debe ser mayor a 0'),
    },
    
  });
  form.setFieldValue('user_id', userId);
  form.setFieldValue('status', checked);
  form.setFieldValue('image_url', files.length > 0 ? files[0].path || '' : '');

  const previews = files.map((file, index) => {
    const imageUrl = product.image_url || URL.createObjectURL(file);
    return <Image w={200} h={200} key={index} src={imageUrl} alt="image" onLoad={() => URL.revokeObjectURL(imageUrl)} />;
  });


  const handleSubmit = async (values: Products) => {
    console.log('values::: ', values);

    await editProduct(values);
  };

  return (
    <form onSubmit={form.onSubmit((values) => (handleSubmit(values)))}>
      <Flex justify={'space-between'} className="rounded-md bg-gray-50 p-4 md:p-6">
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
                withAsterisk
                label="Categoria" 
                placeholder="M"
                required
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
              key={form.key('image_url')}
              {...form.getInputProps('image_url')}
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
          ):(
            <Stack gap={0} align="flex-end" justify="center" className="cursor-pointer" onClick={() => setFiles([])}>
              <IconX size={25} />
              <Button p={0} radius="md" bg="white" w={200} h={200}>
                {previews}
              </Button>
            </Stack>
          )
        }
        </Box>
      </Flex>
      <Flex className="mt-6 justify-end gap-4">
        <Button
          component={Link} href="/dashboard/products"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Cancel
        </Button>
        <Button type="submit">Editar producto</Button>
      </Flex>
    </form>
  );
} 
