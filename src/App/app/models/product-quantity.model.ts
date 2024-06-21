export interface ProductQuantity {
  idQuantity: string;
  idProduct?: string;
  idColor?: string;
  idProductSize?: string;
  amount?: number;
}

export interface GetProductQuantity {
  isSuccess: boolean;
  message: string;
  data?: ProductQuantity;
}
