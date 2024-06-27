import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  UsersTable,
  UsersShowTable,
  PetsShowTable,
  ProductsShowTable,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();

  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  noStore();

  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 10;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  noStore();

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchFilteredCustomers(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  noStore();

  try {
    const users = await sql<UsersShowTable>`
      SELECT
        id,
        nombre,
        apellido,
        email,
        direccion,
        celular,
        departamento,
        provincia,
        distrito,
        fecha_creacion,
        imagen_url,
        etiquetas
      FROM customers
      WHERE
        email ILIKE ${`%${query}%`} OR
        nombre ILIKE ${`%${query}%`} OR
        apellido ILIKE ${`%${query}%`} OR
        direccion ILIKE ${`%${query}%`} OR
        departamento ILIKE ${`%${query}%`} OR
        provincia ILIKE ${`%${query}%`} OR
        distrito ILIKE ${`%${query}%`} OR
        etiquetas ILIKE ${`%${query}%`} OR
        celular ILIKE ${`%${query}%`} 
      ORDER BY nombre ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return users.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function fetchUsersPages(query: string) {
  noStore();

  try {
    const count = await sql`SELECT COUNT(*)
    FROM usuarios
    WHERE
      email ILIKE ${`%${query}%`} OR
      name ILIKE ${`%${query}%`} OR
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of users.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();

  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();

  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomerById(id: string) {
  try {
    const data = await sql<UsersTable>`
      SELECT
        id,
        nombre,
        apellido,
        email,
        dni,
        celular,
        direccion,
        departamento,
        provincia,
        distrito,
        imagen_url,
        etiquetas,
        fecha_nacimiento
      FROM customers
      WHERE id = ${id};
    `;

    const customer = data.rows[0];
    return customer;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customer.');
  }
}

export async function fetchCustomers() {

  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        nombre,
        apellido
      FROM customers
      ORDER BY nombre ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchCustomerPets(customerId: string) {
  try {
    const data = await sql<PetsShowTable & UsersShowTable>`
      SELECT
        m.id,
        m.customer_id,
        m.nombre AS pet_nombre,
        m.especie,
        m.fecha_nacimiento AS pet_fecha_nacimiento,
        m.raza,
        m.sexo,
        m.esterilizado,
        m.asegurado,
        m.grooming,
        m.grooming_freq,
        m.grooming_dia,
        m.etiquetas AS pet_etiquetas,
        m.imagen_url AS pet_imagen_url,
        m.fecha_creacion AS pet_fecha_creacion,
        c.nombre AS customer_nombre,
        c.apellido AS customer_apellido,
        c.dni AS customer_dni,
        c.fecha_nacimiento AS customer_fecha_nacimiento,
        c.email AS customer_email,
        c.celular AS customer_celular,
        c.departamento AS customer_departamento,
        c.provincia AS customer_provincia,
        c.distrito AS customer_distrito,
        c.direccion AS customer_direccion,
        c.etiquetas AS customer_etiquetas,
        c.imagen_url AS customer_imagen_url,
        c.fecha_creacion AS customer_fecha_creacion
      FROM mascotas m
      JOIN customers c ON m.customer_id = c.id
      WHERE m.customer_id = ${customerId}
      ORDER BY m.nombre ASC;
    `;

    const pets = data.rows;
    return pets;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch pets for the customer.');
  }
}

export async function fetchPetById(id: string) {
  try {
    const data = await sql<PetsShowTable & UsersShowTable>`
      SELECT
        m.id,
        m.customer_id,
        m.nombre AS pet_nombre,
        m.especie,
        m.fecha_nacimiento AS pet_fecha_nacimiento,
        m.raza,
        m.sexo,
        m.esterilizado,
        m.asegurado,
        m.grooming,
        m.grooming_freq,
        m.grooming_dia,
        m.etiquetas AS pet_etiquetas,
        m.imagen_url AS pet_imagen_url,
        m.fecha_creacion AS pet_fecha_creacion,
        c.nombre AS customer_nombre,
        c.apellido AS customer_apellido,
        c.dni AS customer_dni,
        c.fecha_nacimiento AS customer_fecha_nacimiento,
        c.email AS customer_email,
        c.celular AS customer_celular,
        c.departamento AS customer_departamento,
        c.provincia AS customer_provincia,
        c.distrito AS customer_distrito,
        c.direccion AS customer_direccion,
        c.etiquetas AS customer_etiquetas,
        c.imagen_url AS customer_imagen_url,
        c.fecha_creacion AS customer_fecha_creacion
      FROM mascotas m
      JOIN customers c ON m.customer_id = c.id
      WHERE m.id = ${id};
    `;

    const pet = data.rows[0];
    return pet;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch pet.');
  }
}

export async function fetchAllPets(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const pets = await sql<PetsShowTable & UsersShowTable>`
    SELECT
      m.id,
      m.customer_id,
      m.nombre AS pet_nombre,
      m.especie,
      m.fecha_nacimiento AS pet_fecha_nacimiento,
      m.raza,
      m.sexo,
      m.esterilizado,
      m.asegurado,
      m.grooming,
      m.grooming_freq,
      m.grooming_dia,
      m.etiquetas AS pet_etiquetas,
      m.imagen_url AS pet_imagen_url,
      m.fecha_creacion AS pet_fecha_creacion,
      c.nombre AS customer_nombre,
      c.apellido AS customer_apellido,
      c.dni AS customer_dni,
      c.fecha_nacimiento AS customer_fecha_nacimiento,
      c.email AS customer_email,
      c.celular AS customer_celular,
      c.departamento AS customer_departamento,
      c.provincia AS customer_provincia,
      c.distrito AS customer_distrito,
      c.direccion AS customer_direccion,
      c.etiquetas AS customer_etiquetas,
      c.imagen_url AS customer_imagen_url,
      c.fecha_creacion AS customer_fecha_creacion
    FROM mascotas m
    JOIN customers c ON m.customer_id = c.id
    WHERE
      m.especie ILIKE ${`%${query}%`} OR
      m.raza ILIKE ${`%${query}%`} OR
      m.nombre ILIKE ${`%${query}%`} OR
      m.etiquetas ILIKE ${`%${query}%`}
    ORDER BY m.nombre ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;

  return pets.rows;
}

export async function fetchAllProducts(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const products = await sql<ProductsShowTable>`
    SELECT
      p.id,
      p.user_id,
      p.nombre,
      p.marca,
      p.unidad_medida,
      p.presentacion,
      p.contenido,
      p.proveedor,
      p.codigo_barras,
      p.categoria,
      p.subcategoria,
      p.stock,
      p.precio_compra,
      p.precio_venta,
      p.estado,
      p.fecha_creacion AS product_fecha_creacion
    FROM products p
    JOIN users u ON p.user_id = u.id
    WHERE
      p.nombre ILIKE ${`%${query}%`} OR
      p.marca ILIKE ${`%${query}%`} OR
      p.categoria ILIKE ${`%${query}%`} OR
      p.subcategoria ILIKE ${`%${query}%`} OR
      p.proveedor ILIKE ${`%${query}%`} OR
      p.codigo_barras ILIKE ${`%${query}%`} OR
      p.presentacion ILIKE ${`%${query}%`} OR
      p.contenido ILIKE ${`%${query}%`} OR
      p.unidad_medida ILIKE ${`%${query}%`} OR
      p.precio_compra::text ILIKE ${`%${query}%`} OR
      p.precio_venta::text ILIKE ${`%${query}%`}
    ORDER BY p.nombre ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;

  return products.rows;
}
export async function fetchProductById(id: string) {
  try {
    const data = await sql<ProductsShowTable>`
      SELECT
        p.user_id,
        p.nombre,
        p.marca,
        p.unidad_medida,
        p.presentacion,
        p.contenido,
        p.proveedor,
        p.codigo_barras,
        p.categoria,
        p.subcategoria,
        p.stock,
        p.precio_compra,
        p.precio_venta,
        p.estado,
        p.fecha_creacion AS product_fecha_creacion
      FROM products p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = ${id};
    `;

    const product = data.rows[0];
    return product;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product.');
  }
}


// export async function fetchFilteredCustomers(query: string) {
//   noStore();

//   try {
//     const data = await sql<CustomersTableType>`
// 		SELECT
// 		  customers.id,
// 		  customers.name,
// 		  customers.email,
// 		  customers.image_url,
// 		  COUNT(invoices.id) AS total_invoices,
// 		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
// 		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
// 		FROM customers
// 		LEFT JOIN invoices ON customers.id = invoices.customer_id
// 		WHERE
// 		  customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`}
// 		GROUP BY customers.id, customers.name, customers.email, customers.image_url
// 		ORDER BY customers.name ASC
// 	  `;

//     const customers = data.rows.map((customer) => ({
//       ...customer,
//       total_pending: formatCurrency(customer.total_pending),
//       total_paid: formatCurrency(customer.total_paid),
//     }));

//     return customers;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch customer table.');
//   }
// }

export async function getUser(email: string) {
  
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getAllUser() {
  try {
    const users = await sql`SELECT * FROM users`;
    return users.rows as User[];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}