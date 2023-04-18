import { CategoryVitrine } from "../../models/CategoryVitrine";

export interface ICategoryVitrineRepository {

  GetAllCategoryVitrine(): Promise<CategoryVitrine[]>;
  GetCategoryVitrineById(id: string): Promise<CategoryVitrine | null>;
  PostNewCategoryVitrine(newCategoryVitrine: CategoryVitrine): Promise<void>;
  PutCategoryVitrine(categoryVitrineToModify: CategoryVitrine): Promise<void>;
  DeleteCategoryVitrine(categoryVitrineId: string): Promise<number>;
}