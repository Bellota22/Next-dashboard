'use client'
import Image from 'next/image';
import { UpdateProduct, DeleteProduct } from '@/app/ui/products/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices, fetchFilteredCustomers } from '@/app/lib/data';
import { useState } from 'react';
import { Table, Checkbox, Button, rem, Switch, useMantineTheme, Indicator, Modal, Box, Stack, Flex } from '@mantine/core';
import Link from 'next/link';
import { IconCheck, IconCreditCard, IconMinus, IconPaywall, IconPlus, IconShoppingBag, IconX } from '@tabler/icons-react';
import { updateProductState } from '@/app/lib/actions';

export default function ProductsTable({
  query,
  currentPage,
  products,
}: {
  query: string;
  currentPage: number;
  products: any;
}) {
  // const invoices = await fetchFilteredInvoices(query, currentPage);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const theme = useMantineTheme();
  const [switchStates, setSwitchStates] = useState<Record<string, boolean>>(
    Object.fromEntries(products.map((product: any) => [product.id, product.estado]))
  );
  const handleSwitchChange = async (productId: string) => {
    const newState = !switchStates[productId];
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [productId]: newState,
    }));
    try {
      await updateProductState(productId, newState);
    } catch (error) {
      console.error('Failed to update product state:', error);
    }
  };

  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  const handleCheckboxChange = (product: any, isChecked: boolean) => {
    setSelectedProducts((prevSelected) =>
      isChecked
        ? [...prevSelected, product]
        : prevSelected.filter((p) => p.id !== product.id)
    );
    setSelectedRows((prevSelected) =>
      isChecked
        ? [...prevSelected, product.nombre]
        : prevSelected.filter((p) => p !== product
        .nombre)
    );
    if (isChecked) {
      setQuantities((prevQuantities) => ({ ...prevQuantities, [product.id]: 0 }));
    } else {
      setQuantities((prevQuantities) => {
        const newQuantities = { ...prevQuantities };
        delete newQuantities[product.id];
        return newQuantities;
      });
    }
  };

  const rows = products.map((product: any) => (
    <Table.Tr
      key={product.id}
      bg={selectedRows.includes(product.nombre) ? 'var(--mantine-color-blue-light)' : undefined}
    >
      <Table.Td>
      <Checkbox
          aria-label="Select row"
          checked={selectedProducts.some((p) => p.id === product.id)}
          onChange={(event) =>
            handleCheckboxChange(product, event.currentTarget.checked)
          }
        />
      </Table.Td>
      <Table.Td>
      <Link href={`/dashboard/products/${product.id}/edit`} style={{ cursor: "pointer" }}>
        {product.codigo_barras}
      </Link>
      </Table.Td>
      <Table.Td>
        <Link href={`/dashboard/products/${product.id}/edit`} style={{ cursor: "pointer" }}>
        {product.nombre}
        </Link>
      </Table.Td>
      <Table.Td>
        <Link href={`/dashboard/products/${product.id}/edit`} style={{ cursor: "pointer" }}>
        {product.marca}
        </Link>
      </Table.Td>
      <Table.Td>
        <Link href={`/dashboard/products/${product.id}/edit`} style={{ cursor: "pointer" }}>
        {product.proveedor}
        </Link>
      </Table.Td>
      <Table.Td>
        <Link href={`/dashboard/products/${product.id}/edit`} style={{ cursor: "pointer" }}>
        {product.categoria}
        </Link>
      </Table.Td>
      <Table.Td>
        <Link href={`/dashboard/products/${product.id}/edit`} style={{ cursor: "pointer" }}>
        {product.stock}
        </Link>
      </Table.Td>
      <Table.Td>
      <Switch
          checked={switchStates[product.id]}
          onChange={() => handleSwitchChange(product.id)}
          color='green'
          size='sm'
          thumbIcon={
            switchStates[product.id] ? (
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
      </Table.Td>
      <Table.Td>
        <div className="flex justify-end gap-2">
          <UpdateProduct id={product.id} />
          <DeleteProduct id={product.id} />
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);


  const handleQuantityChange = (productId: string, amount: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.min(Math.max(0, (prevQuantities[productId] || 0) + amount), products.find((p: any) => p.id === productId)?.stock || 0),
    }));
  };

  const cartItems = selectedProducts.map((product) => (
    <Box key={product.id} className="flex items-center justify-between p-2 border-b">
      <Image src={product.imagen_url} alt={product.nombre} width={50} height={50} />
      <Box className="ml-4">
        <Box>{product.nombre}</Box>
        <Box>{formatCurrency(product.precio_venta)}</Box>
      </Box>
      <Box className="flex items-center">
      <Button
          size="xs"
          variant="light"
          onClick={() => handleQuantityChange(product.id, -1)}
          disabled={product.stock === 0}
        >
          <IconMinus size={14} />
        </Button>
        <span className="mx-2">{quantities[product.id] || 0}</span>
        <Button
          size="xs"
          variant="light"
          onClick={() => handleQuantityChange(product.id, 1)}
          disabled={product.quantity === product.stock}
        >
          <IconPlus size={14} />
        </Button>
      </Box>
      <Box>
      {formatCurrency((product.precio_venta * (quantities[product.id] || 0)))}
      </Box>
    </Box>
  ));
  const total = selectedProducts.reduce((acc, product) => acc + product.precio_venta * (quantities[product.id] || 0), 0);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
        <Modal
            opened={slowTransitionOpened}
            onClose={() => setSlowTransitionOpened(false)}
            title="Carrito"
            size="lg"
            transitionProps={{ transition: 'rotate-left' }}
          >
            <Stack>
              <Box className="space-y-4">
                {cartItems.length > 0 ? cartItems : <Box>No hay productos en el carrito</Box>}
              </Box>
              <Flex justify="flex-end" className="mt-4">
                <Box mr="auto">Total: {formatCurrency(total)}</Box>
                <Button rightSection={<IconCreditCard />}>Ir a pagar</Button>
              </Flex>
            </Stack>
          </Modal>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th />
                <Table.Th>Cod. de barras</Table.Th>
                <Table.Th>Nombre</Table.Th>
                <Table.Th>Marca</Table.Th>
                <Table.Th>Proveedor</Table.Th>
                <Table.Th>Categoria</Table.Th>
                <Table.Th>Stock Disponible</Table.Th>
                <Table.Th>Estado</Table.Th>
                <Table.Th className="flex justify-end" >
                <Indicator
                    size={12}
                    label={selectedProducts.length.toString()}
                    inline
                    onClick={() => setSlowTransitionOpened(true)}
                    color="red"
                    className="cursor-pointer transition ease-in-out delay-120 hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 duration-150"
                  >
                  <IconShoppingBag className="w-6 h-6 "  />
                </Indicator>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
