'use client'
import Image from 'next/image';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { useState } from 'react';
import { Table, Checkbox, Text } from '@mantine/core';
import Link from 'next/link';
import { Customers, ProductSold, SaleWithProducts } from '@/app/lib/definitions';

export default function SalesTable({
  query,
  currentPage,
  sales,
}: {
  query: string;
  currentPage: number;
  sales: SaleWithProducts[];
  
}) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);


  const rows = sales.map((sale) => (
    <Table.Tr
      key={sale.id}
      bg={selectedRows.includes(sale.id) ? 'var(--mantine-color-blue-light)' : undefined}
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(sale.id)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, sale.id]
                : selectedRows.filter((id) => id !== sale.id)
            )
          }
        />
      </Table.Td>
      
      <Table.Td>
        <Link href={`/dashboard/sales/${sale.id}/edit`} style={{ cursor: "pointer" }}>
          {sale.customer_name}
        </Link>
      </Table.Td>
      <Table.Td>
        <Link href={`/dashboard/sales/${sale.id}/edit`} style={{ cursor: "pointer" }}>
          {formatCurrency(sale.total_price)}
        </Link>
      </Table.Td>
      <Table.Td>
        {sale.products.map((product: ProductSold) => (
          <div key={product.product_id}>
            {product.product_name}: {product.quantity}
          </div>
        ))}
      </Table.Td>
      <Table.Td>
        <Link href={`/dashboard/sales/${sale.id}/edit`} style={{ cursor: "pointer" }}>
          {sale.status ? "Completed" : "Pending"}
        </Link>
      </Table.Td>
      <Table.Td>
        <Link href={`/dashboard/sales/${sale.id}/edit`} style={{ cursor: "pointer" }}>
          {formatDateToLocal(sale.created_date)}
        </Link>
      </Table.Td>
      <Table.Td w={200}>
        <Link href={`/dashboard/sales/${sale.id}/edit`} style={{ cursor: "pointer" }}>
          {sale.id.substring(0, 8)}
        </Link>
      </Table.Td>
      <Table.Td>
        <div className="flex justify-end gap-2">
          {/* <UpdateSale id={sale.id} /> */}
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
