import { HttpService } from "../http-services";
import { RootStore, RootStoreType } from "../../domain";
import { GetAllCategory, GetCategoryDetail } from "../models/category.model";

export class CategoryService {
  private httpService: HttpService;

  constructor(private store: RootStoreType = RootStore) {
    this.httpService = new HttpService();
  }

  getAllCategory() {
    return this.httpService
      .get<GetAllCategory>("/category/get-all-category")
      .then((res) => {
        return res;
      });
  }

  getParentCategory() {
    return this.httpService
      .get<GetAllCategory>("/category/get-parent-category")
      .then((res) => {
        return res;
      });
  }

  getCategoryDetail(id?: string) {
    return this.httpService
      .get<GetCategoryDetail>("/category/get-category/" + id)
      .then((res) => {
        return res;
      });
  }
}
