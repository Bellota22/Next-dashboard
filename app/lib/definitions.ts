// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type UsersTable = {
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
  celular: string;
  direccion: string;
  departamento: string;
  fecha_nacimiento?: string;
  provincia: string;
  distrito: string;
  imagen_url?: string;
  etiquetas?: string;
  
};

export type PetsTable = {
  customer_id: string;
  nombre: string;
  especie: string;
  raza: string;
  fecha_nacimiento: string;
  sexo: boolean;
  esterilizado: boolean;
  asegurado: boolean;
  grooming?: boolean;
  grooming_freq?: string;
  grooming_dia?: string;
  etiquetas?: string;
  imagen_url?: string;
  
};

export type UsersShowTable = {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
  celular: string;
  direccion: string;
  departamento: string;
  provincia: string;
  distrito: string;
  imagen_url?: string;
  etiquetas?: string;
  fecha_creacion: string;
  
};

export type PetsShowTable = {
  customer_id: string;
  nombre: string;
  especie: string;
  raza: string;
  fecha_nacimiento: string | null;
  sexo: boolean;
  esterilizado: boolean | null;
  asegurado: boolean | null;
  grooming?: boolean | null;
  grooming_freq?: string | null;
  grooming_dia?: string | null;
  etiquetas?: string | null;
  imagen_url?: string | null;
  
};

export type ProductsShowTable = {
  user_id: string;
  nombre: string;
  marca: string;
  unidad_medida: string;
  presentacion: string;
  contenido: string;
  proveedor: string;
  codigo_barras: string;
  categoria: string;
  subcategoria: string;
  stock: number;
  precio_compra: number;
  precio_venta: number;
  estado: boolean;
  imagen_url?: string;
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  nombre: string;
  apellido: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
