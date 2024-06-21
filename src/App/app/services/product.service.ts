import { RootStore, RootStoreType } from "../../domain";
import { HttpService } from "../http-services";
import { GetProductQuantity } from "../models/product-quantity.model";
import {
  GetAllProduct,
  GetAllProductFilter,
  GetProductDetai,
} from "../models/product.model";

export class ProductService {
  private httpService: HttpService;

  constructor(private store: RootStoreType = RootStore) {
    this.httpService = new HttpService();
  }

  getAllProduct(filter?: GetAllProductFilter) {
    return this.httpService
      .post<GetAllProductFilter | undefined, GetAllProduct>(
        "/product/get-all-product",
        filter
      )
      .then((res) => {
        return res;
      });
  }

  getProductDetail(id?: string) {
    return this.httpService
      .get<GetProductDetai>("/product/get-product-detail/" + id)
      .then((res) => {
        return res;
      });
  }

  getProductQuantity(
    idProduct: string,
    idColor?: string,
    idProductSize?: string
  ) {
    return this.httpService
      .get<GetProductQuantity>("/product-quantity/get-product-quantity/", {
        params: {
          idProduct,
          idColor,
          idProductSize,
        },
      })
      .then((res) => {
        return res;
      });
  }
}
