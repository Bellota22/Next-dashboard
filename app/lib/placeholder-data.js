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
    secured: faker.helpers.arrayElement([true, false]),
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

const products = [
  {
    id: uuidv4(),
    user_id: users[0].id,
    name: 'Product 1',
    brand: 'Brand 1',
    measure_unit: 'YD',
    presentation: 'botella',
    content: 'agua',
    supplier: 'supplier 1',
    bar_code: uuidv4(),
    category: 'category 1',
    stock: 100,
    sell_price: 100,
    buy_price: 20,
    status: true,
    image_url: 'string',

  },
  {
    id: uuidv4(),
    user_id: users[0].id,
    name: 'Product 2',
    brand: 'Brand 2',
    measure_unit: 'KG',
    presentation: 'paquete',
    content: 'arroz',
    supplier: 'supplier 2',
    bar_code: uuidv4(),
    category: 'category 2',
    stock: 200,
    sell_price: 105,
    buy_price: 30,
    status: true,
    image_url: 'string',

  },
  {
    id: uuidv4(),
    user_id: users[0].id,
    name: 'Product 3',
    brand: 'Brand 3',
    measure_unit: 'L',
    presentation: 'garrafa',
    content: 'aceite',
    supplier: 'supplier 3',
    bar_code: uuidv4(),
    category: 'category 3',
    stock: 50,
    sell_price: 200,
    buy_price: 40,
    status: true,
    image_url: 'string',

  },
  {
    id: uuidv4(),
    user_id: users[0].id,
    name: 'Product 4',
    brand: 'Brand 4',
    measure_unit: 'M',
    presentation: 'rollo',
    content: 'papel',
    supplier: 'supplier 4',
    bar_code: uuidv4(),
    category: 'category 4',
    stock: 300,
    sell_price: 205,
    buy_price: 50,
    status: true,
    image_url: 'string',

  },
  {
    id: uuidv4(),
    user_id: users[0].id,
    name: 'Product 5',
    brand: 'Brand 5',
    measure_unit: 'CM',
    presentation: 'caja',
    content: 'juguetes',
    supplier: 'supplier 5',
    bar_code: uuidv4(),
    category: 'category 5',
    stock: 150,
    sell_price: 300,
    buy_price: 60,
    status: true,
    image_url: 'string',

  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    name: 'Product 7',
    brand: 'Brand 7',
    measure_unit: 'CM',
    presentation: 'caja',
    content: 'juguetes',
    supplier: 'supplier 7',
    bar_code: uuidv4(),
    category: 'category 7',
    stock: 150,
    sell_price: 300,
    buy_price: 60,
    status: true,
    image_url: 'string',

  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    name: 'Product 8',
    brand: 'Brand 8',
    measure_unit: 'CM',
    presentation: 'caja',
    content: 'juguetes',
    supplier: 'supplier 8',
    bar_code: uuidv4(),
    category: 'category 8',
    stock: 150,
    sell_price: 300,
    buy_price: 60,
    status: true,
    image_url: 'string',

  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    name: 'Product 9',
    brand: 'Brand 9',
    measure_unit: 'CM',
    presentation: 'caja',
    content: 'juguetes',
    supplier: 'supplier 9',
    bar_code: uuidv4(),
    category: 'category 9',
    stock: 150,
    sell_price: 300,
    buy_price: 60,
    status: true,
    image_url: 'string',

  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    name: 'Product 10',
    brand: 'Brand 10',
    measure_unit: 'CM',
    presentation: 'caja',
    content: 'juguetes',
    supplier: 'supplier 10',
    bar_code: uuidv4(),
    category: 'category 10',
    stock: 150,
    sell_price: 300,
    buy_price: 60,
    status: true,
    image_url: 'string',

  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    name: 'Product 11',
    brand: 'Brand 11',
    measure_unit: 'CM',
    presentation: 'caja',
    content: 'juguetes',
    supplier: 'supplier 11',
    bar_code: uuidv4(),
    category: 'category 11',
    stock: 150,
    sell_price: 300,
    buy_price: 60,
    status: true,
    image_url: 'string',
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    name: 'Product 12',
    brand: 'Brand 12',
    measure_unit: 'CM',
    presentation: 'caja',
    content: 'juguetes',
    supplier: 'supplier 12',
    bar_code: uuidv4(),
    category: 'category 12',
    stock: 150,
    sell_price: 300,
    buy_price: 60,
    status: true,
    image_url: 'string',
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    name: 'Product 13',
    brand: 'Brand 13',
    measure_unit: 'CM',
    presentation: 'caja',
    content: 'juguetes',
    supplier: 'supplier 13',
    bar_code: uuidv4(),
    category: 'category 13',
    stock: 150,
    sell_price: 300,
    buy_price: 60,
    status: true,
    image_url: 'string',
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    name: 'Product 14',
    brand: 'Brand 14',
    measure_unit: 'CM',
    presentation: 'caja',
    content: 'juguetes',
    supplier: 'supplier 14',
    bar_code: uuidv4(),
    category: 'category 14',
    stock: 150,
    sell_price: 300,
    buy_price: 60,
    status: true,
    image_url: 'string',
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    name: 'Product 15',
    brand: 'Brand 15',
    measure_unit: 'CM',
    presentation: 'caja',
    content: 'juguetes',
    supplier: 'supplier 15',
    bar_code: uuidv4(),
    category: 'category 15',
    stock: 150,
    sell_price: 300,
    buy_price: 60,
    status: true,
    image_url: 'string',
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    name: 'Product 16',
    brand: 'Brand 16',
    measure_unit: 'CM',
    presentation: 'caja',
    content: 'juguetes',
    supplier: 'supplier 16',
    bar_code: uuidv4(),
    category: 'category 16',
    stock: 150,
    sell_price: 300,
    buy_price: 60,
    status: true,
    image_url: 'string',
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    name: 'Product 17',
    brand: 'Brand 17',
    measure_unit: 'CM',
    presentation: 'caja',
    content: 'juguetes',
    supplier: 'supplier 17',
    bar_code: uuidv4(),
    category: 'category 17',
    stock: 150,
    sell_price: 300,
    buy_price: 60,
    status: true,
    image_url: 'string',
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    name: 'Product 18',
    brand: 'Brand 18',
    measure_unit: 'CM',
    presentation: 'caja',
    content: 'juguetes',
    supplier: 'supplier 18',
    bar_code: uuidv4(),
    category: 'category 18',
    stock: 150,
    sell_price: 300,
    buy_price: 60,
    status: true,
    image_url: 'string',
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    name: 'Product 19',
    brand: 'Brand 19',
    measure_unit: 'CM',
    presentation: 'caja',
    content: 'juguetes',
    supplier: 'supplier 19',
    bar_code: uuidv4(),
    category: 'category 19',
    stock: 150,
    sell_price: 300,
    buy_price: 60,
    status: true,
    image_url: 'string',
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    name: 'Product 20',
    brand: 'Brand 20',
    measure_unit: 'CM',
    presentation: 'caja',
    content: 'juguetes',
    supplier: 'supplier 20',
    bar_code: uuidv4(),
    category: 'category 20',
    stock: 150,
  }
];


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
