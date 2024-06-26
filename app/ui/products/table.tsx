'use client'
import Image from 'next/image';
import { UpdateProduct, DeleteProduct } from '@/app/ui/products/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices, fetchFilteredCustomers } from '@/app/lib/data';
import { useState } from 'react';
import { Table, Checkbox, Chip, rem, Switch, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import { IconCheck, IconX } from '@tabler/icons-react';
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
      await updateProductState(productId, newState); // Actualiza el estado en la base de datos
    } catch (error) {
      console.error('Failed to update product state:', error);
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
          checked={selectedRows.includes(product.nombre)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, product.nombre]
                : selectedRows.filter((nombre) => nombre !== product.nombre)
            )
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
        11
        </Link>
      </Table.Td>
      <Table.Td>
        <Link href={`/dashboard/products/${product.id}/edit`} style={{ cursor: "pointer" }}>
        5
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


  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {/* {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      <p>{invoice.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.email}</p>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))} */}
          </div>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th />
                <Table.Th>Cod. de barras</Table.Th>
                <Table.Th>Nombre</Table.Th>
                <Table.Th>Marca</Table.Th>
                <Table.Th>Proveedor</Table.Th>
                <Table.Th>Categoria</Table.Th>
                <Table.Th>Stock Contable</Table.Th>
                <Table.Th>Stock Disponible</Table.Th>
                <Table.Th>Estado</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
