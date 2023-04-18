import { CategoryVitrine } from "../../models/CategoryVitrine";
import sequelize from "../../sequelize/db";
import { ICategoryVitrineRepository } from "../IRepositories/ICategoryVitrineRepository"

export class CategoryVitrineRepository implements ICategoryVitrineRepository {
  //Properties
  categoryVitrineRepository = sequelize.getRepository(CategoryVitrine);

  constructor() { }

  async GetAll(): Promise<CategoryVitrine[]> {
    return await this.categoryVitrineRepository.findAll();
  }
  async GetById(id: string): Promise<CategoryVitrine | null> {
    return await this.categoryVitrineRepository.findByPk(id);
  }
  async PostNewCategoryVitrine(newCategoryVitrine: CategoryVitrine): Promise<void> {
    await this.categoryVitrineRepository.create(newCategoryVitrine);
  }
  async PutCategoryVitrine(categoryVitrineToModify: CategoryVitrine): Promise<void> {
    await this.categoryVitrineRepository.update(categoryVitrineToModify, { where: { ID_CATEGORY_VITRINE: categoryVitrineToModify.ID_CATEGORY_VITRINE } });
  }
  async DeleteCategoryVitrine(categoryVitrineId: string): Promise<number> {
    return this.categoryVitrineRepository.destroy({ where: { ID_CATEGORY_VITRINE: categoryVitrineId } });
  }

}