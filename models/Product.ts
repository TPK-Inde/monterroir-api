import {
  Model, Column, Table, PrimaryKey
} from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'F_PRODUCTS'
})
export class Product extends Model<Product> {
  @PrimaryKey
  @Column
  ID_PRODUCT: number;

  @Column
  ID_VITRINE: number;

  @Column
  NAME: string;

  @Column
  IMAGE: string;

  @Column
  QUANTITY_STOCK: number;

  @Column
  UNIT_PRICE_HT: number;

  @Column
  DESCRIPTION: string;
}