import {
    Column, Table, ForeignKey, DefaultScope, Model, BelongsTo
  } from 'sequelize-typescript';
import { Vitrine } from './Vitrine';
import { User } from './User';
  
@DefaultScope(() => ({
  attributes: ['ID_VITRINE', 'ID_USER'],
}))
@Table({
  timestamps: false,
  tableName: 'F_VITRINE_FAVORITE',
})
export class FavoriteVitrine extends Model<FavoriteVitrine> {
  @ForeignKey(() => Vitrine)
  @Column
  ID_VITRINE: number;

  @BelongsTo(() => Vitrine)
  VITRINE: Vitrine;

  @ForeignKey(() => User)
  @Column
  ID_USER: number;
}