import { Category } from "./category.model";
import { Color } from "./color.model";

export interface Product {
  id?: string;
  name?: string;
  price?: string;
  imageUrl?: string;
  images?: string[];
  isActive?: boolean;
  soldAmount?: number;
  description?: string;
  cateId?: string;
  attributes?: string[];
  code?: string;
  categoryList?: Category[];
  colors?: Color[];
  productSizes?: ProductSize[];
}

export interface ProductSize {
  id?: string;
  name?: string;
  isActive?: boolean;
}

export interface GetAllProduct {
  isSuccess: boolean;
  message: string;
  data?: Product[];
}

export interface GetProductDetai {
  isSuccess: boolean;
  message: string;
  data?: Product;
}

export interface GetAllProductFilter {
  searchName?: string;
  categoryIds?: string[];
  sortByPrice?: boolean;
  sortOder?: string;
}
