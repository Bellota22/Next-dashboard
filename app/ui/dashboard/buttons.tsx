import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteCustomer, deleteEmployee } from '@/app/lib/actions';


export function UpdateCustomer({ id }: { id: string }) {
  return (
    <Link
    href={`/dashboard/customers/${id}/edit`}
    className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteEmployee({ id }: { id: string }) {
  const deleteEmployeeWithID = deleteEmployee.bind(null, id);
  return (
    <form action={deleteEmployeeWithID}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon color='red' className="w-5" />
      </button>
    </form>
  );
}
