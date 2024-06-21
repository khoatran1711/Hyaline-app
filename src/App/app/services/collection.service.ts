import { RootStore, RootStoreType } from "../../domain";
import { HttpService } from "../http-services";
import {
  GetAllCollection,
  GetAllCollectionCategory,
  GetCollectionDetail,
} from "../models/collection.model";

export class CollectionService {
  private httpService: HttpService;

  constructor(private store: RootStoreType = RootStore) {
    this.httpService = new HttpService();
  }

  getAllCollection() {
    return this.httpService
      .get<GetAllCollection>("/collection/get-all-collection")
      .then((res) => {
        return res;
      });
  }

  getCollectionDetail(id?: string) {
    return this.httpService
      .get<GetCollectionDetail>("/collection/get-detail-collection/" + id)
      .then((res) => {
        return res;
      });
  }
}
