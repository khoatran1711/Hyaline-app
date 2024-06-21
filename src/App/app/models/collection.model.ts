import { Product } from "./product.model";

export interface Collection {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  isActive: boolean;
  collectionCategories?: CollectionCategory[];
}

export interface CollectionCategory {
  name?: string;
  mainProduct?: Product;
  collectionId?: string;
  imageUrl?: string;
  products?: Product[];
}

export interface GetAllCollection {
  isSuccess: boolean;
  message: string;
  data?: Collection[];
}

export interface GetAllCollectionCategory {
  isSuccess: boolean;
  message: string;
  data?: CollectionCategory[];
}

export interface GetCollectionDetail {
  isSuccess: boolean;
  message: string;
  data?: Collection;
}
