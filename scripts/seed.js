const { db } = require('@vercel/postgres');
const {
  customers,
  sales,
  users,
  usuarios,
  salesProducts,
  mascotas,
  eventos,
  products
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcryptjs');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        status BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password, status)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.status})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedProducts(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "products" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS products1 (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID,
        name VARCHAR(255),
        brand VARCHAR(255),
        measure_unit VARCHAR(255),
        presentation VARCHAR(255),
        content VARCHAR(255),
        supplier VARCHAR(255),
        bar_code VARCHAR(255),
        category VARCHAR(255),
        stock INTEGER,
        sell_price DECIMAL,
        buy_price DECIMAL,
        status BOOLEAN DEFAULT TRUE,
        image_url VARCHAR(255),
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `;

    // Insert data into the "products" table
    const insertedProducts = await Promise.all(
      products.map(
        (p) => client.sql`
        INSERT INTO products1 (id, user_id, name, brand, measure_unit, presentation, content, supplier, bar_code, category, stock, sell_price, buy_price, status, image_url)
        VALUES (${p.id}, ${p.user_id}, ${p.name}, ${p.brand}, ${p.measure_unit}, ${p.presentation}, ${p.content}, ${p.supplier}, ${p.bar_code}, ${p.category}, ${p.stock}, ${p.sell_price}, ${p.buy_price}, ${p.status}, ${p.image_url}) 
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

async function seedCustomers(client) {  
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "clients" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers1 (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID,
        name VARCHAR(255),
        dni INT UNIQUE,
        birthday DATE,
        email VARCHAR(255) UNIQUE,
        cellphone VARCHAR(255),
        department VARCHAR(255),
        province VARCHAR(255),
        district VARCHAR(255),
        address VARCHAR(255),
        tags VARCHAR(255),
        image_url VARCHAR(255),
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `;

    const insertedClients = await Promise.all(
      customers.map(
        (c) => client.sql`
        INSERT INTO customers1 (id, user_id, name, dni, birthday, email, cellphone, department, province, district, address, tags, image_url)
        VALUES (${c.id}, ${c.user_id}, ${c.name}, ${c.dni}, ${c.birthday}, ${c.email}, ${c.cellphone}, ${c.department}, ${c.province}, ${c.district}, ${c.address}, ${c.tags}, ${c.image_url}) 
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

async function seedSales(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Crear tabla de ventas
    await client.sql`
      CREATE TABLE IF NOT EXISTS sales (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id  UUID,
        customer_id UUID,
        status VARCHAR(255),
        total_price DECIMAL,
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (customer_id) REFERENCES customers1(id)
      );
    `;

    // Crear tabla intermedia sales_productos
    await client.sql`
      CREATE TABLE IF NOT  EXISTS sales_products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id  UUID,
        product_id UUID,
        sale_id UUID,
        quantity INT,
        total_price DECIMAL,
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (product_id) REFERENCES products1(id),
        FOREIGN KEY (sale_id) REFERENCES sales(id)
      );
    `;

    // Insertar datos en la tabla de sales
    const insertedSales = await Promise.all(
      sales.map((r) =>
        client.sql`
          INSERT INTO sales (
            id,
            user_id,
            customer_id,
            status,
            total_price
          )
          VALUES (
            ${r.id}, 
            ${r.user_id}, 
            ${r.customer_id}, 
            ${r.status}, 
            ${r.total_price}
          )
          ON CONFLICT (id) DO NOTHING;
        `
      )
    );

    // Insertar datos en la tabla intermedia sales_productos
    const insertedSalesProducts = await Promise.all(
      salesProducts.map((sp) =>
        client.sql`
          INSERT INTO sales_products (
            id,
            user_id,
            product_id,
            sale_id,
            quantity,
            total_price
          )
          VALUES (
            ${sp.id},
            ${sp.user_id},
            ${sp.product_id},
            ${sp.sale_id},
            ${sp.quantity},
            ${sp.total_price})
          ON CONFLICT (id) DO NOTHING;
        `
      )
    );

    console.log(`Seeded ${insertedSales.length} sales`);
    console.log(`Seeded ${insertedSalesProducts.length} sales products`);

    return {
      insertedSales,
      insertedSalesProducts,
    };
  } catch (error) {
    console.error('Error seeding sales:', error);
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
async function seedProducts1(client) {
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
        stock FLOAT,
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
        INSERT INTO products (id, user_id, nombre, marca, unidad_medida, presentacion, contenido, proveedor, codigo_barras, categoria, subcategoria, stock, precio_compra, precio_venta, estado, imagen_url)
        VALUES (${p.id}, ${p.user_id}, ${p.nombre}, ${p.marca}, ${p.unidad_medida}, ${p.presentacion}, ${p.contenido}, ${p.proveedor}, ${p.codigo_barras}, ${p.categoria}, ${p.subcategoria}, ${p.stock}, ${p.precio_compra}, ${p.precio_venta}, ${p.estado}, ${p.imagen_url}) 
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

async function seedVentas(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Crear tabla de ventas
    await client.sql`
      CREATE TABLE IF NOT EXISTS ventas (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID,
        customer_id UUID,
        total DECIMAL,
        fecha DATE,
        estado BOOLEAN DEFAULT TRUE,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Crear tabla intermedia ventas_productos
    await client.sql`
      CREATE TABLE IF NOT EXISTS ventas_productos (
        venta_id UUID REFERENCES ventas(id),
        producto_id UUID,
        cantidad INT,
        precio DECIMAL,
        PRIMARY KEY (venta_id, producto_id)
      );
    `;

    // Insertar datos en la tabla de ventas
    const insertedSales = await Promise.all(
      sales.map((r) =>
        client.sql`
          INSERT INTO ventas (id, user_id, customer_id, total, fecha)
          VALUES (${r.id}, ${r.user_id}, ${r.customer_id}, ${r.total}, ${r.fecha})
          ON CONFLICT (id) DO NOTHING;
        `
      )
    );

    // Insertar datos en la tabla intermedia ventas_productos
    const insertedSalesProducts = await Promise.all(
      salesProducts.map((sp) =>
        client.sql`
          INSERT INTO ventas_productos (venta_id, producto_id, cantidad, precio)
          VALUES (${sp.venta_id}, ${sp.producto_id}, ${sp.cantidad}, ${sp.precio})
          ON CONFLICT (venta_id, producto_id) DO NOTHING;
        `
      )
    );

    console.log(`Seeded ${insertedSales.length} sales`);
    console.log(`Seeded ${insertedSalesProducts.length} sales products`);

    return {
      insertedSales,
      insertedSalesProducts,
    };
  } catch (error) {
    console.error('Error seeding sales:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();

  // await seedEventos(client);
  // await seedMascotas(client);
  // await seedUsers(client);
  await seedCustomers(client);
  await seedProducts(client);
  await seedSales(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
