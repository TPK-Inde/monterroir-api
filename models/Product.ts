import {
  Model, Column, Table, PrimaryKey, ForeignKey, BelongsTo
} from 'sequelize-typescript';
import { Vitrine } from './Vitrine';

@Table({
  timestamps: false,
  tableName: 'F_PRODUCTS'
})
export class Product extends Model<Product> {
  @PrimaryKey
  @Column
  ID_PRODUCT: number;

  @ForeignKey(() => Vitrine)
  @Column
  ID_VITRINE: number;

  @BelongsTo(() => Vitrine)
  VITRINE: Vitrine;

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