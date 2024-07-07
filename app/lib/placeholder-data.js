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

//customers
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

//pets

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


function generateRandomMedicalHistory(userId, petId) {
  return {

    id: uuidv4(),
    user_id: userId,
    pet_id: petId,
    date: faker.date.anytime(),
    reason: faker.helpers.arrayElement(['Consulta', 'Control', 'Cirugía', 'Vacuna', 'Desparasitación', 'Internamiento', 'Triaje', 'Profilaxis', 'Defunción', 'Exámenes']),
    anamnesis: faker.lorem.sentence(),
    weight: faker.number.float({ min: 1, max: 100, multipleOf: 0.01 }),
    respiratory_rate: faker.number.int({ min: 1, max: 100 }),
    heart_rate: faker.number.int({ min: 1, max: 100 }),
    temperature: faker.number.float({ min: 1, max: 100, multipleOf: 0.01 }),
    rectal_test: faker.lorem.sentence(),
    arterial_pressure: faker.number.int({ min: 1, max: 100 }),
    filled_hair_time: faker.number.int({ min: 1, max: 100 }),
    dehydration: faker.number.int({ min: 1, max: 100 }),
    clinical_test:  faker.lorem.sentence(),
    diagnosis:  faker.lorem.sentence(),
    auxiliary_test:  faker.lorem.sentence(),
    treatment:  faker.lorem.sentence(),
    prescription:  faker.lorem.sentence(),
    observation:  faker.lorem.sentence(),
    created_date:  faker.date.anytime(),
    updated_date:  faker.date.anytime(),
  };
}

function generateRandomMedicalHistories(userIds, petIds, count) {
  const medicalHistories = [];
  for (let i = 0; i < count; i++) {
    const userId = faker.helpers.arrayElement(userIds);
    const petId = faker.helpers.arrayElement(petIds);
    medicalHistories.push(generateRandomMedicalHistory(userId, petId));
    console.log(`Generated ${i + 1}/${count} medical histories`);
  }
  return medicalHistories;
}

const petIds = pets.map(pet => pet.id); // Obtener los IDs de las mascotas generadas
const medicalHistories = generateRandomMedicalHistories(usersIds, petIds, 50); // Genera 50 historias clínicas aleatorias

//products

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
    bar_code:  faker.commerce.productAdjective(),
    category: faker.commerce.department(),
    stock: faker.number.int({ min: 0, max: 1000 }),
    sell_price: faker.number.float({ min: 1, max: 1000, multipleOf: 0.01 }),
    buy_price: faker.number.float({ min: 1, max: 500, multipleOf: 0.01 }),
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

//sales

function generateRandomSale(userId, customerId) {
  return {
    id: uuidv4(),
    user_id: userId,
    customer_id: customerId,
    status: faker.helpers.arrayElement(['completed', 'pending', 'cancelled']),
    total_price: faker.number.float({ min: 1, max: 1000, multipleOf: 0.01 }),
  };
}

function generateRandomSales(userIds, customerIds, count) {
  const sales = [];
  for (let i = 0; i < count; i++) {
    const userId = faker.helpers.arrayElement(userIds);
    const customerId = faker.helpers.arrayElement(customerIds);
    sales.push(generateRandomSale(userId, customerId));
    console.log(`Generated ${i + 1}/${count} sales`);
  }
  return sales;
}

const saleCustomerIds = customers.map(customer => customer.id); // Get the IDs of the generated customers
const sales = generateRandomSales(usersIds, saleCustomerIds, 50); // Generates 50 random sales


function generateRandomSalesProduct(userId, productId, saleId) {
  return {
    id: uuidv4(),
    user_id: userId,
    product_id: productId,
    sale_id: saleId,
    quantity: faker.number.int({ min: 1, max: 10 }),
    total_price: faker.number.float({ min: 1, max: 1000, multipleOf: 0.01 }),
  };
}

function generateRandomSalesProducts(userIds, productIds, saleIds, count) {
  const salesProducts = [];
  for (let i = 0; i < count; i++) {
    const userId = faker.helpers.arrayElement(userIds);
    const productId = faker.helpers.arrayElement(productIds);
    const saleId = faker.helpers.arrayElement(saleIds);
    salesProducts.push(generateRandomSalesProduct(userId, productId, saleId));
    console.log(`Generated ${i + 1}/${count} sales products`);
  }
  return salesProducts;
}

const productIds = products.map(product => product.id); // Get the IDs of the generated products
const saleIds = sales.map(sale => sale.id); // Get the IDs of the generated sales
const salesProducts = generateRandomSalesProducts(usersIds, productIds, saleIds, 50); // Generates 50 random sales products


//vets

function generateRandomVet(userId) {
  return {
    id: uuidv4(),
    user_id: userId,
    name: faker.person.firstName() + ' ' + faker.person.lastName(),
    email: faker.internet.email(),
    dni: faker.number.int({ min: 10000000, max: 99999999 }),
    cellphone: faker.number.int({ min: 10000000, max: 99999999 }),
    address: faker.location.streetAddress(),
    image_url: faker.image.avatar(),   
    specialties: faker.helpers.arrayElement(['Medicina General', 'Cirugía', 'Dermatología', 'Oftalmología', 'Cardiología', 'Neurología', 'Oncología', 'Nutrición', 'Odontología', 'Rehabilitación', 'Urgencias']),     
  };
}

function generateRandomVets(userIds, count) {
  const vets = [];
  for (let i = 0; i < count; i++) {
    const userId = faker.helpers.arrayElement(userIds);
    vets.push(generateRandomVet(userId));
    console.log(`Generated ${i + 1}/${count} vets`);
  }
  return vets;
}

const vets = generateRandomVets(usersIds, 50); // Generates 50 random vets


function generateVetSchedule(userId, vetId) {

  const day = faker.date.recent();
  const start = new Date(day.getFullYear(), day.getMonth(), day.getDate(), faker.number.int({ min: 8, max: 12 }), 0);
  const end = new Date(day.getFullYear(), day.getMonth(), day.getDate(), faker.number.int({ min: 13, max: 18 }), 0);
  
  return {
    id: uuidv4(),
    user_id: userId,
    vet_id: vetId,
    title: faker.lorem.sentence(),
    start_time: start,
    end_time: end,
    status: faker.datatype.boolean({probability: 0.8}),
  };
}
function generateRandomVetSchedules(userIds, vetIds, count) {
  const vetSchedules = [];
  for (let i = 0; i < count; i++) {
    const userId = faker.helpers.arrayElement(userIds);
    const vetId = faker.helpers.arrayElement(vetIds);
    vetSchedules.push(generateVetSchedule(userId, vetId));
    console.log(`Generated ${i + 1}/${count} vet schedules`);
  }
  return vetSchedules;
}

const vetIds = vets.map(vet => vet.id); // Obtener los IDs de los veterinarios generados
const vetSchedules = generateRandomVetSchedules(usersIds, vetIds, 50); // Genera 50 horarios de veterinarios aleatorios


module.exports = {
  users,
  customers,
  sales,
  products,
  salesProducts,
  pets,
  medicalHistories,
  vets,
  vetSchedules
  
};
