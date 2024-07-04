'use client'
import { UpdateProduct, DeleteProduct } from '@/app/ui/products/buttons';
import { formatCurrency } from '@/app/lib/utils';
import { useEffect, useState } from 'react';
import { Table, Checkbox, Button, rem, Switch, useMantineTheme, Indicator, Modal, Box, Stack, Flex, Autocomplete, Text, Title, Image } from '@mantine/core';
import { IconCheck, IconCreditCard, IconImageInPicture, IconMinus, IconPaywall, IconPhotoOff, IconPlus, IconShoppingBag, IconUser, IconUsersGroup, IconX } from '@tabler/icons-react';
import { createSale, updateProductState } from '@/app/lib/actions';
import Link from 'next/link';
import { getCookie, setCookie } from 'cookies-next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Customers, Products, ProductToSell } from '@/app/lib/definitions';
import { products } from '@/app/lib/placeholder-data';
import { useDebouncedCallback } from 'use-debounce';
import { getFilteredCustomers } from '@/app/lib/data';
import { get } from 'http';




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
  products: Products[];
  customers: Customers[];
  savedSelectedProducts: Products[];
  savedQuantities: Record<string, number>;
}) {
  const userId = "410544b2-4001-4271-9855-fec4b6a6442a"; // Supón que tienes el userId almacenado en una cookie
  const theme = useMantineTheme();
  const [selectedProducts, setSelectedProducts] = useState<Products[]>(savedSelectedProducts);
  const [quantities, setQuantities] = useState<Record<string, number>>(savedQuantities);
  
  const [switchStates, setSwitchStates] = useState<Record<string, boolean>>(
    Object.fromEntries(products.map((product: Products) => [product.id, product.status]))
  );

  const [slowTransitionOpened, setSlowTransitionOpened] = useState(false);
  const [inputValue, setInputValue] = useState<string>(getCookie('customer') || '');

  useEffect(() => {
    const fromModal = getCookie('fromModal') === 'true';

    if (fromModal) {
      setSlowTransitionOpened(true);
    }

    setCookie('fromModal', 'false'); 
    setCookie('customer', ''); 
    setCookie('id', '');
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


  const handleCheckboxChange = (product: Products, isChecked: boolean) => {
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
      [productId]: Math.min(Math.max(0, (prevQuantities[productId] || 0) + amount), products.find((p: Products) => p.id === productId)?.stock || 0),
    }));
  };

  const cartItems = selectedProducts.map((product) => (
    <Box key={product.id} className="flex items-center justify-between p-2 border-b gap-4">
      <IconX size={14} onClick={() => handleRemoveProduct(product.id)} style={{ cursor: "pointer" }} />     
      <Box className="flex-1 flex flex-col justify-start mx-2">
        <Box className="truncate text-gray-600">{product.name}</Box>
        <Box className="text-sm font-semibold">S/{product.sell_price}</Box>
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
          disabled={quantities[product.id] === product.stock}
        >
          <IconPlus size={14} />
        </Button>
      </Box>
      <Box w={60}>
        S/{(product.sell_price * (quantities[product.id] || 0)).toFixed(2)}
      </Box>
    </Box>
  ));

  const total = selectedProducts.reduce((acc, product) => acc + product.sell_price * (quantities[product.id] || 0), 0);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('queryCustomer', term);
    } else {
      params.delete('queryCustomer');
    }
    replace(`${pathname}?${params.toString()}`);

  }, 300);


  const handleCustomerChange = (value: string) => {
    handleSearch(value);
    setInputValue(value);

  };

  const handleRegisterSale = async () => {
    const customer = customers.find((c: Customers) => `${c.name}` === inputValue);

    if (!customer) {
      alert('Please select a valid customer');
      return;
    }

    const productsToSell: ProductToSell[] = selectedProducts.map((product) => ({
      quantity: quantities[product.id],
      ...product
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

  

  const rows = products.map((product: Products) => {
    const isSelected = selectedProducts.some((p) => p.id === product.id);
    const linkStyle = { cursor: "pointer" };
    const linkProps = {
      component: Link,
      href: `/dashboard/products/${product.id}/edit`,
      style: linkStyle,
    };
    
    return (
      <Table.Tr
        ta="right"
        key={product.id}
        bg={isSelected ? theme.colors.primary[1] : undefined}
      >
        <Table.Td>
          <Checkbox
            color="primary"
            variant="outline"
            aria-label="Select row"
            checked={isSelected}
            onChange={(event) => handleCheckboxChange(product, event.currentTarget.checked)}
          />
        </Table.Td> 
        <Table.Td>
          <Text {...linkProps}>
            {
              product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  w={50}
                  h={50}
                  radius="md"
                />
              ) : (
                <IconPhotoOff size={50} />
              )
            }
          </Text>
        </Table.Td>
        <Table.Td>
          <Text {...linkProps}>{product.name}</Text>
        </Table.Td>
        <Table.Td>
          <Text {...linkProps}>{product.brand}</Text>
        </Table.Td>
        <Table.Td>
          <Text {...linkProps}>{product.sell_price}</Text>
        </Table.Td>
        <Table.Td>
          <Text {...linkProps}>{product.buy_price}</Text>
        </Table.Td>
        <Table.Td>
          <Text {...linkProps}>{product.category}</Text>
        </Table.Td>
        <Table.Td>
          <Text {...linkProps}>{product.stock}</Text>
        </Table.Td>
        <Table.Td>
          <Switch
            className="flex items-center justify-end"
            checked={switchStates[product.id]}
            onChange={() => handleSwitchChange(product.id)}
            color="green"
            size="sm"
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
    );
  });
  
  const handlingShoopingCart = () => {
    setSlowTransitionOpened(true);
    setCookie('isModalOpened', 'true')
  }

  const handleCloseModal = () => {
    setSlowTransitionOpened(false);
    setCookie('isModalOpened', 'false')
  }
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <Modal
            opened={slowTransitionOpened}
            onClose={handleCloseModal}
            title="Carrito"
            size="lg"
            transitionProps={{ transition: 'rotate-left' }}
          >
            <Stack>
              <Flex justify={'space-between'} align={'flex-end'}>
                <Autocomplete
                  withAsterisk
                  required
                  label="Cliente"
                  placeholder="Buscar cliente..."
                  data={customers.map((customer) => ({ value: `${customer.id}`, label: `${customer.name}` }))}
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
                      onClick={handlingShoopingCart}
                      color="red"
                      className="cursor-pointer transition ease-in-out delay-120 hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 duration-150"
                    >
                    <IconShoppingBag className="w-6 h-6 "  />
                  </Indicator>
                </Table.Th>
                <Table.Th aria-label="image" />

                <Table.Th><Title ta="right" order={6}>Nombre</Title></Table.Th>
                <Table.Th><Title ta="right" order={6}>Marca</Title></Table.Th>
                <Table.Th><Title ta="right" order={6}>Precio Venta</Title></Table.Th>
                <Table.Th><Title ta="right" order={6}>Precio compra</Title></Table.Th>
                <Table.Th><Title ta="right" order={6}>Categoria</Title></Table.Th>
                <Table.Th><Title ta="right" order={6}>Stock</Title></Table.Th>
                <Table.Th><Title ta="right" order={6}>Status</Title></Table.Th>
                
                <Table.Th aria-label="actionables" className="flex justify-end" />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
