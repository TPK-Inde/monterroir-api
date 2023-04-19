import {
  Model, AllowNull, DataType, Column, Table, Scopes, CreatedAt, UpdatedAt, HasMany, BelongsToMany,
  ForeignKey, BelongsTo, PrimaryKey
} from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'F_VITRINES'
})
export class Vitrine extends Model<Vitrine> {
  @PrimaryKey
  @Column
  ID_VITRINE: number;

  //Todo : Ajouter le lien avec la table F_Utilisateur
  @Column
  ID_USER: number;

  //Todo ; Ajouter le lien avec la table P_Categorie_vitrine 
  @Column
  ID_CATEGORY_VITRINE: number;

  //Todo : Ajouter le lien avec la table P_Type_Vitrine
  @Column
  ID_TYPE_VITRINE: number;

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
}