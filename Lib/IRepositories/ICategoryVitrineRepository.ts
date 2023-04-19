import { CategoryVitrine } from "../../models/CategoryVitrine";

export interface ICategoryVitrineRepository {

  GetAll(): Promise<CategoryVitrine[]>;
  GetById(id: string): Promise<CategoryVitrine | null>;
  PostNewCategoryVitrine(newCategoryVitrine: CategoryVitrine): Promise<void>;
  PutCategoryVitrine(categoryVitrineToModify: CategoryVitrine): Promise<void>;
  DeleteCategoryVitrine(categoryVitrineId: string): Promise<number>;
}