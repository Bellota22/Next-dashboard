import Form from '@/app/ui/mascotas/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();

  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Mascotas', href: '/dashboard/mascotas' },
          {
            label: 'Crear Mascotas',
            href: '/dashboard/mascotas/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} /> 
    </main>
  );
}