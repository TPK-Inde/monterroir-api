import {
  Model, Column, Table, PrimaryKey
} from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'P_ACCOUNT_STATUS'
})
export class AccountStatus extends Model<AccountStatus> {
  @PrimaryKey
  @Column
  ID_ACCOUNT_STATUS: number;

  @Column
  WORDING: string;
}