
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customers = {
  id: string;
  user_id: string;
  name: string;
  dni: string;
  birthday?: Date;
  email: string;
  cellphone: string;
  department?: string;
  province?: string;
  district?: string;
  address?: string;
  tags?: string;
  image_url?: string;
};


export type Products ={
  id: string;
  user_id: string;
  name: string;
  brand?: string;
  measure_unit?: string;
  presentation?: string;
  content?: string;
  supplier?: string;
  bar_code: string;
  category: string;
  stock: number;
  sell_price: number;
  buy_price: number;
  status: boolean;
  image_url?: string;
  created_at: Date;
  updated_at: Date;
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

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type SalesTableType = {
  id: string;
  user_id: string;
  customer_id: string;
  total: number;
  fecha: Date;
  estado: boolean;
  fecha_creacion: Date;
};

// products


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
export type SalesProductsTableType = {
  venta_id: string;
  producto_id: string;
  cantidad: number;
  precio: number;
  producto_nombre: string;
  producto_marca: string;
};
export type SaleWithProductsType = {
  venta: SalesTableType;
  productos: SalesProductsTableType[];
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

