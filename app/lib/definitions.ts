
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_date: Date;
  updated_date: Date;
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
  created_date: Date;
  updated_date: Date;
};

export type Pets = {
  id: string;
  user_id: string;
  customer_id: string;
  name: string;
  birthday?: Date;
  specie: string;
  race: string;
  gender: boolean;
  sterelized: boolean;
  insured: boolean;
  tags?: string;
  grooming?: boolean;
  grooming_freq?: string;
  grooming_day?: string;
  image_url?: string;
  created_date: Date;
  updated_date: Date;
}

export type PetWithCustomer = Pets & {
  customer: Customers;
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
  created_date: Date;
  updated_date: Date;
};

export type Sales = {
  id: string;
  user_id: string;
  customer_id: string;
  status: string;
  total_price: number;
  created_date: Date;
  updated_date: Date;
};


export interface ProductToSell extends Products {
  quantity: number; 
}

export type SaleWithProducts = {
  id: string;
  user_id: string;
  customer_id: string;
  customer_name: string;
  status: string;
  total_price: number;
  created_date: string;
  updated_date: string;
  products: ProductToSell[];
};





