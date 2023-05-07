import { Product } from "../../models/Product";

export interface IProductRepository {

  GetById(productId: number): Promise<Product | null>;
  GetByVitrineId(vitrineId: number): Promise<Product[]>;
  PostNewProduct(productToPost: Product): Promise<void>;
  PutProduct(productToModify: Product): Promise<void>;
  DeleteProduct(productToDeleteId: number): Promise<number>;

}