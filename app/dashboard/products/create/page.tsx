import { lusitana } from '@/app/ui/fonts';
import Form from '@/app/ui/products/create-form';
import { Breadcrumbs, Anchor } from '@mantine/core';
 
export default async function Page() {
  const items = [
    { label: 'Productos', href: '/dashboard/products' },
    {
      label: 'Crear Producto',
      href: '/dashboard/products/create',
      active: true,
    },
  ].map((item, index) => (
    <Anchor className={`${lusitana.className}`}  href={item.href} key={index}>
      {item.label}
    </Anchor>
  ));
  
  return (
    <main>
      <Breadcrumbs style={{ color: 'black' }}> 
      {items}
      </Breadcrumbs>
      <Form /> 
    </main>
  );
}