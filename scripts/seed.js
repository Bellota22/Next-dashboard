const { db } = require('@vercel/postgres');
const {
  customers,
  revenue,
  users,
  usuarios,
  mascotas,
  eventos,
  products
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

// async function seedCustomers(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//     // Create the "users" table if it doesn't exist
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS users (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email TEXT NOT NULL UNIQUE,
//         password TEXT NOT NULL
//       );
//     `;

//     console.log(`Created "users" table`);

//     // Insert data into the "users" table
//     const insertedUsers = await Promise.all(
//       users.map(async (user) => {
//         const hashedPassword = await bcrypt.hash(user.password, 10);
//         return client.sql`
//         INSERT INTO users (id, name, email, password)
//         VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//       }),
//     );

//     console.log(`Seeded ${insertedUsers.length} users`);

//     return {
//       createTable,
//       users: insertedUsers,
//     };
//   } catch (error) {
//     console.error('Error seeding users:', error);
//     throw error;
//   }
// }

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "clients" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        nombre VARCHAR(255),
        apellido VARCHAR(255),
        dni INT,
        fecha_nacimiento DATE,
        email VARCHAR(255) UNIQUE,
        celular VARCHAR(255),
        departamento VARCHAR(255),
        provincia VARCHAR(255),
        distrito VARCHAR(255),
        direccion VARCHAR(255),
        etiquetas VARCHAR(255),
        imagen_url VARCHAR(255),
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Insert data into the "customers" table
    const insertedClients = await Promise.all(
      customers.map(
        (c) => client.sql`
        INSERT INTO customers (id, nombre, apellido, fecha_nacimiento , dni, email ,celular ,departamento ,provincia ,distrito ,direccion ,etiquetas, imagen_url)
        VALUES (${c.id}, ${c.nombre}, ${c.apellido}, ${c.fecha_nacimiento}, ${c.dni}, ${c.email}, ${c.celular}, ${c.departamento}, ${c.provincia}, ${c.distrito}, ${c.direccion}, ${c.etiquetas}, ${c.imagen_url}) 
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedClients.length} clients`);

    return {
      createTable,
      clients: insertedClients,
    };
  } catch (error) {
    console.error('Error seeding clients:', error);
    throw error;
  }

}

async function seedMascotas(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "mascotas" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS mascotas (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        customer_id UUID NOT NULL,
        nombre VARCHAR(255),
        fecha_nacimiento DATE,
        especie VARCHAR(255),
        raza VARCHAR(255),
        sexo BOOLEAN,
        esterilizado BOOLEAN,
        asegurado BOOLEAN,
        grooming BOOLEAN,
        grooming_freq VARCHAR(255),
        grooming_dia VARCHAR(255),
        etiquetas VARCHAR(255),
        imagen_url VARCHAR(255),
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log(`Created "mascotas" table`);

    // Insert data into the "mascotas" table
    const insertedPets = await Promise.all(
      mascotas.map(
        (pet) => client.sql`
        INSERT INTO mascotas (id, customer_id, nombre, fecha_nacimiento, especie, raza, sexo, esterilizado, asegurado, grooming, grooming_freq, grooming_dia, etiquetas, imagen_url)
        VALUES (${pet.id}, ${pet.customer_id}, ${pet.nombre}, ${pet.fecha_nacimiento}, ${pet.especie}, ${pet.raza}, ${pet.sexo}, ${pet.esterilizado}, ${pet.asegurado}, ${pet.grooming}, ${pet.grooming_freq}, ${pet.grooming_dia}, ${pet.etiquetas}, ${pet.imagen_url})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedPets.length} pets`);

    return {
      createTable,
      pets: insertedPets,
    };
  } catch (error) {
    console.error('Error seeding pets:', error);
    throw error;
  }

}

async function seedEventos(client) {
  
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "eventos" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS eventos (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        customer_id UUID NOT NULL,
        mascota_id UUID NOT NULL,
        titulo VARCHAR(255) NOT NULL,
        observaciones TEXT,
        tipo VARCHAR(255) NOT NULL,
        estado VARCHAR(255) NOT NULL,
        notificar_correo BOOLEAN NOT NULL,
        notificar_fecha VARCHAR(255),
        fecha_inicio DATE NOT NULL,
        fecha_fin DATE NOT NULL,
        color VARCHAR(255),
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;


    // Insert data into the "eventos" table
    const insertedEvents = await Promise.all(
      eventos.map(
        (event) => client.sql`
        INSERT INTO eventos (customer_id, mascota_id, titulo, observaciones, tipo, estado, notificar_correo, notificar_fecha, fecha_inicio, fecha_fin, color)
        VALUES (${event.customer_id}, ${event.mascota_id}, ${event.titulo}, ${event.observaciones}, ${event.tipo}, ${event.estado}, ${event.notificar_correo}, ${event.notificar_fecha}, ${event.fecha_inicio}, ${event.fecha_fin}, ${event.color})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedEvents.length} events`);

    return {
      createTable,
      events: insertedEvents,
    };
  } catch (error) {
    console.error('Error seeding events:', error);
    throw error;
  }
}

async function seedProducts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "products" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID,
        nombre VARCHAR(255),
        marca VARCHAR(255),
        unidad_medida VARCHAR(50),
        presentacion VARCHAR(50),
        contenido VARCHAR(255),
        proveedor VARCHAR(255),
        codigo_barras VARCHAR(255) UNIQUE,
        categoria VARCHAR(255),
        subcategoria VARCHAR(255),
        min_stock INT,
        max_stock INT,
        precio_compra DECIMAL,
        precio_venta DECIMAL,
        estado BOOLEAN DEFAULT TRUE,
        imagen_url VARCHAR(255),
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Insert data into the "products" table
    const insertedProducts = await Promise.all(
      products.map(
        (p) => client.sql`
        INSERT INTO products (id, user_id, nombre, marca, unidad_medida, presentacion, contenido, proveedor, codigo_barras, categoria, subcategoria, min_stock, max_stock, precio_compra, precio_venta, estado, imagen_url)
        VALUES (${p.id}, ${p.user_id}, ${p.nombre}, ${p.marca}, ${p.unidad_medida}, ${p.presentacion}, ${p.contenido}, ${p.proveedor}, ${p.codigo_barras}, ${p.categoria}, ${p.subcategoria}, ${p.min_stock}, ${p.max_stock}, ${p.precio_compra}, ${p.precio_venta}, ${p.estado}, ${p.imagen_url}) 
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedProducts.length} products`);

    return {
      createTable,
      products: insertedProducts,
    };
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
}
async function main() {
  const client = await db.connect();

  // await seedClients(client);
  // await seedCustomers(client);
  // await seedMascotas(client);
  // await seedEventos(client);
  // await seedCustomers(client);
  await seedProducts(client);


  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
