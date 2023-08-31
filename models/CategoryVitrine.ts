import { InferAttributes, InferCreationAttributes, Optional } from 'sequelize';
import {
  Model, Column, Table, PrimaryKey
} from 'sequelize-typescript';

interface CategoryVitrineCreationAttributes extends Optional<CategoryVitrine, 'ID_CATEGORY_VITRINE'> { }

@Table({
  timestamps: false,
  tableName: 'P_CATEGORIES_VITRINE'
})
export class CategoryVitrine extends Model<InferAttributes<CategoryVitrine>, InferCreationAttributes<CategoryVitrineCreationAttributes>> {
  @PrimaryKey
  @Column
  ID_CATEGORY_VITRINE: number;

  @Column
  WORDING: string;
}