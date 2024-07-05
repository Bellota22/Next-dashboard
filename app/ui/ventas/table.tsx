'use client'
import Image from 'next/image';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { useState } from 'react';
import { Table, Checkbox, Text, Title, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import {  ProductsForShoppingCart, SaleWithProducts } from '@/app/lib/definitions';

export default function SalesTable({
  query,
  currentPage,
  sales,
}: {
  query: string;
  currentPage: number;
  sales: SaleWithProducts[];
  
}) {
  const [selectedRows, setSelectedRows] = useState<SaleWithProducts[]>([]);
  const theme = useMantineTheme();
  console.log('sales::: ', sales);


  const rows = sales.map((sale) => {
    const isSelected = selectedRows.some((p) => p.id === sale.id);

    const linkStyle = { cursor: "pointer" };
    const linkProps = {
      style: linkStyle,
    };
    return(
    <Table.Tr
      ta="right"
      key={sale.id}
      style={{ backgroundColor: isSelected ? theme.colors.primary[1] : 'transparent' }}
      >
      <Table.Td>
      <Checkbox
            aria-label="Select row"
            checked={isSelected}
            onChange={(event) =>
              setSelectedRows(
                event.currentTarget.checked
                  ? [...selectedRows, sale]
                  : selectedRows.filter((row) => row.id !== sale.id)
              )
            }
          />
      </Table.Td>
      
      <Table.Td>
        <Text {...linkProps}>{sale.customer_name}</Text>
      </Table.Td>
      <Table.Td>
        <Text {...linkProps}>{sale.total_price}</Text>
      </Table.Td>
      <Table.Td>
        {sale.products.map((product: ProductsForShoppingCart) => (
          <Text key={product.id} {...linkProps}>{product.name}: {product.quantity}</Text>
        ))}
      </Table.Td>
      <Table.Td>
        <Text {...linkProps}>{sale.status ? "Completed" : "Pending"}</Text>
      </Table.Td>
      <Table.Td>
        <Text {...linkProps}>{formatDateToLocal(sale.created_date)}</Text>
      </Table.Td>
      <Table.Td w={200}>
        <Text {...linkProps}>{sale.id.substring(0, 8)}</Text>
      </Table.Td>
      <Table.Td>
        <div className="flex justify-end gap-2">
          {/* <UpdateSale id={sale.id} /> */}
        </div>
      </Table.Td>
    </Table.Tr>
  )});

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
                <Table.Th><Title ta="right" order={6}>Customer</Title></Table.Th>
                <Table.Th><Title ta="right" order={6}>Total</Title></Table.Th>
                <Table.Th><Title ta="right" order={6}>Products Sold</Title></Table.Th>
                <Table.Th><Title ta="right" order={6}>Status</Title></Table.Th>
                <Table.Th><Title ta="right" order={6}>Creation Date</Title></Table.Th>
                <Table.Th><Title ta="right" order={6}>Sale ID</Title></Table.Th>
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
