const { db } = require('@vercel/postgres');
const {
  sales,
  users,
  medicalHistories,
  salesProducts,
  customers,
  pets,
  products,
  vets
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
      CREATE TABLE IF NOT EXISTS products (
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
        INSERT INTO products (id, user_id, name, brand, measure_unit, presentation, content, supplier, bar_code, category, stock, sell_price, buy_price, status, image_url)
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
      CREATE TABLE IF NOT EXISTS customers (
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
    console.log(`Created "customers" table`);

    const insertedClients = await Promise.all(
      customers.map(
        (c) => client.sql`
        INSERT INTO customers (id, user_id, name, dni, birthday, email, cellphone, department, province, district, address, tags, image_url)
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
        FOREIGN KEY (customer_id) REFERENCES customers(id)
      );
    `;
    console.log(`Created "sales" table`);

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
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (sale_id) REFERENCES sales(id)
      );
    `;
    console.log(`Created "sales_products" table`);

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

async function seedPets(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "pets" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS pets (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID,
        customer_id UUID NOT NULL,
        name VARCHAR(255),
        birthday DATE,
        specie VARCHAR(255),
        race VARCHAR(255),
        gender BOOLEAN,
        sterelized BOOLEAN,
        insured BOOLEAN,
        tags VARCHAR(255),
        image_url VARCHAR(255),
        grooming BOOLEAN,
        grooming_freq VARCHAR(255),
        grooming_day VARCHAR(255),
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (customer_id) REFERENCES customers(id)
      );
    `;

    console.log(`Created "pets" table`);

    // Insert data into the "pets" table
    const insertedPets = await Promise.all(
      pets.map(
        (pet) => client.sql`
        INSERT INTO pets (
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
          image_url,
          grooming,
          grooming_freq,
          grooming_day
        )
        VALUES (
          ${pet.id},
          ${pet.user_id},
          ${pet.customer_id},
          ${pet.name},
          ${pet.birthday},
          ${pet.specie},
          ${pet.race},
          ${pet.gender},
          ${pet.sterelized},
          ${pet.insured},
          ${pet.tags},
          ${pet.image_url},
          ${pet.grooming},
          ${pet.grooming_freq},
          ${pet.grooming_day}
        )
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

async function seedVets(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "vets" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS vets (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID,
        name VARCHAR(255),
        email TEXT UNIQUE,
        dni INT UNIQUE,
        cellphone VARCHAR(255),
        address VARCHAR(255),
        image_url VARCHAR(255),
        specialties VARCHAR(255),
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)

      );
    `;

    const insertedVets = await Promise.all(
      vets.map(async (vet) => {
        return client.sql`
        INSERT INTO vets (id, user_id, name, email, dni, cellphone, address, image_url, specialties)
        
        VALUES (
          ${vet.id},
          ${vet.user_id},
          ${vet.name},
          ${vet.email},
          ${vet.dni},
          ${vet.cellphone},
          ${vet.address},
          ${vet.image_url},
          ${vet.specialties}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedVets.length} vets`);

    return {
      createTable,
      vets: insertedVets,
    };
  } catch (error) {
    console.error('Error seeding vets:', error);
    throw error;
  }

}

async function seedMedicalHistories(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "medical_histories" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS medical_histories (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID,
        pet_id UUID,
        date TIMESTAMP,
        reason TEXT,
        anamnesis TEXT,
        weight DECIMAL, 
        respiratory_rate INTEGER, 
        heart_rate INTEGER, 
        temperature DECIMAL, 
        rectal_test TEXT, 
        arterial_pressure TEXT, 
        filled_hair_time TEXT, 
        dehydration TEXT, 
        clinical_test TEXT,
        diagnosis TEXT,
        auxiliary_test TEXT,
        treatment TEXT,
        prescription TEXT,
        observation TEXT,
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (pet_id) REFERENCES pets(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `;

    console.log(`Created "medical_histories" table`);

    // Insert data into the "medical_histories" table
    const insertedMedicalHistories = await Promise.all(
      medicalHistories.map(
        (mh) => client.sql`
        INSERT INTO medical_histories (
          id,
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
          observation
        )
        VALUES (
          ${mh.id},
          ${mh.user_id},
          ${mh.pet_id},
          ${mh.date},
          ${mh.reason},
          ${mh.anamnesis},
          ${mh.weight},
          ${mh.respiratory_rate},
          ${mh.heart_rate},
          ${mh.temperature},
          ${mh.rectal_test},
          ${mh.arterial_pressure},
          ${mh.filled_hair_time},
          ${mh.dehydration},
          ${mh.clinical_test},
          ${mh.diagnosis},
          ${mh.auxiliary_test},
          ${mh.treatment},
          ${mh.prescription},
          ${mh.observation}
          
        )
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedMedicalHistories.length} medical histories`);

    return {
      createTable,
      medicalHistories: insertedMedicalHistories,
    };
  } catch (error) {
    console.error('Error seeding medical histories:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  // await seedEventos(client);
  // await seedUsers(client);
  // await seedCustomers(client);
  // await seedPets(client);
  // await seedMedicalHistories(client);
  // await seedProducts(client);
  // await seedSales(client);
  await seedVets(client);
  await client.end();
}
// DROP TABLE IF EXISTS customers, products, sales, sales_products, pets, medical_histories
main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
