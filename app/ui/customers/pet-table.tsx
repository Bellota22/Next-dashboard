'use client'
import Image from 'next/image';
import { UpdatePet, DeletePets } from '@/app/ui/mascotas/buttons';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices, fetchFilteredCustomers } from '@/app/lib/data';
import { useState } from 'react';
import { Table, Checkbox } from '@mantine/core';
import Link from 'next/link';

export default function PetsTable({
  query,
  currentPage,
  pets,
}: {
  query: string;
  currentPage: number;
  pets: any;
}) {
  // const invoices = await fetchFilteredInvoices(query, currentPage);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const rows = pets.map((pet: any) => (
    <Table.Tr
      key={pet.id}
      bg={selectedRows.includes(pet.nombre) ? 'var(--mantine-color-blue-light)' : undefined}
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(pet.nombre)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, pet.nombre]
                : selectedRows.filter((nombre) => nombre !== pet.nombre)
            )
          }
        />
      </Table.Td>
      <Table.Td>
      <Link href={`/dashboard/mascotas/${pet.id}/edit`} style={{ cursor: "pointer" }}>
        {pet.pet_nombre}
      </Link>
      </Table.Td>
      <Table.Td>
        <Link href={`/dashboard/mascotas/${pet.id}/edit`} style={{ cursor: "pointer" }}>
        {pet.especie}
        </Link>
      </Table.Td>
      <Table.Td>
        <Link href={`/dashboard/mascotas/${pet.id}/edit`} style={{ cursor: "pointer" }}>
        {pet.raza}
        </Link>
      </Table.Td>
      <Table.Td>
        <Link href={`/dashboard/mascotas/${pet.id}/edit`} style={{ cursor: "pointer" }}>
        {pet.sexo ? "Macho" : "Hembra"}
        </Link>
      </Table.Td>
      <Table.Td>
        <Link href={`/dashboard/mascotas/${pet.id}/edit`} style={{ cursor: "pointer" }}>
        {formatDateToLocal(pet.pet_fecha_nacimiento)}
        </Link>
      </Table.Td>
      <Table.Td>
        <Link href={`/dashboard/mascotas/${pet.id}/edit`} style={{ cursor: "pointer" }}>
        {pet.customer_nombre}  {pet.customer_apellido}
        </Link>
      </Table.Td>
      <Table.Td>
        <Link href={`/dashboard/mascotas/${pet.id}/edit`} style={{ cursor: "pointer" }}>
          Activo
        </Link>
      </Table.Td>
      <Table.Td>
        <Link href={`/dashboard/mascotas/${pet.id}/edit`} style={{ cursor: "pointer" }}>
          {pet.pet_etiquetas}
        </Link>
      </Table.Td>
      <Table.Td>
        <div className="flex justify-end gap-2">
          <UpdatePet id={pet.id} />
          <DeletePets id={pet.id} />
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
                <Table.Th>Especie</Table.Th>
                <Table.Th>Raza</Table.Th>
                <Table.Th>Género</Table.Th>
                <Table.Th>Fecha de nacimiento</Table.Th>
                <Table.Th>Cliente</Table.Th>
                <Table.Th>Estado</Table.Th>
                <Table.Th>Etiquetas</Table.Th>
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
