'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { Customers, MedicalHistory, Pets, Products, ProductsForShoppingCart, Sales, User, Veterinary } from './definitions';
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
export async function createCustomer(customerData: Customers) {
  const created_date = new Date().toISOString().split('T')[0];
  const updated_date = created_date; 
  const {
    user_id,
    name,
    dni,
    birthday,
    email,
    cellphone,
    department,
    province,
    district,
    address,
    tags,
    image_url,
  } = customerData;
  const formattedBirthday = birthday ? birthday.toISOString().split('T')[0] : null;

  await sql`
      INSERT INTO customers1 (
        user_id, name, dni, birthday, email, cellphone, department, province, district, address, tags, image_url, created_date, updated_date
      )
      VALUES (
        ${user_id}, ${name}, ${dni}, ${formattedBirthday}, ${email}, ${cellphone}, ${department}, ${province}, ${district}, ${address}, ${tags}, ${image_url}, ${created_date}, ${updated_date})
  `;
  revalidatePath('/dashboard/customers');

}


export async function editCustomer(customerData: Customers) {
    const { 
      id,
      user_id,
      name,
      dni,
      birthday,
      email,
      cellphone,
      department,
      province,
      district,
      address,
      tags,
      image_url,
     } = customerData;
    try {
      const formattedBirthday = birthday ? birthday.toISOString().split('T')[0] : null;

      await sql`
        UPDATE customers1
        SET user_id = ${user_id}, name = ${name}, dni = ${dni}, birthday = ${formattedBirthday}, email = ${email}, cellphone = ${cellphone}, department = ${department}, province = ${province}, district = ${district}, address = ${address}, tags = ${tags}, image_url = ${image_url}
        WHERE id = ${id}
      `;
  
      revalidatePath('/dashboard/customers');
    } catch (error) {
      console.error('Error updating customer:', error);
      throw new Error('Error updating customer');
    }
}

export async function deleteCustomer(id: string) {
  try{
      await sql`DELETE FROM customers1 WHERE id = ${id}`;
      revalidatePath('/dashboard/customers');
  }catch{
      return {
          message: 'Failed to delete customer'
      }
  }
}

//pets

export async function createPet(pets: Pets) {
  console.log('pets::: ', pets);
  
  const created_date = new Date().toISOString().split('T')[0];
  const updated_date = created_date;

  const { 
    user_id,
    customer_id,
    name,
    birthday,
    specie,
    race,
    gender,
    sterelized,
    insured,
    tags,
    grooming,
    grooming_freq,
    grooming_day,
    image_url
   } = pets
   const formattedBirthday = birthday ? birthday.toISOString().split('T')[0] : null;

   await sql`
        INSERT INTO pets (
          user_id, customer_id, name, birthday, specie, race, gender, sterelized, insured, tags, grooming, grooming_freq, grooming_day, image_url, created_date, updated_date
        )
        VALUES (
         ${user_id}, ${customer_id}, ${name}, ${formattedBirthday}, ${specie}, ${race}, ${gender}, ${sterelized}, ${insured}, ${tags}, ${grooming}, ${grooming_freq}, ${grooming_day}, ${image_url}, ${created_date}, ${updated_date}

        )
    `;

   
    revalidatePath('/dashboard/mascotas');
    redirect('/dashboard/mascotas');

}

export async function editPet(pet: Pets) {
  
  const {
    id,
    user_id,
    customer_id,
    name,
    birthday,
    specie,
    race,
    gender,
    sterelized,
    insured,
    tags,
    grooming,
    grooming_freq,
    grooming_day,
    image_url
  } = pet;
  const formattedBirthday = birthday ? birthday.toISOString().split('T')[0] : null;
  const formattedDate = new Date().toISOString().split('T')[0];
  
  try {
    await sql`
      UPDATE pets
      SET 
        user_id = ${user_id}, 
        customer_id = ${customer_id}, 
        name = ${name}, 
        birthday = ${formattedBirthday}, 
        specie = ${specie},
        race = ${race},
        gender = ${gender},
        sterelized = ${sterelized},
        insured = ${insured},
        tags = ${tags},
        grooming = ${grooming},
        grooming_freq = ${grooming_freq},
        grooming_day = ${grooming_day},
        image_url = ${image_url},
        updated_date = ${formattedDate}
      WHERE id = ${id}
    `;

    revalidatePath('/dashboard/mascotas');
  } catch (error) {
    console.error('Error updating customer:', error);
    throw new Error('Error updating customer');
  }
}

export async function deletePet(id: string) {
  try{
      await sql`DELETE FROM pets WHERE id = ${id}`;
      revalidatePath('/dashboard/mascotas');
  }catch{
      return {
          message: 'Failed to delete pet'
      }
  }
}

export async function createMedicalHistory(medicalHistory: MedicalHistory) {
  const created_date = new Date().toISOString().split('T')[0];
  const updated_date = created_date;
  const {
    user_id,
    pet_id,
    date,
    reason,
    anamnesis,
    weight,
    respiratory_rate,
    heart_rate,
    temperature,
    rectal_test,
    arterial_pressure,
    filled_hair_time,
    dehydration,
    clinical_test,
    diagnosis,
    auxiliary_test,
    treatment,
    prescription,
    observation,
  } = medicalHistory;
  
  const formattedDate = date ? date.toISOString().split('T')[0] : null;

  await sql`
    INSERT INTO medical_histories (
      user_id, pet_id, date, reason, anamnesis, weight, respiratory_rate, heart_rate, temperature, rectal_test, arterial_pressure, filled_hair_time, dehydration, clinical_test, diagnosis, auxiliary_test, treatment, prescription, observation, created_date, updated_date
    )
    VALUES (
      ${user_id}, ${pet_id}, ${formattedDate}, ${reason}, ${anamnesis}, ${weight}, ${respiratory_rate}, ${heart_rate}, ${temperature}, ${rectal_test}, ${arterial_pressure}, ${filled_hair_time}, ${dehydration}, ${clinical_test}, ${diagnosis}, ${auxiliary_test}, ${treatment}, ${prescription}, ${observation}, ${created_date}, ${updated_date}
    )
  `;
  revalidatePath(`/dashboard/mascotas/${pet_id}/medical-history`);
}

//vets
export async function createVet(pets: Veterinary) {

  
  const created_date = new Date().toISOString().split('T')[0];
  const updated_date = created_date;

  const { 
    user_id,
    name,
    email,
    dni,
    cellphone,
    address,
    // specialties,  
    image_url
   } = pets

   await sql`
        INSERT INTO vets (
          user_id, name, email, dni, cellphone, address, image_url, created_date, updated_date
        )
        VALUES (
          ${user_id}, ${name}, ${email}, ${dni}, ${cellphone}, ${address}, ${image_url}, ${created_date}, ${updated_date}
        )
    `;

   
    revalidatePath('/dashboard/mascotas');
    redirect('/dashboard/mascotas');

}

//products

export async function createProduct(productsData: Products) {
  
  const created_date = new Date().toISOString().split('T')[0];
  const updated_date = created_date;

  const {
    user_id,
    name,
    brand,
    measure_unit,
    presentation,
    content,
    supplier,
    bar_code,
    category,
    stock,
    buy_price,
    sell_price,
    status,
    image_url,    
  } = productsData;
  await sql`
  INSERT INTO products1 (
    user_id, name, brand, measure_unit, presentation, content, supplier, bar_code, category, stock, buy_price, sell_price, status, image_url, created_date, updated_date)
  VALUES (
    ${user_id}, ${name}, ${brand}, ${measure_unit}, ${presentation}, ${content}, ${supplier}, ${bar_code}, ${category}, ${stock}, ${buy_price}, ${sell_price}, ${status}, ${image_url}, ${created_date}, ${updated_date})
`;
revalidatePath('/dashboard/products');
redirect('/dashboard/products');

}

export async function editProduct(productsData: Products) {
  const updated_date = new Date().toISOString().split('T')[0];

  const {
    id,
    user_id,
    name,
    brand,
    measure_unit,
    presentation,
    content,
    supplier,
    bar_code,
    category,
    stock,
    buy_price,
    sell_price,
    status,
    image_url,
  } = productsData;
    

  await sql`
    UPDATE products1
    SET 
      user_id = ${user_id}, 
      name = ${name}, 
      brand = ${brand}, 
      measure_unit = ${measure_unit}, 
      presentation = ${presentation}, 
      content = ${content}, 
      supplier = ${supplier}, 
      bar_code = ${bar_code}, 
      category = ${category}, 
      stock = ${stock}, 
      buy_price = ${buy_price}, 
      sell_price = ${sell_price}, 
      status = ${status}, 
      image_url = ${image_url},
      updated_date = ${updated_date}
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
        await sql`DELETE FROM products1 WHERE id = ${id}`;
        revalidatePath('/dashboard/products');
    }catch{
        return {
            message: 'Failed to delete pet'
        }
    }
}

export async function createSale(userId: string, customerId: string, products: ProductsForShoppingCart[] ) {

  const status = true;
  const total_price = products.reduce((sum, product) => sum + product.sell_price * product.quantity, 0);

  const sale = await sql<Sales>`
    INSERT INTO sales (user_id, customer_id, status, total_price)
    VALUES (${userId}, ${customerId}, ${status}, ${total_price})
    RETURNING id
  `;

  const sale_id = sale.rows[0].id;

  for (const product of products) {
    await sql`
      INSERT INTO sales_products (user_id, product_id, sale_id, quantity,  total_price)
      VALUES (${userId}, ${product.id}, ${sale_id} , ${product.quantity},  ${product.sell_price * product.quantity})
    `;
  }

  return sale_id;
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
