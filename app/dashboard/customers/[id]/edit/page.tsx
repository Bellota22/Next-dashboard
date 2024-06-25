import Form from '@/app/ui/customers/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers, fetchCustomerById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit invoice',
};
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const customer = await fetchCustomerById(id);

    return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Clientes', href: '/dashboard/customers' },
          { label: 'Editar cliente', href: `/dashboard/customers/${id}/edit`, active: true },
          { label: 'Mascotas', href: `/dashboard/customers/${id}/pets` },
          
        ]}
      />
      <Form customerId={id} customer={customer} />
    </main>
  );
}