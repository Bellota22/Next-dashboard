// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const { v4: uuidv4 } = require('uuid');

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
  {
    id: '410544b2-4001-4271-9855-fec4b6a64422',
    name: 'User2',
    email: 'user2@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: uuidv4(),
    nombre: 'Juan',
    apellido: 'Pérez',
    dni: 12345678,
    fecha_nacimiento: new Date('1990-01-01'),
    email: 'juan.perez@example.com',
    celular: '123456789',
    departamento: 'Lima',
    provincia: 'Lima',
    distrito: 'Miraflores',
    direccion: 'Calle Falsa 123',
    etiquetas: 'cliente,vip',
    imagen_url: '/customers/juan-perez.png',
  },
  {
    id: uuidv4(),
    nombre: 'Maria',
    apellido: 'Gomez',
    dni: 87654321,
    fecha_nacimiento: new Date('1985-05-15'),
    email: 'maria.gomez@example.com',
    celular: '987654321',
    departamento: 'Cusco',
    provincia: 'Cusco',
    distrito: 'Wanchaq',
    direccion: 'Avenida Siempre Viva 456',
    etiquetas: 'cliente,nuevo',
    imagen_url: '/customers/maria-gomez.png',
  },
  {
    id: uuidv4(),
    nombre: 'Pedro',
    apellido: 'Ramirez',
    dni: 56781234,
    fecha_nacimiento: new Date('1978-09-23'),
    email: 'pedro.ramirez@example.com',
    celular: '123123123',
    departamento: 'Arequipa',
    provincia: 'Arequipa',
    distrito: 'Cayma',
    direccion: 'Jiron Real 789',
    etiquetas: 'cliente,frecuente',
    imagen_url: '/customers/maria-gomez.png',
  },
  {
    id: uuidv4(),
    nombre: 'Lucia',
    apellido: 'Fernandez',
    dni: 43218765,
    fecha_nacimiento: new Date('1995-03-10'),
    email: 'lucia.fernandez@example.com',
    celular: '321321321',
    departamento: 'Piura',
    provincia: 'Piura',
    distrito: 'Catacaos',
    direccion: 'Calle Sol 456',
    etiquetas: 'cliente,especial',
    imagen_url: '/customers/maria-gomez.png',
  },
];

const mascotas = [
  {
    id: uuidv4(),
    customer_id: customers[0].id, 
    nombre: 'Firulais',
    fecha_nacimiento: new Date('2015-06-20'),
    especie: 'Perro',
    raza: 'Labrador',
    sexo: true,
    esterilizado: true,
    asegurado: false,
    grooming: true,
    grooming_freq: 'mensual',
    grooming_dia: 'sábado',
    etiquetas: 'amigable,juguetón',
    imagen_url: '/customers/firulais.png',
  },
  {
    id: uuidv4(),
    customer_id: customers[0].id, 
    nombre: 'Misu',
    fecha_nacimiento: new Date('2018-08-15'),
    especie: 'Gato',
    raza: 'Siames',
    sexo: false,
    esterilizado: true,
    asegurado: true,
    grooming: false,
    etiquetas: 'tranquilo,cariñoso',
  },
  {
    id: uuidv4(),
    customer_id: customers[1].id,
    nombre: 'Bobby',
    fecha_nacimiento: new Date('2017-11-11'),
    especie: 'Perro',
    raza: 'Beagle',
    sexo: true,
    esterilizado: true,
    asegurado: false,
    grooming: true,
    grooming_freq: 'semanal',
    grooming_dia: 'viernes',
    etiquetas: 'energético,leal',
  },
  {
    id: uuidv4(),
    customer_id: customers[2].id,
    nombre: 'Lunaa',
    fecha_nacimiento: new Date('2020-02-20'),
    especie: 'Gato',
    raza: 'Persa',
    sexo: false,
    esterilizado: false,
    asegurado: true,
    grooming: true,
    grooming_freq: 'quincenal',
    grooming_dia: 'miércoles',
    etiquetas: 'elegante,silenciosa',
  },
  {
    id: uuidv4(),
    customer_id: customers[2].id,
    nombre: 'Lunaaa',
    fecha_nacimiento: new Date('2020-02-20'),
    especie: 'Gato',
    raza: 'Persa',
    sexo: false,
    esterilizado: false,
    asegurado: true,
    grooming: true,
    grooming_freq: 'quincenal',
    grooming_dia: 'miércoles',
    etiquetas: 'elegante,silenciosa',
  },
  {
    id: uuidv4(),
    customer_id: customers[2].id,
    nombre: 'Luna',
    fecha_nacimiento: new Date('2020-02-20'),
    especie: 'Gato',
    raza: 'Persa',
    sexo: false,
    esterilizado: false,
    asegurado: true,
    grooming: true,
    grooming_freq: 'quincenal',
    grooming_dia: 'miércoles',
    etiquetas: 'elegante,silenciosa',
  },
];

const eventos = [
  {
    customer_id: customers[0].id,
    mascota_id: mascotas[0].id,
    titulo: 'Consulta veterinaria',
    tipo: 'Salud',
    estado: 'Pendiente',
    observaciones: 'Firulais necesita vacuna contra la rabia',
    notificar_correo: true,
    notificar_fecha: '2024-07-01T10:00:00Z',
    fecha_inicio: new Date('2024-07-01T10:00:00Z'),
    fecha_fin: new Date('2024-07-01T11:00:00Z'),
    color: 'azul',
  },
  {
    customer_id: customers[0].id,
    mascota_id: mascotas[1].id,
    titulo: 'Vacunación',
    tipo: 'Salud',
    estado: 'Completado',
    observaciones: 'Firulais necesita vacuna contra la rabia',
    notificar_correo: false,
    notificar_fecha: '2024-07-15T15:00:00Z',
    fecha_inicio: new Date('2024-07-15T15:00:00Z'),
    fecha_fin: new Date('2024-07-15T16:00:00Z'),
    color: 'verde',
  },
  {
    customer_id: customers[1].id,
    mascota_id: mascotas[2].id,
    titulo: 'Chequeo general',
    tipo: 'Salud',
    estado: 'Pendiente',
    observaciones: 'Firulais necesita vacuna contra la rabia',
    notificar_correo: true,
    notificar_fecha: '2024-06-30T09:00:00Z',
    fecha_inicio: new Date('2024-06-30T09:00:00Z'),
    fecha_fin: new Date('2024-06-30T10:00:00Z'),
    color: 'amarillo',
  },
  {
    customer_id: customers[1].id,
    mascota_id: mascotas[2].id,
    titulo: 'Desparasitación',
    tipo: 'Salud',
    estado: 'Pendiente',
    observaciones: 'Firulais necesita vacuna contra la rabia',
    notificar_correo: false,
    notificar_fecha: '2024-08-10T14:00:00Z',
    fecha_inicio: new Date('2024-08-10T14:00:00Z'),
    fecha_fin: new Date('2024-08-10T15:00:00Z'),
    color: 'rojo',
  },
];

const products = [
  {
    id: uuidv4(),
    user_id: users[0].id,
    nombre: 'Product 1',
    marca: 'Brand 1',
    unidad_medida: 'YD',
    presentacion: 'botella',
    contenido: 'agua',
    proveedor: 'Proveedor 1',
    codigo_barras: uuidv4(),
    categoria: 'Categoria 1',
    subcategoria: 'Subcategoria 1',
    stock: 100,
    points: 10,
    precio_compra: 10,
    precio_venta: 20,
    estado: true
  },
  {
    id: uuidv4(),
    user_id: users[0].id,
    nombre: 'Product 2',
    marca: 'Brand 2',
    unidad_medida: 'KG',
    presentacion: 'paquete',
    contenido: 'arroz',
    proveedor: 'Proveedor 2',
    codigo_barras: uuidv4(),
    categoria: 'Categoria 2',
    subcategoria: 'Subcategoria 2',
    stock: 200,
    points: 15,
    precio_compra: 15,
    precio_venta: 30,
    estado: true
  },
  {
    id: uuidv4(),
    user_id: users[0].id,
    nombre: 'Product 3',
    marca: 'Brand 3',
    unidad_medida: 'L',
    presentacion: 'garrafa',
    contenido: 'aceite',
    proveedor: 'Proveedor 3',
    codigo_barras: uuidv4(),
    categoria: 'Categoria 3',
    subcategoria: 'Subcategoria 3',
    stock: 50,
    points: 20,
    precio_compra: 20,
    precio_venta: 40,
    estado: true
  },
  {
    id: uuidv4(),
    user_id: users[0].id,
    nombre: 'Product 4',
    marca: 'Brand 4',
    unidad_medida: 'M',
    presentacion: 'rollo',
    contenido: 'papel',
    proveedor: 'Proveedor 4',
    codigo_barras: uuidv4(),
    categoria: 'Categoria 4',
    subcategoria: 'Subcategoria 4',
    stock: 300,
    points: 25,
    precio_compra: 25,
    precio_venta: 50,
    estado: true
  },
  {
    id: uuidv4(),
    user_id: users[0].id,
    nombre: 'Product 5',
    marca: 'Brand 5',
    unidad_medida: 'CM',
    presentacion: 'caja',
    contenido: 'juguetes',
    proveedor: 'Proveedor 5',
    codigo_barras: uuidv4(),
    categoria: 'Categoria 5',
    subcategoria: 'Subcategoria 5',
    stock: 150,
    points: 30,
    precio_compra: 30,
    precio_venta: 60,
    estado: true
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    nombre: 'Product 7',
    marca: 'Brand 7',
    unidad_medida: 'CM',
    presentacion: 'caja',
    contenido: 'juguetes',
    proveedor: 'Proveedor 7',
    codigo_barras: uuidv4(),
    categoria: 'Categoria 7',
    subcategoria: 'Subcategoria 7',
    stock: 150,
    points: 30,
    precio_compra: 30,
    precio_venta: 60,
    estado: true
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    nombre: 'Product 8',
    marca: 'Brand 8',
    unidad_medida: 'CM',
    presentacion: 'caja',
    contenido: 'juguetes',
    proveedor: 'Proveedor 8',
    codigo_barras: uuidv4(),
    categoria: 'Categoria 8',
    subcategoria: 'Subcategoria 8',
    stock: 150,
    points: 30,
    precio_compra: 30,
    precio_venta: 60,
    estado: true
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    nombre: 'Product 9',
    marca: 'Brand 9',
    unidad_medida: 'CM',
    presentacion: 'caja',
    contenido: 'juguetes',
    proveedor: 'Proveedor 9',
    codigo_barras: uuidv4(),
    categoria: 'Categoria 9',
    subcategoria: 'Subcategoria 9',
    stock: 150,
    points: 30,
    precio_compra: 30,
    precio_venta: 60,
    estado: true
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    nombre: 'Product 10',
    marca: 'Brand 10',
    unidad_medida: 'CM',
    presentacion: 'caja',
    contenido: 'juguetes',
    proveedor: 'Proveedor 10',
    codigo_barras: uuidv4(),
    categoria: 'Categoria 10',
    subcategoria: 'Subcategoria 10',
    stock: 150,
    points: 30,
    precio_compra: 30,
    precio_venta: 60,
    estado: true
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    nombre: 'Product 11',
    marca: 'Brand 11',
    unidad_medida: 'CM',
    presentacion: 'caja',
    contenido: 'juguetes',
    proveedor: 'Proveedor 11',
    codigo_barras: uuidv4(),
    categoria: 'Categoria 11',
    subcategoria: 'Subcategoria 11',
    stock: 150,
    points: 30
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    nombre: 'Product 12',
    marca: 'Brand 12',
    unidad_medida: 'CM',
    presentacion: 'caja',
    contenido: 'juguetes',
    proveedor: 'Proveedor 12',
    codigo_barras: uuidv4(),
    categoria: 'Categoria 12',
    subcategoria: 'Subcategoria 12',
    stock: 150,
    points: 30
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    nombre: 'Product 13',
    marca: 'Brand 13',
    unidad_medida: 'CM',
    presentacion: 'caja',
    contenido: 'juguetes',
    proveedor: 'Proveedor 13',
    codigo_barras: uuidv4(),
    categoria: 'Categoria 13',
    subcategoria: 'Subcategoria 13',
    stock: 150,
    points: 30
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    nombre: 'Product 14',
    marca: 'Brand 14',
    unidad_medida: 'CM',
    presentacion: 'caja',
    contenido: 'juguetes',
    proveedor: 'Proveedor 14',
    codigo_barras: uuidv4(),
    categoria: 'Categoria 14',
    subcategoria: 'Subcategoria 14',
    stock: 150,
    points: 30
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    nombre: 'Product 15',
    marca: 'Brand 15',
    unidad_medida: 'CM',
    presentacion: 'caja',
    contenido: 'juguetes',
    proveedor: 'Proveedor 15',
    codigo_barras: uuidv4(),
    categoria: 'Categoria 15',
    subcategoria: 'Subcategoria 15',
    stock: 150,
    points: 30
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    nombre: 'Product 16',
    marca: 'Brand 16',
    unidad_medida: 'CM',
    presentacion: 'caja',
    contenido: 'juguetes',
    proveedor: 'Proveedor 16',
    codigo_barras: uuidv4(),
    categoria: 'Categoria 16',
    subcategoria: 'Subcategoria 16',
    stock: 150,
    points: 30
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    nombre: 'Product 17',
    marca: 'Brand 17',
    unidad_medida: 'CM',
    presentacion: 'caja',
    contenido: 'juguetes',
    proveedor: 'Proveedor 17',
    codigo_barras: uuidv4(),
    categoria: 'Categoria 17',
    subcategoria: 'Subcategoria 17',
    stock: 150,
    points: 30
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    nombre: 'Product 18',
    marca: 'Brand 18',
    unidad_medida: 'CM',
    presentacion: 'caja',
    contenido: 'juguetes',
    proveedor: 'Proveedor 18',
    codigo_barras: uuidv4(),
    categoria: 'Categoria 18',
    subcategoria: 'Subcategoria 18',
    stock: 150,
    points: 30
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    nombre: 'Product 19',
    marca: 'Brand 19',
    unidad_medida: 'CM',
    presentacion: 'caja',
    contenido: 'juguetes',
    proveedor: 'Proveedor 19',
    codigo_barras: uuidv4(),
    categoria: 'Categoria 19',
    subcategoria: 'Subcategoria 19',
    stock: 150,
    points: 30
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    nombre: 'Product 20',
    marca: 'Brand 20',
    unidad_medida: 'CM',
    presentacion: 'caja',
    contenido: 'juguetes',
    proveedor: 'Proveedor 20',
    codigo_barras: uuidv4(),
    categoria: 'Categoria 20',
    subcategoria: 'Subcategoria 20',
    stock: 150,
    points: 30
  }
];


const revenue = [
  {
    id: uuidv4(),
    user_id: users[0].id,
    customer_id: customers[0].id,
    total: 60,
    fecha: new Date('2024-06-27'),
  },
  {
    id: uuidv4(),
    user_id: users[1].id,
    customer_id: customers[1].id,
    total: 90,
    fecha: new Date('2024-06-27'),
  },
];

const salesProducts = [
  {
    venta_id: revenue[0].id,
    producto_id: products[0].id,
    cantidad: 2,
    precio: products[0].precio_venta,
  },
  {
    venta_id: revenue[0].id,
    producto_id: products[1].id,
    cantidad: 1,
    precio: products[1].precio_venta,
  },
  {
    venta_id: revenue[1].id,
    producto_id: products[1].id,
    cantidad: 3,
    precio: products[1].precio_venta,
  },
  {
    venta_id: revenue[1].id,
    producto_id: products[0].id,
    cantidad: 1,
    precio: products[0].precio_venta,
  },
];



module.exports = {
  users,
  customers,
  revenue,
  mascotas,
  eventos,
  products,
  salesProducts,
  
};
