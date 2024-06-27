import Form from '@/app/ui/products/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
 
export default async function Page() {

  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Productos', href: '/dashboard/products' },
          {
            label: 'Crear Producto',
            href: '/dashboard/products/create',
            active: true,
          },
        ]}
      />
      <Form /> 
    </main>
  );
}