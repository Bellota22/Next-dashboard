'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { PetsShowTable, UsersTable } from './definitions';
 
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});


export type State = {
    errors?: {
      customerId?: string[];
      amount?: string[];
      status?: string[];
    };
    message?: string | null;
  };

export type CustomerState = {
    errors?: {
      nombre?: string[];
      apellido?: string[];
      dni?: string[];
      fecha_nacimiento?: string[];
      email?: string[];
      celular?: string[];
      departamento?: string[];
      provincia?: string[];
      distrito?: string[];
      direccion?: string[];
      etiquetas?: string[];
      imagen_url?: string[];
    };
    message?: string | null;
  };
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function createCustomer(customerData: UsersTable) {
    const fecha_creacion = new Date().toISOString().split('T')[0];
    const { nombre, apellido, dni, fecha_nacimiento, email, celular, departamento, provincia, distrito, direccion, etiquetas, imagen_url } = customerData;
    await sql`
        INSERT INTO customers (nombre, apellido, dni, fecha_nacimiento, email, celular, departamento, provincia, distrito, direccion, etiquetas, imagen_url, fecha_creacion)
        VALUES (${nombre}, ${apellido}, ${dni}, ${fecha_nacimiento}, ${email}, ${celular}, ${departamento}, ${provincia}, ${distrito}, ${direccion}, ${etiquetas}, ${imagen_url}, ${fecha_creacion})
    `;

   
    revalidatePath('/dashboard/customers');
    redirect('/dashboard/customers');

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

export async function createInvoice(prevState: State, formData: FormData) {
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
      });
    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Create Invoice.',
        };
      }
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    // const rawFormData = Object.fromEntries(formData.entries())
    try {
        await sql`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;

    }catch (error) {
        return {
            message: 'Failed to create invoice'
        
        }
    }
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');

}
export async function updateInvoice( id: string, prevState: State, formData: FormData) {
    const validatedFields = UpdateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
      });
    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
          message: 'Missing Fields. Failed to Create Invoice.',
        };
      }
    const { customerId, amount, status } = validatedFields.data;

   
    const amountInCents = amount * 100;
    try{
        await sql`
          UPDATE invoices
          SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
          WHERE id = ${id}
        `;
    }catch{
        return {
            message: 'Failed to update invoice'
        }
    }
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}
export async function deleteInvoice(id: string) {

    try{
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
    }catch{
        return {
            message: 'Failed to delete invoice'
        }
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
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
}