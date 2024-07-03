import { sql } from '@vercel/postgres';
import {
  CustomerField,
  User,
  UsersTable,
  UsersShowTable,
  PetsShowTable,
  ProductsShowTable,
  Products,
  Customers,
  SaleWithProducts,
  Pets,
  PetWithCustomer,

} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';


const ITEMS_PER_PAGE = 8;

export async function getFilteredCustomers(
  query: string,
  currentPage: number,
  userId: string,
): Promise<Customers[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const users = await sql<Customers>`
    SELECT
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
      created_date,
      updated_date
    FROM customers1
    WHERE
      user_id = ${userId} AND (
      name ILIKE ${`%${query}%`} OR
      dni::text ILIKE ${`%${query}%`} OR
      email ILIKE ${`%${query}%`} OR
      cellphone ILIKE ${`%${query}%`} OR
      department ILIKE ${`%${query}%`} OR
      province ILIKE ${`%${query}%`} OR
      district ILIKE ${`%${query}%`} OR
      address ILIKE ${`%${query}%`} OR
      tags ILIKE ${`%${query}%`}
    )
    ORDER BY name ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;

  return users.rows;
}

export async function getCustomersPages(query: string, userId: string) {
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM customers1
      WHERE
        user_id = ${userId} AND (
          name ILIKE ${`%${query}%`} OR
          dni::text ILIKE ${`%${query}%`} OR
          email ILIKE ${`%${query}%`} OR
          cellphone ILIKE ${`%${query}%`} OR
          department ILIKE ${`%${query}%`} OR
          province ILIKE ${`%${query}%`} OR
          district ILIKE ${`%${query}%`} OR
          address ILIKE ${`%${query}%`} OR
          tags ILIKE ${`%${query}%`}
        )
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of customers.');
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
export async function getCustomberById(id: string) {
  try {
    const data = await sql<Customers>`
      SELECT
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
        created_date,
        updated_date
      FROM customers1
      WHERE id = ${id};
    `;

    const customer = data.rows[0];
    return customer;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customer.');
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

export async function getAllCostumers(query: string, currentPage: number, userId: string) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const data = await sql<Customers>`
      SELECT
        c.id,
        c.user_id,
        c.name,
        c.dni,
        c.birthday,
        c.email,
        c.cellphone,
        c.department,
        c.province,
        c.district,
        c.address,
        c.tags,
        c.image_url
      FROM customers1 c
      JOIN users u ON c.user_id = u.id
      WHERE 
      c.user_id = ${userId} AND (
        c.name ILIKE ${`%${query}%`} OR 
        c.dni::text ILIKE ${`%${query}%`} OR
        c.email ILIKE ${`%${query}%`} OR
        c.cellphone ILIKE ${`%${query}%`} OR
        c.department ILIKE ${`%${query}%`} OR
        c.province ILIKE ${`%${query}%`} OR
        c.district ILIKE ${`%${query}%`} OR
        c.address ILIKE ${`%${query}%`} OR
        c.tags ILIKE ${`%${query}%`}
      )
      ORDER BY c.name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    const customers = data.rows;
    return customers;

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

export async function getPetById(id: string): Promise<PetWithCustomer>{
  try {
    const data = await sql`
      SELECT
        p.id,
        p.user_id,
        p.customer_id,
        p.name AS pet_name,
        p.birthday AS pet_birthday,
        p.specie,
        p.race,
        p.gender,
        p.sterelized,
        p.insured,
        p.grooming,
        p.grooming_freq,
        p.grooming_day,
        p.tags AS pet_tags,
        p.image_url AS pet_image_url,
        p.created_date AS pet_created_date,
        p.updated_date AS pet_updated_date,
        c.name AS customer_name,
        c.user_id AS customer_user_id,
        c.dni AS customer_dni,
        c.birthday AS customer_birthday,
        c.email AS customer_email,
        c.cellphone AS customer_cellphone,
        c.department AS customer_department,
        c.province AS customer_province,
        c.district AS customer_district,
        c.address AS customer_address,
        c.tags AS customer_tags,
        c.image_url AS customer_image_url,
        c.created_date AS customer_created_date,
        c.updated_date AS customer_updated_date
      FROM pets p
      JOIN customers1 c ON p.customer_id = c.id
      WHERE p.id = ${id};
    `;

    const row  = data.rows[0];
    if (!row) throw new Error("Pet not found");

    const petWithCustomer: PetWithCustomer = {
      id: row.id,
      user_id: row.user_id,
      customer_id: row.customer_id,
      name: row.pet_name,
      birthday: row.pet_birthday ? new Date(row.pet_birthday) : undefined,
      specie: row.specie,
      race: row.race,
      gender: row.gender,
      sterelized: row.sterelized,
      insured: row.insured,
      tags: row.pet_tags,
      grooming: row.grooming,
      grooming_freq: row.grooming_freq,
      grooming_day: row.grooming_day,
      image_url: row.pet_image_url,
      created_date: new Date(row.pet_created_date),
      updated_date: new Date(row.pet_updated_date),
      customer: {
        id: row.customer_id,
        name: row.customer_name,
        user_id: row.customer_user_id,
        dni: row.customer_dni,
        birthday: row.customer_birthday ? new Date(row.customer_birthday) : undefined,
        email: row.customer_email,
        cellphone: row.customer_cellphone,
        department: row.customer_department,
        province: row.customer_province,
        district: row.customer_district,
        address: row.customer_address,
        tags: row.customer_tags,
        image_url: row.customer_image_url,
        created_date: new Date(row.customer_created_date),
        updated_date: new Date(row.customer_updated_date)
      }
    };
    return petWithCustomer;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch pet.');
  }
}

export async function getPetsPages(query: string, userId: string) {
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM pets p
      JOIN customers1 c ON p.customer_id = c.id
      WHERE
        p.user_id = ${userId} AND (
          p.name ILIKE ${`%${query}%`} OR
          p.specie ILIKE ${`%${query}%`} OR
          p.race ILIKE ${`%${query}%`} OR
          p.tags ILIKE ${`%${query}%`} OR
          c.name ILIKE ${`%${query}%`} 
        )
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of customers.');
  }
}

export async function getAllFilteredPets(query: string, currentPage: number, userId: string): Promise<PetWithCustomer[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const pets = await sql`
    SELECT
      p.id,
      p.user_id,
      p.customer_id,
      p.name AS pet_name,
      p.birthday AS pet_birthday,
      p.specie,
      p.race,
      p.gender,
      p.sterelized,
      p.insured,
      p.tags AS pet_tags,
      p.grooming,
      p.grooming_freq,
      p.grooming_day,
      p.image_url AS pet_image_url,
      p.created_date AS pet_created_date,
      p.updated_date AS pet_updated_date,
      c.id AS customer_id,
      c.name AS customer_name,
      c.dni AS customer_dni,
      c.birthday AS customer_birthday,
      c.email AS customer_email,
      c.cellphone AS customer_cellphone,
      c.department AS customer_department,
      c.province AS customer_province,
      c.district AS customer_district,
      c.address AS customer_address,
      c.tags AS customer_tags,
      c.image_url AS customer_image_url,
      c.created_date AS customer_created_date,
      c.updated_date AS customer_updated_date
    FROM pets p
    JOIN customers1 c ON p.customer_id = c.id
    WHERE
      p.user_id = ${userId} AND (
      p.name ILIKE ${`%${query}%`} OR
      p.specie ILIKE ${`%${query}%`} OR
      p.race ILIKE ${`%${query}%`} OR
      p.name ILIKE ${`%${query}%`} OR
      p.tags ILIKE ${`%${query}%`} OR
      c.name ILIKE ${`%${query}%`} 
    )
    ORDER BY p.created_date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;

  return pets.rows.map(row => ({
    id: row.id,
    user_id: userId,
    customer_id: row.customer_id,
    name: row.pet_name,
    birthday: row.pet_birthday,
    specie: row.specie,
    race: row.race,
    gender: row.gender,
    sterelized: row.sterelized,
    insured: row.insured,
    tags: row.pet_tags,
    grooming: row.grooming,
    grooming_freq: row.grooming_freq,
    grooming_day: row.grooming_day,
    image_url: row.pet_image_url,
    created_date: row.pet_created_date,
    updated_date: row.pet_updated_date, // Assuming updated_date is the same as created_date in this context
    customer: {
      id: row.customer_id,
      user_id: userId,
      name: row.customer_name,
      dni: row.customer_dni,
      birthday: row.customer_birthday,
      email: row.customer_email,
      cellphone: row.customer_cellphone,
      department: row.customer_department,
      province: row.customer_province,
      district: row.customer_district,
      address: row.customer_address,
      tags: row.customer_tags,
      image_url: row.customer_image_url,
      created_date: row.customer_created_date,
      updated_date: row.customer_updated_date, // Assuming updated_date is the same as created_date in this context
    },
  }));
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
      FROM products1 p
      WHERE
        user_id = ${userId} AND (
          p.name ILIKE ${`%${query}%`} OR
          p.brand ILIKE ${`%${query}%`} OR
          p.category ILIKE ${`%${query}%`} OR
          p.sell_price::text ILIKE ${`%${query}%`}
        )
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of products.');
  }
}

export async function getAllProducts(query: string, currentPage: number, userId: string) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const products = await sql<Products>`
    SELECT 
      p.id,
      p.user_id,
      p.name,
      p.brand,
      p.measure_unit,
      p.presentation,
      p.content,
      p.supplier,
      p.bar_code,
      p.category,
      p.stock,
      p.sell_price,
      p.buy_price,
      p.status,
      p.image_url,
      p.created_date,
      p.updated_date
    FROM products1 p
    JOIN users u ON p.user_id = u.id
    WHERE
      p.user_id = ${userId} AND (
      p.name ILIKE ${`%${query}%`} OR
      p.brand ILIKE ${`%${query}%`} OR
      p.measure_unit ILIKE ${`%${query}%`} OR
      p.presentation ILIKE ${`%${query}%`} OR
      p.content ILIKE ${`%${query}%`} OR
      p.supplier ILIKE ${`%${query}%`} OR
      p.category ILIKE ${`%${query}%`} OR
      p.status::text ILIKE ${`%${query}%`} OR
      p.sell_price::text ILIKE ${`%${query}%`} OR
      p.buy_price::text ILIKE ${`%${query}%`}
    )
    ORDER BY p.name ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;

  return products.rows;
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

export async function getSalesPages(query: string, userId: string) {
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM sales s
      JOIN users u ON s.user_id = u.id
      WHERE
        user_id = ${userId} AND (
          s.status ILIKE ${`%${query}%`} OR
          s.total_price::text ILIKE ${`%${query}%`}
        )
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of products.');
  }
}

export async function getAllSales(query: string, currentPage: number, userId: string): Promise<SaleWithProducts[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  console.log('offset::: ', offset);

  const sales = await sql`
    SELECT
      s.id as sale_id,
      s.user_id,
      s.customer_id,
      c.name as customer_name,
      s.total_price,
      s.status,
      s.created_date,
      s.updated_date
    FROM sales s
    JOIN customers1 c ON s.customer_id = c.id
    WHERE s.user_id = ${userId}
    ORDER BY s.created_date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;

  // Ahora obtendremos los productos asociados a estas ventas
  const saleIds = sales.rows.map(sale => sale.sale_id);

  if (saleIds.length === 0) {
    return [];
  }

  const products = await sql`
    SELECT
      sp.sale_id,
      sp.product_id,
      p.name as product_name,
      sp.quantity
    FROM sales_products sp
    JOIN products1 p ON sp.product_id = p.id
  `;

  const salesMap: Record<string, SaleWithProducts> = {};

  sales.rows.forEach((sale) => {
    salesMap[sale.sale_id] = {
      id: sale.sale_id,
      user_id: sale.user_id,
      customer_id: sale.customer_id,
      customer_name: sale.customer_name,
      total_price: sale.total_price,
      status: sale.status,
      created_date: sale.created_date,
      updated_date: sale.updated_date,
      products: [],
    };
  });

  products.rows.forEach((product) => {
    if (salesMap[product.sale_id]) {
      salesMap[product.sale_id].products.push({
        product_id: product.product_id,
        product_name: product.product_name,
        quantity: product.quantity,
      });
    }
  });

  return Object.values(salesMap);
}

// export async function fetchAllSells(query: string, currentPage: number): Promise<SaleWithProductsType[]> {
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;

//   const sells = await sql`
//     SELECT
//       v.id AS venta_id,
//       v.user_id,
//       v.customer_id,
//       v.total,
//       v.fecha,
//       v.estado,
//       v.fecha_creacion,
//       vp.producto_id,
//       vp.cantidad,
//       vp.precio

//     FROM ventas v
//     JOIN ventas_productos vp ON v.id = vp.venta_id
    
//     ORDER BY v.fecha DESC
//     LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
//   `;

//   // Procesar los resultados y agrupar los productos por venta
//   const salesMap: { [key: string]: SaleWithProductsType } = {};

//   sells.rows.forEach(row => {
//     const ventaId = row.venta_id;

//     if (!salesMap[ventaId]) {
//       salesMap[ventaId] = {
//         venta: {
//           id: row.venta_id,
//           user_id: row.user_id,
//           customer_id: row.customer_id,
//           total: row.total,
//           fecha: new Date(row.fecha),
//           estado: row.estado,
//           fecha_creacion: new Date(row.fecha_creacion),
//         },
//         productos: [],
//       };
//     }

//     const product: SalesProductsTableType = {
//       venta_id: row.venta_id,
//       producto_id: row.producto_id,
//       cantidad: row.cantidad,
//       precio: row.precio,
//       producto_nombre: row.producto_nombre,
//       producto_marca: row.producto_marca,
//     };

//     salesMap[ventaId].productos.push(product);
//   });

//   // Convertir el mapa de ventas en un array
//   const salesWithProducts: SaleWithProductsType[] = Object.values(salesMap);

//   return salesWithProducts;
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