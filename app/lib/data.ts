import { sql } from '@vercel/postgres';
import {
  CustomerField,
  User,
  UsersTable,
  UsersShowTable,
  PetsShowTable,
  ProductsShowTable,
  SalesProductsTableType,
  SaleWithProductsType,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';


const ITEMS_PER_PAGE = 10;


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

export async function fetchCustomers(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        nombre,
        apellido
      FROM customers
      WHERE nombre ILIKE ${`%${query}%`} OR apellido ILIKE ${`%${query}%`}
      ORDER BY nombre ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}

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

export async function fetchProductsPages(query: string, userId: string) {
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM products
      WHERE
        user_id = ${userId} AND (
          products.nombre::text ILIKE ${`%${query}%`} OR
          products.marca::text ILIKE ${`%${query}%`} OR
          products.categoria::text ILIKE ${`%${query}%`} OR
          products.precio_venta::text ILIKE ${`%${query}%`}
        )
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of products.');
  }
}

export async function fetchAllProducts(query: string, currentPage: number, userId: string) {
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
      p.user_id = ${userId} AND (
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
      )
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

export async function fetchAllSells(query: string, currentPage: number): Promise<SaleWithProductsType[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const sells = await sql`
    SELECT
      v.id AS venta_id,
      v.user_id,
      v.customer_id,
      v.total,
      v.fecha,
      v.estado,
      v.fecha_creacion,
      vp.producto_id,
      vp.cantidad,
      vp.precio

    FROM ventas v
    JOIN ventas_productos vp ON v.id = vp.venta_id
    
    ORDER BY v.fecha DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;

  // Procesar los resultados y agrupar los productos por venta
  const salesMap: { [key: string]: SaleWithProductsType } = {};

  sells.rows.forEach(row => {
    const ventaId = row.venta_id;

    if (!salesMap[ventaId]) {
      salesMap[ventaId] = {
        venta: {
          id: row.venta_id,
          user_id: row.user_id,
          customer_id: row.customer_id,
          total: row.total,
          fecha: new Date(row.fecha),
          estado: row.estado,
          fecha_creacion: new Date(row.fecha_creacion),
        },
        productos: [],
      };
    }

    const product: SalesProductsTableType = {
      venta_id: row.venta_id,
      producto_id: row.producto_id,
      cantidad: row.cantidad,
      precio: row.precio,
      producto_nombre: row.producto_nombre,
      producto_marca: row.producto_marca,
    };

    salesMap[ventaId].productos.push(product);
  });

  // Convertir el mapa de ventas en un array
  const salesWithProducts: SaleWithProductsType[] = Object.values(salesMap);

  return salesWithProducts;
}

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