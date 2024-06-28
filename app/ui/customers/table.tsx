'use client'
import Image from 'next/image';
import { UpdateCustomer, DeleteCustomer } from '@/app/ui/customers/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices, fetchFilteredCustomers } from '@/app/lib/data';
import { useState } from 'react';
import { Table, Checkbox } from '@mantine/core';
import Link from 'next/link';

export default function CustomerTable({
  query,
  currentPage,
  users,
}: {
  query: string;
  currentPage: number;
  users: any;
}) {
  // const invoices = await fetchFilteredInvoices(query, currentPage);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const rows = users.map((user: any) => (
    <Table.Tr
      key={user.id}
      bg={selectedRows.includes(user.nombre) ? 'var(--mantine-color-blue-light)' : undefined}
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(user.nombre)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, user.nombre]
                : selectedRows.filter((nombre) => nombre !== user.nombre)
            )
          }
        />
      </Table.Td>
      <Table.Td>
      <Link href={`/dashboard/customers/${user.id}/edit`} style={{ cursor: "pointer" }}>
        {user.nombre} {user.apellido}
      </Link>
      </Table.Td>
      <Table.Td>
        <Link href={`/dashboard/customers/${user.id}/edit`} style={{ cursor: "pointer" }}>
        {user.celular}
        </Link>
      </Table.Td>
      <Table.Td>
        <Link href={`/dashboard/customers/${user.id}/edit`} style={{ cursor: "pointer" }}>
        {user.email}
        </Link>
      </Table.Td>
      <Table.Td>
        <Link href={`/dashboard/customers/${user.id}/edit`} style={{ cursor: "pointer" }}>
        {user.direccion}
        </Link>
      </Table.Td>
      <Table.Td>
        <Link href={`/dashboard/customers/${user.id}/edit`} style={{ cursor: "pointer" }}>
        {formatDateToLocal(user.fecha_creacion)}
        </Link>
      </Table.Td>
      <Table.Td>
        <div className="flex justify-end gap-2">
          <UpdateCustomer id={user.id} />
          <DeleteCustomer id={user.id} />
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
                <Table.Th>Nombre</Table.Th>
                <Table.Th>Celular</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Dirección</Table.Th>
                <Table.Th>Fecha de registro</Table.Th>
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
