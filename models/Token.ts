import {
  Model, Column, Table, ForeignKey, PrimaryKey
} from 'sequelize-typescript';
import { User } from "./User";
import { TokenAttributes } from '../Lib/IModels/TokenAttributes';
import { Optional } from 'sequelize';

interface TokenCreationAttributes extends Optional<TokenAttributes, 'ID_TOKEN'> { }

@Table({
  timestamps: false,
  tableName: 'F_TOKEN'
})
export class Token extends Model<Token, TokenCreationAttributes> {
  @PrimaryKey
  @Column
  ID_TOKEN: number;

  @ForeignKey(() => User)
  @Column
  ID_USER: number;

  @Column
  TOKEN: string;

  @Column
  DATE_TOKEN: Date;
}