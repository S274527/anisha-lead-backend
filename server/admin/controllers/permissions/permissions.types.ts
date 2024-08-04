const { OrderItem } = require("sequelize");

export type TPermission = {
    title: string,
    view: boolean,
    add: boolean,
    edit: boolean,
    delete: boolean,
};

export type TListFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
};

export type TPermissionsList = {
  total: number;
  data: TPermission;
};
