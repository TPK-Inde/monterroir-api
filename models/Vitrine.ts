import {
  Model, Column, Table, ForeignKey, BelongsTo, PrimaryKey, HasOne
} from 'sequelize-typescript';
import { CategoryVitrine } from './CategoryVitrine';
import { User } from './User';
import { TypeVitrine } from './TypeVitrine';
import { FavoriteVitrine } from './FavoriteVitrine';

@Table({
  timestamps: false,
  tableName: 'F_VITRINES'
})
export class Vitrine extends Model<Vitrine> {
  @PrimaryKey
  @Column
  ID_VITRINE: number;

  @ForeignKey(() => User)
  @Column
  ID_USER: number;

  @BelongsTo(() => User)
  OWNER: User;

  @ForeignKey(() => CategoryVitrine)
  @Column
  ID_CATEGORY_VITRINE: number;

  @BelongsTo(() => CategoryVitrine)
  CATEGORY_VITRINE: CategoryVitrine;

  @ForeignKey(() => TypeVitrine)
  @Column
  ID_TYPE_VITRINE: number;

  @BelongsTo(() => TypeVitrine)
  TYPE_VITRINE: TypeVitrine;

  @Column
  NAME: string;

  @Column
  IMAGE: string;

  @Column
  ADDRESS_STREET: string;

  @Column
  ADDRESS_ZIP_CODE: string;

  @Column
  ADDRESS_CITY: string;

  @Column
  DESCRIPTION: string;

  @Column
  CREATION_DATE: Date;

  @Column
  ACTIVATE: Boolean;

  @Column
  LATITUDE: Number;

  @Column
  LONGITUDE: Number;

  @Column
  DELETED: boolean;

  @HasOne(() => FavoriteVitrine)
  FAVORITE: boolean;
}