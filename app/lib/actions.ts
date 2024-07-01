'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { PetsShowTable, ProductsShowTable, User, UsersTable } from './definitions';
import bcrypt from 'bcryptjs';

const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

export async function registerUser({ email, name, password, terms }: z.infer<typeof registerSchema>): Promise<User> {
  const parsed = registerSchema.safeParse({ email, name, password, terms });

  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((err) => err.message).join(', '));
  }

  const existingUser = await sql<User>`SELECT * FROM users WHERE email=${email}`;
  if (existingUser.rows.length > 0) {
    throw new Error('User already exists with this email');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await sql<User>`
    INSERT INTO users (email, name, password)
    VALUES (${email}, ${name}, ${hashedPassword})
    RETURNING *;
  `;

  return newUser.rows[0];
}

export async function createCustomer(customerData: UsersTable) {
    const fecha_creacion = new Date().toISOString().split('T')[0];
    const { nombre, apellido, dni, fecha_nacimiento, email, celular, departamento, provincia, distrito, direccion, etiquetas, imagen_url } = customerData;
    await sql`
        INSERT INTO customers (nombre, apellido, dni, fecha_nacimiento, email, celular, departamento, provincia, distrito, direccion, etiquetas, imagen_url, fecha_creacion)
        VALUES (${nombre}, ${apellido}, ${dni}, ${fecha_nacimiento}, ${email}, ${celular}, ${departamento}, ${provincia}, ${distrito}, ${direccion}, ${etiquetas}, ${imagen_url}, ${fecha_creacion})
    `;
    revalidatePath('/dashboard/customers');

}

export async function editCustomer(customerId: string, customerData: UsersTable) {
    const { nombre, apellido, dni, fecha_nacimiento, email, celular, departamento, provincia, distrito, direccion, etiquetas, imagen_url } = customerData;
    try {
      await sql`
        UPDATE customers
        SET nombre = ${nombre}, apellido = ${apellido}, dni = ${dni}, fecha_nacimiento = ${fecha_nacimiento}, email = ${email}, celular = ${celular}, departamento = ${departamento}, provincia = ${provincia}, distrito = ${distrito}, direccion = ${direccion}, etiquetas = ${etiquetas}, imagen_url = ${imagen_url}
        WHERE id = ${customerId}
      `;
  
      revalidatePath('/dashboard/customers');
    } catch (error) {
      console.error('Error updating customer:', error);
      throw new Error('Error updating customer');
    }
}

export async function deleteCustomer(id: string) {
  try{
      await sql`DELETE FROM customers WHERE id = ${id}`;
      revalidatePath('/dashboard/customers');
  }catch{
      return {
          message: 'Failed to delete customer'
      }
  }
}

export async function createMascotas(mascotasData: PetsShowTable) {
  
  const fecha_creacion = new Date().toISOString().split('T')[0];

  const { customer_id, nombre, especie, raza, fecha_nacimiento, sexo, esterilizado, asegurado, grooming, grooming_freq, grooming_dia, etiquetas, imagen_url } = mascotasData
  console.log('mascotasData::: ', mascotasData);
    await sql`
        INSERT INTO mascotas (
          customer_id, nombre, especie, raza, fecha_nacimiento, sexo, esterilizado, asegurado, grooming, grooming_freq, grooming_dia, etiquetas, imagen_url, fecha_creacion
        )
        VALUES ( ${customer_id}, ${nombre}, ${especie}, ${raza}, ${fecha_nacimiento}, ${sexo}, ${esterilizado}, ${asegurado}, ${grooming}, ${grooming_freq}, ${grooming_dia}, ${etiquetas}, ${imagen_url}, ${fecha_creacion})
    `;

   
    revalidatePath('/dashboard/mascotas');
    redirect('/dashboard/mascotas');

}

export async function editMascota(petId: string, petData: PetsShowTable) {
  
  const {
    nombre,
    especie,
    raza,
    fecha_nacimiento,
    sexo,
    esterilizado,
    asegurado,
    grooming,
    grooming_freq,
    grooming_dia,
    etiquetas,
    imagen_url,
  } = petData;
  
  
  try {
    await sql`
      UPDATE mascotas
      SET nombre = ${nombre}, especie = ${especie}, raza = ${raza}, fecha_nacimiento = ${fecha_nacimiento}, sexo = ${sexo}, esterilizado = ${esterilizado}, asegurado = ${asegurado}, grooming = ${grooming}, grooming_freq = ${grooming_freq}, grooming_dia = ${grooming_dia}, etiquetas = ${etiquetas}, imagen_url = ${imagen_url}
      WHERE id = ${petId}
    `;

    revalidatePath('/dashboard/mascotas');
  } catch (error) {
    console.error('Error updating customer:', error);
    throw new Error('Error updating customer');
  }
}

export async function deletePet(id: string) {
  try{
      await sql`DELETE FROM mascotas WHERE id = ${id}`;
      revalidatePath('/dashboard/mascotas');
  }catch{
      return {
          message: 'Failed to delete pet'
      }
  }
}

export async function createProducts(productsData: ProductsShowTable) {
  
  const fecha_creacion = new Date().toISOString().split('T')[0];

  const {
    user_id,
    codigo_barras,
    nombre,
    marca,
    unidad_medida,
    proveedor,
    categoria,
    subcategoria,
    presentacion,
    contenido,
    precio_compra,
    precio_venta,
    stock,
    imagen_url,
    estado,
  } = productsData;
  await sql`
  INSERT INTO products (user_id, codigo_barras, nombre, marca, unidad_medida, proveedor, categoria, subcategoria, presentacion, contenido, precio_compra, precio_venta, stock, imagen_url, estado, fecha_creacion)
  VALUES (${user_id}, ${codigo_barras}, ${nombre}, ${marca}, ${unidad_medida}, ${proveedor}, ${categoria}, ${subcategoria}, ${presentacion}, ${contenido}, ${precio_compra}, ${precio_venta}, ${stock}, ${imagen_url}, ${estado}, ${fecha_creacion})
`;
revalidatePath('/dashboard/products');
redirect('/dashboard/products');

}

export async function updateProduct(id: string, productData: ProductsShowTable) {
  const {
    user_id,
    codigo_barras,
    nombre,
    marca,
    unidad_medida,
    proveedor,
    categoria,
    subcategoria,
    presentacion,
    contenido,
    precio_compra,
    precio_venta,
    stock,
    imagen_url,
    estado,
  } = productData;

  await sql`
    UPDATE products 
    SET 
      user_id = ${user_id}, 
      codigo_barras = ${codigo_barras}, 
      nombre = ${nombre}, 
      marca = ${marca}, 
      unidad_medida = ${unidad_medida}, 
      proveedor = ${proveedor}, 
      categoria = ${categoria}, 
      subcategoria = ${subcategoria}, 
      presentacion = ${presentacion}, 
      contenido = ${contenido}, 
      precio_compra = ${precio_compra}, 
      precio_venta = ${precio_venta}, 
      stock = ${stock}, 
      imagen_url = ${imagen_url}, 
      estado = ${estado}
    WHERE id = ${id}
  `;

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function updateProductState(id: string, estado: boolean) {
  try {
    await sql`
      UPDATE products
      SET estado = ${estado}
      WHERE id = ${id}
    `;
    revalidatePath('/dashboard/products');
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to update product state.');
  }
}

export async function deleteProduct(id: string) {
    try{
        await sql`DELETE FROM products WHERE id = ${id}`;
        revalidatePath('/dashboard/products');
    }catch{
        return {
            message: 'Failed to delete pet'
        }
    }
}

export async function createSale(userId: string, customerId: string, products: any[]) {
  const fecha = new Date().toISOString();
  const estado = true;
  const total = products.reduce((sum, product) => sum + product.precio_venta * product.cantidad, 0);

  const venta = await sql`
    INSERT INTO ventas (user_id, customer_id, total, fecha, estado, fecha_creacion)
    VALUES (${userId}, ${customerId}, ${total}, ${fecha}, ${estado}, ${fecha})
    RETURNING id
  `;

  const ventaId = venta.rows[0].id;

  for (const product of products) {
    await sql`
      INSERT INTO ventas_productos (venta_id, producto_id, cantidad, precio)
      VALUES (${ventaId}, ${product.id}, ${product.cantidad}, ${product.precio_venta})
    `;
  }

  return ventaId;
}

export async function deleteSell(id: string) {
  try{
      await sql`DELETE FROM sells WHERE id = ${id}`;
      revalidatePath('/dashboard/sells');
  }catch{
      return {
          message: 'Failed to delete sell'
      }
  }
}

type SignInResult = {
  ok: boolean;
  error?: string;
  [key: string]: any;
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
    try {
      const result = await signIn('credentials', formData) as unknown as SignInResult;

      if (result && !result.ok) {
        throw new Error('Invalid credentials.');
      }
      return undefined;

    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
}
