'use client'
import Image from 'next/image';
import { UpdatePet, DeletePets } from '@/app/ui/mascotas/buttons';
import { formatDateToLocal,  } from '@/app/lib/utils';
import { useState } from 'react';
import { Table, Checkbox, Text, Title, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import { Pets } from '@/app/lib/definitions';

export default function PetsTable({
  query,
  currentPage,
  pets,
}: {
  query: string;
  currentPage: number;
  pets: Pets[];
}) {
  const [selectedRows, setSelectedRows] = useState<Pets[]>([]);
  const theme = useMantineTheme();
  const handleCheckboxChange = (product: Pets, isChecked: boolean) => {
    setSelectedRows((prevSelected) =>
      isChecked
        ? [...prevSelected, product]
        : prevSelected.filter((p) => p.id !== product.id)
    );

  }
  const rows = pets.map((pet: Pets) => {
    const isSelected = selectedRows.some((p) => p.id === pet.id);

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
      bg={isSelected ? theme.colors.primary[1] : undefined}
    >
      <Table.Td>
        <Checkbox
          variant="outline"
          color="primary"
          aria-label="Select row"
          checked={isSelected}
          onChange={(event) => handleCheckboxChange(pet, event.currentTarget.checked)}

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
