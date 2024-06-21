export interface Category {
  id: string;
  name: string;
  parentId: string;
  imageUrl?: string;
  parent?: Category;
}

export interface GetAllCategory {
  isSuccess: boolean;
  message: string;
  data?: Category[];
}

export interface GetCategoryDetail {
  isSuccess: boolean;
  message: string;
  data?: Category;
}
