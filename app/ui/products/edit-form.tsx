'use client';

import Link from 'next/link';
// import { Button } from '@/app/ui/button';
import { updateProduct } from '@/app/lib/actions';
import { Box, Button, Flex, Group, Image, Checkbox, CheckboxProps , rem, Stack, Text, TextInput, Title, NativeSelect, Autocomplete, Switch, useMantineTheme, Center, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { useState } from 'react';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { IconCheck, IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { ProductsShowTable } from '@/app/lib/definitions';

interface FormProps {
  id: string;
  product: ProductsShowTable;
}

export default function Form({ id, product }: FormProps) {
  const [checked, setChecked] = useState(product.estado);
  const theme = useMantineTheme();

  const [files, setFiles] = useState<FileWithPath[]>([]);
   const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      user_id: product.user_id,
      codigo_barras: product.codigo_barras,
      nombre: product.nombre,
      marca: product.marca,
      unidad_medida: product.unidad_medida,
      proveedor: product.proveedor,
      categoria: product.categoria,
      subcategoria: product.subcategoria,
      presentacion: product.presentacion,
      contenido: product.contenido,
      precio_compra: product.precio_compra,
      precio_venta: product.precio_venta,
      stock: product.stock,
      imagen_url: product.imagen_url || '',
      estado: true,
    },
    validate: {
      precio_compra: (value) => (value > 0 ? null : 'Precio debe ser mayor a 0'),
      precio_venta: (value) => (value > 0 ? null : 'Precio debe ser mayor a 0'),
      stock: (value) => (value > 0 ? null : 'Stock debe ser mayor a 0'),
      
    },
    
  });
  form.setFieldValue('user_id', '410544b2-4001-4271-9855-fec4b6a6442a');
  form.setFieldValue('estado', checked);
  form.setFieldValue('imagen_url', files.length > 0 ? files[0].path || '' : '');

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return <Image w={200} h={200} key={index} src={imageUrl} alt="image" onLoad={() => URL.revokeObjectURL(imageUrl)} />;
  });


  const handleSubmit = async (values: any) => {
    try {
      await updateProduct(id, values);
      window.location.href = '/dashboard/products'; // Maneja la redirección aquí
    } catch (err) {
      console.error('Error creating product:', err);
      throw new Error('Error creating product');
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex justify={'space-between'} className="rounded-md bg-gray-50 p-4 md:p-6">
        <Stack>
          <Flex mb={4} gap={8}>
              <TextInput
                withAsterisk
                label="Nombre"
                placeholder="Producto 2"
                required
                key={form.key('nombre')}
                {...form.getInputProps('nombre')}
              />
              <TextInput
                withAsterisk
                label="Marca"
                placeholder="Lab 2"
                required
                key={form.key('marca')}
                {...form.getInputProps('marca')}
              />
              <TextInput
                withAsterisk
                label="Unidad de medida" 
                placeholder="Kg" 
                required
                key={form.key('unidad_medida')}
                {...form.getInputProps('unidad_medida')}
              />
              <TextInput
                required
                label="Proveedor"
                placeholder="Saa"               
                key={form.key('proveedor')}
                {...form.getInputProps('proveedor')}
              />
              <TextInput
                required
                label="Presentación"
                placeholder="Blister"               
                key={form.key('presentacion')}
                {...form.getInputProps('presentacion')}
              />
          </Flex>
          <Flex mb={4} gap={8}>
              <TextInput
                withAsterisk
                label="Contenido"
                placeholder="Pastillas de 500mg"
                required
                key={form.key('contenido')}
                {...form.getInputProps('contenido')}
              />
              <TextInput
                withAsterisk
                label="Código de barras"
                placeholder="123"
                required
                key={form.key('codigo_barras')}
                {...form.getInputProps('codigo_barras')}
              />
            
              
              {/* <NativeSelect
                required
                label="Sub categoria"
                placeholder="Saa"               
                data={['Semanal', 'Quincenal', 'Cada 3 semanas', 'Mensual']}
                key={form.key('subCategoria')}
                {...form.getInputProps('subCategoria')}
              /> */}
              
              <NumberInput
                withAsterisk
                label="Máximo de stock"
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
                key={form.key('categoria')}
                {...form.getInputProps('categoria')}
              />
          </Flex>
          <Flex mb={4} gap={8} align="end">
              <NumberInput
                withAsterisk
                label="Precio de compra"
                placeholder="16"
                required
                hideControls 
                key={form.key('precio_compra')}
                {...form.getInputProps('precio_compra')}
              />
              <NumberInput
                withAsterisk
                label="Precio de venta"
                placeholder="12"
                required
                hideControls 
                key={form.key('precio_venta')}
                {...form.getInputProps('precio_venta')}
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
      <Flex className="mt-6 justify-end gap-4">
        <Link
          href="/dashboard/products"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Editar producto</Button>
      </Flex>
    </form>
  );
} 
