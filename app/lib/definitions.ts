
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


export type ProductsForShoppingCart = Products &{
  quantity: number; 
}

export type SaleWithProducts = Sales & {

  products: ProductsForShoppingCart[];
};

export type MedicalHistory = {
  id: string;
  user_id: string;
  pet_id: string;
  date: Date;
  reason: string;
  anamnesis?: string;
  weight?: number;
  respiratory_rate?: number;
  heart_rate?: number;
  temperature?: number;
  rectal_test?: number;
  arterial_pressure?: number;
  filled_hair_time?: number;
  dehydration?: number;
  clinical_test?: string;
  diagnosis?: string;
  auxiliary_test?: string;
  treatment?: string;
  prescription?: string;
  observation?: string;
  created_date: Date;
  updated_date: Date;
};

export type Specialty = {
  id: string;
  name: string;
};

export type Veterinary = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  dni: number;
  cellphone: string;
  address?: string;
  specialties?: Specialty[];
  image_url?: string;
  created_date: Date;
  updated_date: Date;
};

export type VetSchedule = {
  id: string;
  user_id: string;
  vet_id: string;
  title: string;
  start_time: Date;
  end_time: Date;
  status: boolean;
  created_date: Date;
  updated_date: Date;
};

export type Appointments = {
  id: string;
  user_id: string;
  pet_id: string;
  vet_id: string;
  start_time: Date;
  end_time: Date;
  title: string;
  status: boolean;
  created_date: Date;
  updated_date: Date;
};