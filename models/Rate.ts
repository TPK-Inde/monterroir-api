import { Optional } from "sequelize";
import {
  Model, AllowNull, DataType, Column, Table, Scopes, CreatedAt, UpdatedAt, HasMany, BelongsToMany,
  ForeignKey, BelongsTo, PrimaryKey
} from 'sequelize-typescript';
import { RateAttributes } from "../Lib/IModels/RateAttributes";

interface RateCreationAttributes extends Optional<RateAttributes, 'ID_RATE'> { }

@Table({
  timestamps: false,
  tableName: 'F_RATES'
})
export class Rate extends Model<RateAttributes, RateCreationAttributes> {
  @PrimaryKey
  @Column
  ID_RATE: number;

  @Column
  ID_USER: number;

  @Column
  ID_VITRINE: number;

  @Column
  RATE: number;

  @Column
  DATE: Date;
}