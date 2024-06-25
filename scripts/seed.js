const { db } = require('@vercel/postgres');
const {
  customers,
  revenue,
  users,
  usuarios,
  mascotas,
  eventos
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


async function seedCustomers2(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedRevenue(client) {
  try {
    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

    console.log(`Created "revenue" table`);

    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  // await seedClients(client);
  await seedCustomers(client);
  await seedMascotas(client);
  // await seedEventos(client);
  // await seedCustomers(client);
  // await seedInvoices(client);
  // await seedRevenue(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
