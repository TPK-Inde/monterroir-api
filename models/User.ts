import {
  Model, AllowNull, DataType, Column, Table, Scopes, CreatedAt, UpdatedAt, HasMany, BelongsToMany,
  ForeignKey, BelongsTo, PrimaryKey
} from 'sequelize-typescript';

//Todo : Ajouter le lien de dépendance avec la table P_STATUT_COMPTE
@Table({
  timestamps: false,
  tableName: 'f_users'
})
export class User extends Model<User> {
  @PrimaryKey
  @Column
  ID_USER: number;

  @Column
  ID_ACCOUNT_STATUS: number;

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