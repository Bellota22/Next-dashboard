import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteProduct } from '@/app/lib/actions';
import { Button, Title } from '@mantine/core';

export function CreateProduct() {
  return (
    <Button
      color="primary.3"
      component={Link}
      rightSection={<PlusIcon className="h-5" />}
      href="/dashboard/products/create"
      
    >

      <Title order={6}>Crear Producto</Title>{' '}
    </Button>
  );
}

export function UpdateProduct({ id }: { id: string }) {
  return (
    <Link
    href={`/dashboard/products/${id}/edit`}
    className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteProduct({ id }: { id: string }) {
  const deleteProductWithID = deleteProduct.bind(null, id);
  return (
    <form action={deleteProductWithID}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon color='red' className="w-5" />
      </button>
    </form>
  );
}
