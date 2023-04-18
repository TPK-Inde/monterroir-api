import { CategoryVitrine } from "../../models/CategoryVitrine";
import { ICategoryVitrineRepository } from "../IRepositories/ICategoryVitrineRepository"

export class CategoryVitrineRepository implements ICategoryVitrineRepository {
  async GetAllCategoryVitrine(): Promise<CategoryVitrine[]> {
    return CategoryVitrine.findAll();
  }
  async GetCategoryVitrineById(id: string): Promise<CategoryVitrine | null> {
    return CategoryVitrine.findByPk(id);
  }
  async PostNewCategoryVitrine(newCategoryVitrine: CategoryVitrine): Promise<void> {
    CategoryVitrine.create(newCategoryVitrine);
  }
  async PutCategoryVitrine(categoryVitrineToModify: CategoryVitrine): Promise<void> {
    CategoryVitrine.update(categoryVitrineToModify, { where: { ID_CATEGORY_VITRINE: categoryVitrineToModify.ID_CATEGORY_VITRINE } });
  }
  async DeleteCategoryVitrine(categoryVitrineId: string): Promise<number> {
    return CategoryVitrine.destroy({ where: { ID_CATEGORY_VITRINE: categoryVitrineId } });
  }

}