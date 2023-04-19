import {
  Model, AllowNull, DataType, Column, Table, Scopes, CreatedAt, UpdatedAt, HasMany, BelongsToMany,
  ForeignKey, BelongsTo, PrimaryKey
} from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'p_categories_vitrine'
})
export class CategoryVitrine extends Model<CategoryVitrine> {
  @PrimaryKey
  @Column
  ID_CATEGORY_VITRINE: number;

  @Column
  WORDING: string;
}