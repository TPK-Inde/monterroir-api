import {
  Model, Column, Table, PrimaryKey
} from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'P_TYPE_VITRINE'
})
export class TypeVitrine extends Model<TypeVitrine> {
  @PrimaryKey
  @Column
  ID_TYPE_VITRINE: number;

  @Column
  WORDING: string;
}