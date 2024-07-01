'use client'
import Image from 'next/image';
import { UpdateProduct, DeleteProduct } from '@/app/ui/products/buttons';
import { formatCurrency } from '@/app/lib/utils';
import { useEffect, useState } from 'react';
import { Table, Checkbox, Button, rem, Switch, useMantineTheme, Indicator, Modal, Box, Stack, Flex, Autocomplete } from '@mantine/core';
import { IconCheck, IconCreditCard, IconMinus, IconPaywall, IconPlus, IconShoppingBag, IconUser, IconUsersGroup, IconX } from '@tabler/icons-react';
import { createSale, updateProductState } from '@/app/lib/actions';
import Link from 'next/link';
import { getCookie, setCookie } from 'cookies-next';
import { useSearchParams } from 'next/navigation';

export default function ProductsTable({
  query,
  currentPage,
  products,
  customers,
  savedSelectedProducts,
  savedQuantities,
}: {
  query: string;
  currentPage: number;
  products: any;
  customers: any;
  savedSelectedProducts: any[];
  savedQuantities: Record<string, number>;
}) {
  // const invoices = await fetchFilteredInvoices(query, currentPage);
  const [selectedProducts, setSelectedProducts] = useState<any[]>(savedSelectedProducts);
  const [quantities, setQuantities] = useState<Record<string, number>>(savedQuantities);
  const theme = useMantineTheme();
  const [switchStates, setSwitchStates] = useState<Record<string, boolean>>(
    Object.fromEntries(products.map((product: any) => [product.id, product.estado]))
  );

  const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  useEffect(() => {
    const fromModal = getCookie('fromModal') === 'true';
    const newCustomer = getCookie('customer') || '';

    if (fromModal) {
      setSlowTransitionOpened(true);
      setInputValue(JSON.parse(newCustomer).nombre);
    }

    setCookie('fromModal', 'false'); // Reset the cookie
    setCookie('customer', ''); // Reset the cookie
    setCookie('id', ''); // Reset the
  }, []);
  
  useEffect(() => {
    setCookie('selectedProducts', JSON.stringify(selectedProducts));
    setCookie('quantities', JSON.stringify(quantities));
  }, [selectedProducts, quantities]);

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


  const handleCheckboxChange = (product: any, isChecked: boolean) => {
    setSelectedProducts((prevSelected) =>
      isChecked
        ? [...prevSelected, product]
        : prevSelected.filter((p) => p.id !== product.id)
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
      bg={selectedProducts.some((p) => p.id === product.id) ? theme.colors.primary[1]: undefined}
    >
      <Table.Td>
      <Checkbox
          aria-label="Select row"
          checked={selectedProducts.some((p) => p.id === product.id)}
          onChange={(event) =>
            handleCheckboxChange(product, event.currentTarget.checked)
          }
          variant='outline'
          color='primary' 
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
        {product.precio_venta}
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


  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.filter((p) => p.id !== productId)
    );
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      delete newQuantities[productId];
      return newQuantities;
    });
  };
  const handleQuantityChange = (productId: string, amount: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.min(Math.max(0, (prevQuantities[productId] || 0) + amount), products.find((p: any) => p.id === productId)?.stock || 0),
    }));
  };

  const cartItems = selectedProducts.map((product) => (
    <Box key={product.id} className="flex items-center justify-between p-2 border-b gap-4">
      <IconX size={14} onClick={() => handleRemoveProduct(product.id)} style={{ cursor: "pointer" }} />      <Image src={product.imagen_url} alt={product.nombre} width={50} height={50} />
      <Box className="flex-1 flex flex-col justify-start mx-2">
        <Box className="truncate text-gray-600">{product.nombre}</Box>
        <Box className="text-sm font-semibold">S/{product.precio_venta}</Box>
      </Box>
      <Box className="flex items-center space-x-2">
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
      <Box w={60}>
        S/{(product.precio_venta * (quantities[product.id] || 0)).toFixed(2)}
      </Box>
    </Box>
  ));

  const total = selectedProducts.reduce((acc, product) => acc + product.precio_venta * (quantities[product.id] || 0), 0);

  const handleCustomerChange = (value: string) => {
    setInputValue(value);
  };

  const handleRegisterSale = async () => {
    const customer = customers.find((c:any) => `${c.nombre} ${c.apellido}` === inputValue);
    const userId = "410544b2-4001-4271-9855-fec4b6a6442a"; // Supón que tienes el userId almacenado en una cookie

    if (!customer) {
      alert('Please select a valid customer');
      return;
    }

    const productsToSell = selectedProducts.map((product) => ({
      id: product.id,
      cantidad: quantities[product.id],
      precio_venta: product.precio_venta,
    }));

    try {
      const ventaId = await createSale(userId, customer.id, productsToSell);
      alert('Sale registered successfully');
      //reset cart
      setSelectedProducts([]);
      setQuantities({});
      setSlowTransitionOpened(false);
      
      
    } catch (error) {
      console.error('Failed to register sale:', error);
      alert('Failed to register sale');
    }
  };
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
              <Flex justify={'space-between'} align={'flex-end'}>
                <Autocomplete
                  required
                  label="Cliente"
                  placeholder="Buscar cliente..."
                  data={customers.map((customer: any) => ({ value: `${customer.nombre} ${customer.apellido}`, label: `${customer.nombre} ${customer.apellido}` }))}
                  limit={5}
                  comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                  value={inputValue}
                  onChange={handleCustomerChange}
                />

                <Button component={Link} href="/dashboard/customers/create?fromModal=true"  variant="light" rightSection={<IconUsersGroup size={15} />} >
                  Agregar cliente
                </Button>

              </Flex>
              <Box className="space-y-4">
                {cartItems.length > 0 ? cartItems : <Box>No hay productos en el carrito</Box>}
              </Box>
              <Flex justify="flex-end" className="mt-4">
                <Box mr="auto" className="font-semibold">Total: {total}</Box>
                <Button rightSection={<IconCreditCard size={15} />} onClick={handleRegisterSale}>Registrar Venta</Button>
                </Flex>
            </Stack>
          </Modal>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
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
                <Table.Th>Cod. de barras</Table.Th>
                <Table.Th>Nombre</Table.Th>
                <Table.Th>Marca</Table.Th>
                <Table.Th>Precio venta</Table.Th>
                <Table.Th>Categoria</Table.Th>
                <Table.Th>Stock Disponible</Table.Th>
                <Table.Th>Estado</Table.Th>
                <Table.Th className="flex justify-end" >
                
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
