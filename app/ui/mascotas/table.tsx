'use client'
import Image from 'next/image';
import { UpdatePet, DeletePets } from '@/app/ui/mascotas/buttons';
import { formatDateToLocal,  } from '@/app/lib/utils';
import { useState } from 'react';
import { Table, Checkbox, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { PetWithCustomer } from '@/app/lib/definitions';

export default function PetsTable({
  query,
  currentPage,
  pets,
}: {
  query: string;
  currentPage: number;
  pets: PetWithCustomer[];
}) {
  // const invoices = await fetchFilteredInvoices(query, currentPage);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const rows = pets.map((pet: PetWithCustomer) => {
    const linkStyle = { cursor: "pointer" };
    const linkProps = {
      component: Link,
      href: `/dashboard/mascotas/${pet.id}/edit`,
      style: linkStyle,
    };
    
    return(
    <Table.Tr
      ta="right"
      key={pet.id}
      bg={selectedRows.includes(pet.id) ? 'var(--mantine-color-blue-light)' : undefined}
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(pet.id)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, pet.id]
                : selectedRows.filter((id) => id !== pet.id)
            )
          }
        />
      </Table.Td>
      <Table.Td>
        <Text {...linkProps}>{pet.name}</Text>
      </Table.Td>
      <Table.Td>
        <Text {...linkProps}>{pet.specie}</Text>
      </Table.Td>
      <Table.Td>
        <Text {...linkProps}>{pet.race}</Text>
      </Table.Td>
      <Table.Td>
      <Text {...linkProps}>{pet.gender ? `Macho` : 'Hembra'}</Text>
      </Table.Td>
      <Table.Td>
        <Text {...linkProps}>{pet.birthday ? pet.birthday.toLocaleDateString() : ''}</Text>
      </Table.Td>
      <Table.Td>
        <Text {...linkProps}>{pet.customer.name}</Text>
      </Table.Td>
      <Table.Td>
        <Text {...linkProps}>{pet.tags}</Text>
      </Table.Td>
      <Table.Td>
        <Text {...linkProps}>{pet.name}</Text>
      </Table.Td>
      <Table.Td>
        <div className="flex justify-end gap-2">
          <UpdatePet id={pet.id} />
          <DeletePets id={pet.id} />
        </div>
      </Table.Td>
    </Table.Tr>
  )});


  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th />
                <Table.Th><Title ta="right" order={6}>Nombre</Title></Table.Th>
                <Table.Th><Title ta="right" order={6}>Especie</Title></Table.Th>
                <Table.Th><Title ta="right" order={6}>Raza</Title></Table.Th>
                <Table.Th><Title ta="right" order={6}>Género</Title></Table.Th>
                <Table.Th><Title ta="right" order={6}>Fecha de nacimiento</Title></Table.Th>
                <Table.Th><Title ta="right" order={6}>Cliente</Title></Table.Th>
                <Table.Th><Title ta="right" order={6}>Etiquetas</Title></Table.Th>
                <Table.Th><Title ta="right" order={6}>Estado</Title></Table.Th>
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
