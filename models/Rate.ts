import { Optional } from "sequelize";
import {
  Model, Column, Table, ForeignKey, BelongsTo, PrimaryKey
} from 'sequelize-typescript';
import { RateAttributes } from "../Lib/IModels/RateAttributes";
import { User } from "./User";

interface RateCreationAttributes extends Optional<RateAttributes, 'ID_RATE'> { }

@Table({
  timestamps: false,
  tableName: 'F_RATES'
})
export class Rate extends Model<RateAttributes, RateCreationAttributes> {
  @PrimaryKey
  @Column
  ID_RATE: number;

  @ForeignKey(() => User)
  @Column
  ID_USER: number;

  @BelongsTo(() => User)
  OWNER: User;

  @Column
  ID_VITRINE: number;

  @Column
  RATE: number;

  @Column
  DATE: Date;
}