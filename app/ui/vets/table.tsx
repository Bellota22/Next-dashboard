'use client'
import Image from 'next/image';
import { UpdateVet, DeleteVet } from '@/app/ui/vets/buttons';
import { formatDateToLocal } from '@/app/lib/utils';
import { useState } from 'react';
import { Table, Checkbox, Text, Title, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import { Veterinary } from '@/app/lib/definitions';

export default function VetsTable({
  query,
  currentPage,
  vets,
}: {
  query: string;
  currentPage: number;
  vets: Veterinary[];
}) {
  const [selectedRows, setSelectedRows] = useState<Veterinary[]>([]);
  const theme = useMantineTheme();

  const handleCheckboxChange = (product: Veterinary, isChecked: boolean) => {
    setSelectedRows((prevSelected) =>
      isChecked
        ? [...prevSelected, product]
        : prevSelected.filter((p) => p.id !== product.id)
    );

  }
  const rows = vets.map((vet: Veterinary) => {
    const isSelected = selectedRows.some((p) => p.id === vet.id);

    const linkStyle = { cursor: "pointer" };
    const linkProps = {
      component: Link,
      href: `/dashboard/vets/${vet.id}/edit`,
      style: linkStyle,
    };
    return (
    <Table.Tr
      ta="right"
      key={vet.id}
      bg={isSelected ? theme.colors.primary[1] : undefined}
      >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          variant="outline"
          color="primary"
          checked={isSelected}
          onChange={(event) => handleCheckboxChange(vet, event.currentTarget.checked)}

        />
      </Table.Td>
      <Table.Td>
        <Text {...linkProps}>{vet.name}</Text>
      </Table.Td>
      <Table.Td>
        <Text {...linkProps}>{vet.cellphone}</Text>
      </Table.Td>
      <Table.Td>
        <Text {...linkProps}>{vet.email}</Text>
      </Table.Td>
      <Table.Td>
      <Text {...linkProps}>{vet.created_date ? vet.created_date.toLocaleDateString() : ''}</Text>
      </Table.Td>
      <Table.Td>
        <div className="flex justify-end gap-2">
          <UpdateVet id={vet.id} />
          <DeleteVet id={vet.id} />
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
                <Table.Th><Title ta="right" order={6}>Fecha de registro</Title></Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
    </div>
  );
}
