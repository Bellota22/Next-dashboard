'use client'
import Image from 'next/image';
import { UpdateCustomer, DeleteCustomer } from '@/app/ui/customers/buttons';
import { formatDateToLocal } from '@/app/lib/utils';
import { useState } from 'react';
import { Table, Checkbox, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { Customers } from '@/app/lib/definitions';

export default function CustomerTable({
  query,
  currentPage,
  customers,
}: {
  query: string;
  currentPage: number;
  customers: Customers[];
}) {
  // const invoices = await fetchFilteredInvoices(query, currentPage);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const rows = customers.map((customer: any) => {

    const linkStyle = { cursor: "pointer" };
    const linkProps = {
      component: Link,
      href: `/dashboard/customers/${customer.id}/edit`,
      style: linkStyle,
    };
    return (
    <Table.Tr
      ta="right"
      key={customer.id}
      bg={selectedRows.includes(customer.id) ? 'var(--mantine-color-blue-light)' : undefined}
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(customer.id)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, customer.id]
                : selectedRows.filter((id) => id !== customer.id)
            )
          }
        />
      </Table.Td>
      <Table.Td>
        <Text {...linkProps}>{customer.name}</Text>
      </Table.Td>
      <Table.Td>
        <Text {...linkProps}>{customer.cellphone}</Text>
      </Table.Td>
      <Table.Td>
        <Text {...linkProps}>{customer.email}</Text>
      </Table.Td>
      <Table.Td>
        <Text {...linkProps}>{customer.address}</Text>
      </Table.Td>
      <Table.Td>
        <Text {...linkProps}>{formatDateToLocal(customer.created_date)}</Text>
      </Table.Td>
      <Table.Td>
        <div className="flex justify-end gap-2">
          <UpdateCustomer id={customer.id} />
          <DeleteCustomer id={customer.id} />
        </div>
      </Table.Td>
    </Table.Tr>
  )});


  return (
    <div className="mt-6 flow-root">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th />
                <Table.Th><Title ta="right" order={6}>Nombre</Title></Table.Th>
                <Table.Th><Title ta="right" order={6}>Celular</Title></Table.Th>
                <Table.Th><Title ta="right" order={6}>Email</Title></Table.Th>
                <Table.Th><Title ta="right" order={6}>Dirección</Title></Table.Th>
                <Table.Th><Title ta="right" order={6}>Fecha de registro</Title></Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
    </div>
  );
}
