import { Product } from "../../models/Product";
import { IProductRepository } from "../IRepositories/IProductRepository";
import sequelize from "../../sequelize/db";

export class ProductRepository implements IProductRepository {

  //Properties
  productRepository = sequelize.getRepository(Product);

  //Constructeur
  constructor() { }
  async GetByVitrineId(vitrineId: number): Promise<Product[]> {
    return await this.productRepository.findAll({
      where: {
        ID_VITRINE: vitrineId
      }
    });
  }

  async GetById(productId: number): Promise<Product | null> {
    return await this.productRepository.findByPk(productId);
  }
  async PostNewProduct(productToPost: Product): Promise<void> {
    await this.productRepository.create(productToPost);
  }
  async PutProduct(productToModify: Product): Promise<void> {
    await this.productRepository.update(productToModify, { where: { ID_PRODUCT: productToModify.ID_PRODUCT } });
  }
  async DeleteProduct(productToDeleteId: number): Promise<number> {
    return await this.productRepository.destroy({ where: { ID_PRODUCT: productToDeleteId } });
  }

}