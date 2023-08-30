import {
  Model, Column, Table, ForeignKey, PrimaryKey, BelongsTo
} from 'sequelize-typescript';
import { AccountStatus } from './AccountStatus';
import { InferAttributes, InferCreationAttributes, Optional } from 'sequelize';

interface UserCreationAttributes extends Optional<User, 'ID_USER' | 'ACCOUNT_STATUS'> { }

@Table({
  timestamps: false,
  tableName: 'F_USERS'
})
export class User extends Model<InferAttributes<User>, InferCreationAttributes<UserCreationAttributes>> {
  @PrimaryKey
  @Column
  ID_USER: number;

  @ForeignKey(() => AccountStatus)
  @Column
  ID_ACCOUNT_STATUS: number;

  @BelongsTo(() => AccountStatus)
  ACCOUNT_STATUS: AccountStatus;

  @Column
  PSEUDONYM: string;

  @Column
  LAST_NAME: string;

  @Column
  FIRST_NAME: string;

  @Column
  DATE_OF_BIRTH: Date;

  @Column
  EMAIL: string;

  @Column
  ADDRESS_STREET: string;

  @Column
  ADDRESS_ZIP_CODE: string;

  @Column
  ADDRESS_CITY: string;

  @Column
  PASSWORD: string;

  @Column
  PROFIL_PICTURE: string;
}