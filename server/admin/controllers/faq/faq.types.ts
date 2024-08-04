const { OrderItem } = require("sequelize");

export type TListFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
};

export type TFaq = {
  id?: number;
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TAddFaq = {
  title: string;
  description: string;
};

export type TEditFaq = {
  title: string;
  description: string;
};

export type TFaqsList = {
  total: number;
  data: TFaq;
};
