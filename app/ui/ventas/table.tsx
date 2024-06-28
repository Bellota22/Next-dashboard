'use client'
import Image from 'next/image';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { useState } from 'react';
import { Table, Checkbox, Text } from '@mantine/core';
import Link from 'next/link';

export default function SalesTable({
  query,
  currentPage,
  sells,
  customers,
  products
}: {
  query: string;
  currentPage: number;
  sells: any;
  customers: any;
  products: any;
}) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const getCustomerName = (customerId: string) => {
    const customer = customers.find((customer: any) => customer.id === customerId);
    return customer ? `${customer.nombre} ${customer.apellido}` : 'Unknown';
  };

  const getProductName = (productId: string) => {
    const product = products.find((product: any) => product.id === productId);
    return product ? product.nombre : 'Unknown';
  };

  const rows = sells.map((sale: any) => (
    <Table.Tr
      key={sale.venta.id}
      bg={selectedRows.includes(sale.venta.id) ? 'var(--mantine-color-blue-light)' : undefined}
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(sale.venta.id)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, sale.venta.id]
                : selectedRows.filter((id) => id !== sale.venta.id)
            )
          }
        />
      </Table.Td>
      
      <Table.Td>
        <Link href={`/dashboard/sales/${sale.venta.id}/edit`} style={{ cursor: "pointer" }}>
          {getCustomerName(sale.venta.customer_id)}
        </Link>
      </Table.Td>
      <Table.Td>
        <Link href={`/dashboard/sales/${sale.venta.id}/edit`} style={{ cursor: "pointer" }}>
          {formatCurrency(sale.venta.total)}
        </Link>
      </Table.Td>
      <Table.Td>
        {sale.productos.map((producto: any) => (
          <div key={producto.producto_id}>
            {getProductName(producto.producto_id)}: {producto.cantidad}
          </div>
        ))}
      </Table.Td>
      <Table.Td>
        <Link href={`/dashboard/sales/${sale.venta.id}/edit`} style={{ cursor: "pointer" }}>
          {sale.venta.estado ? "Completed" : "Pending"}
        </Link>
      </Table.Td>
      <Table.Td>
        <Link href={`/dashboard/sales/${sale.venta.id}/edit`} style={{ cursor: "pointer" }}>
          {formatDateToLocal(sale.venta.fecha_creacion)}
        </Link>
      </Table.Td>
      <Table.Td w={200}>
        <Link href={`/dashboard/sales/${sale.venta.id}/edit`} style={{ cursor: "pointer" }}>
        {sale.venta.id.substring(0, 8)}

        </Link>
      </Table.Td>
      <Table.Td>
        <div className="flex justify-end gap-2">
          {/* <UpdateSale id={sale.venta.id} /> */}
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
          </div>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th />
                <Table.Th>Customer</Table.Th>
                <Table.Th>Total</Table.Th>
                <Table.Th>Products Sold</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Creation Date</Table.Th>
                <Table.Th>Sale ID</Table.Th>
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
