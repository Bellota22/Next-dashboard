// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data

const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');
const usersIds = ['410544b2-4001-4271-9855-fec4b6a6442a'];

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
    status: true,
  },
  {
    id: '310544b2-4001-4271-9855-fec4b6a64422',
    name: 'Gabriel Villanueva',
    email: 'gvillanuevavega@gmail.com',
    password: '123456',
    status: true,
  },
  {
    id: '210544b2-4001-4271-9855-fec4b6a64422',
    name: 'Carlos Gamero',
    email: 'cyjys87@gmail.com',
    password: '123456',
    status: true,
  },
  {
    id: '110544b2-4001-4271-9855-fec4b6a64422',
    name: 'Christopher Melendez',
    email: 'chr.melendezl@gmail.com',
    password: '123456',
    status: true,
  },
   
];

function generateRandomCustomer(userId) {
  return {
    id: uuidv4(),
    user_id: userId,
    name: faker.person.firstName() + ' ' + faker.person.lastName(),
    dni: faker.number.int({ min: 10000000, max: 99999999 }),
    birthday: faker.date.anytime(),
    email: faker.internet.email(),
    cellphone: faker.number.int({ min: 10000000, max: 99999999 }),
    department: faker.location.state(),
    province: faker.location.city(),
    district: faker.location.county(),
    address: faker.location.streetAddress(),
    tags: faker.helpers.arrayElement(['nuevo', 'frecuente', 'vip']),
    image_url: faker.image.avatar(),

  };
}

function generateRandomCustomers(userIds, count) {
  const customers = [];
  for (let i = 0; i < count; i++) {
    const userId = faker.helpers.arrayElement(userIds);
    customers.push(generateRandomCustomer(userId));
    console.log(`Generated ${i + 1}/${count} customers`);

  }
  return customers;
}
const customers = generateRandomCustomers(usersIds, 50); // Genera 10 clientes aleatorios



function generateRandomPet(userId, customerId) {
  return {
    id: uuidv4(),
    user_id: userId,
    customer_id: customerId,
    name: faker.person.firstName(),
    birthday: faker.date.anytime(),
    specie: faker.helpers.arrayElement(['Perro', 'Gato', 'Ave', 'Reptil']),
    race: faker.animal.dog(), // Puedes cambiar esto para diferentes especies
    gender: faker.helpers.arrayElement([true, false]), // true para macho, false para hembra
    sterelized: faker.helpers.arrayElement([true, false]),
    insured: faker.helpers.arrayElement([true, false]),
    tags: faker.helpers.arrayElement(['nuevo', 'frecuente', 'vip']),
    image_url: faker.image.urlLoremFlickr({ category: 'animals' }),
    grooming: faker.helpers.arrayElement([true, false]),
    grooming_freq: faker.helpers.arrayElement(['Semanal', 'Quincenal', 'Mensual']),
    grooming_day: faker.helpers.arrayElement(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']),
  };
}

function generateRandomPets(userIds, customerIds, count) {
  const pets = [];
  for (let i = 0; i < count; i++) {
    const userId = faker.helpers.arrayElement(userIds);
    const customerId = faker.helpers.arrayElement(customerIds);
    pets.push(generateRandomPet(userId, customerId));
    console.log(`Generated ${i + 1}/${count} pets`);
  }
  return pets;
}

const customerIds = customers.map(customer => customer.id); // Obtener los IDs de los clientes generados
const pets = generateRandomPets(usersIds, customerIds, 50); // Genera 50 mascotas aleatorias

function generateRandomProduct(userId) {
  return {
    id: uuidv4(),
    user_id: userId,
    name: faker.commerce.productName(),
    brand: faker.company.name(),
    measure_unit: faker.helpers.arrayElement(['kg', 'ltr', 'pcs', 'box']),
    presentation: faker.helpers.arrayElement(['Botella', 'Caja', 'Bolsa', 'Tarro']),
    content: faker.commerce.productDescription(),
    supplier: faker.company.name(),
    bar_code: faker.string.uuid(),
    category: faker.commerce.department(),
    stock: faker.number.int({ min: 0, max: 1000 }),
    sell_price: faker.number.float({ min: 1, max: 1000, precision: 0.01 }),
    buy_price: faker.number.float({ min: 1, max: 500, precision: 0.01 }),
    status: faker.helpers.arrayElement([true, false]),
    image_url: faker.image.urlLoremFlickr({ category: 'products' }),
  };
}

function generateRandomProducts(userIds, count) {
  const products = [];
  for (let i = 0; i < count; i++) {
    const userId = faker.helpers.arrayElement(userIds);
    products.push(generateRandomProduct(userId));
    console.log(`Generated ${i + 1}/${count} products`);
  }
  return products;
}

const products = generateRandomProducts(usersIds, 50); // Generates 50 random products


// const eventos = [
//   {
//     customer_id: customers[0].id,
//     mascota_id: mascotas[0].id,
//     titulo: 'Consulta veterinaria',
//     tipo: 'Salud',
//     status: 'Pendiente',
//     observaciones: 'Firulais necesita vacuna contra la rabia',
//     notificar_correo: true,
//     notificar_fecha: '2024-07-01T10:00:00Z',
//     fecha_inicio: new Date('2024-07-01T10:00:00Z'),
//     fecha_fin: new Date('2024-07-01T11:00:00Z'),
//     color: 'azul',
//   },
//   {
//     customer_id: customers[0].id,
//     mascota_id: mascotas[1].id,
//     titulo: 'Vacunación',
//     tipo: 'Salud',
//     status: 'Completado',
//     observaciones: 'Firulais necesita vacuna contra la rabia',
//     notificar_correo: false,
//     notificar_fecha: '2024-07-15T15:00:00Z',
//     fecha_inicio: new Date('2024-07-15T15:00:00Z'),
//     fecha_fin: new Date('2024-07-15T16:00:00Z'),
//     color: 'verde',
//   },
//   {
//     customer_id: customers[1].id,
//     mascota_id: mascotas[2].id,
//     titulo: 'Chequeo general',
//     tipo: 'Salud',
//     status: 'Pendiente',
//     observaciones: 'Firulais necesita vacuna contra la rabia',
//     notificar_correo: true,
//     notificar_fecha: '2024-06-30T09:00:00Z',
//     fecha_inicio: new Date('2024-06-30T09:00:00Z'),
//     fecha_fin: new Date('2024-06-30T10:00:00Z'),
//     color: 'amarillo',
//   },
//   {
//     customer_id: customers[1].id,
//     mascota_id: mascotas[2].id,
//     titulo: 'Desparasitación',
//     tipo: 'Salud',
//     status: 'Pendiente',
//     observaciones: 'Firulais necesita vacuna contra la rabia',
//     notificar_correo: false,
//     notificar_fecha: '2024-08-10T14:00:00Z',
//     fecha_inicio: new Date('2024-08-10T14:00:00Z'),
//     fecha_fin: new Date('2024-08-10T15:00:00Z'),
//     color: 'rojo',
//   },
// ];

const sales = [
  {
    id: uuidv4(),
    user_id: users[0].id,
    customer_id: customers[0].id,
    status: 'completed',
    total_price: 60
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    customer_id: customers[1].id,
    status: 'pending',
    total_price: 60
  },
];

const salesProducts = [
  {
    id: uuidv4(),
    user_id: users[0].id,
    product_id: products[0].id,
    sale_id: sales[0].id,
    quantity: 2,
    total_price: 40, 
  },
  {
    id: uuidv4(),
    user_id: users[0].id,
    product_id: products[1].id,
    sale_id: sales[0].id,
    quantity: 1,
    total_price: 40, 
  },
  {
    id: uuidv4(),
    user_id: users[0].id,
    product_id: products[2].id,
    sale_id: sales[0].id,
    quantity: 3,
    total_price: 40, 
  },
  {
    id: uuidv4(),
    user_id: users[0].id,
    product_id: products[0].id,
    sale_id: sales[1].id,
    quantity: 1,
    total_price: 40, 
  },
];



module.exports = {
  users,
  customers,
  sales,
  products,
  salesProducts,
  pets,
  
};
