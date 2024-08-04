const { OrderItem } = require("sequelize");

export type TListFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
};

export type TLead = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  phone_code: string;
  status: string;
  source: string;
  description: string;
  dob: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TAddLead = {
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  phone_code: string;
  status: string;
  source: string;
  description: string;
  dob: string;
  address: string;
  user_id: string;
};

export type TEditLead = {
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  phone_code: string;
  status: string;
  source: string;
  description: string;
  dob: string;
  address: string;
  user_id: string;
};

export type TLeadsList = {
  total: number;
  data: TLead;
};
