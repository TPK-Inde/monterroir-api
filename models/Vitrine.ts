import {
  Model, AllowNull, DataType, Column, Table, Scopes, CreatedAt, UpdatedAt, HasMany, BelongsToMany,
  ForeignKey, BelongsTo, PrimaryKey
} from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'f_vitrines'
})
export class Vitrine extends Model<Vitrine> {
  @PrimaryKey
  @Column
  ID_VITRINE: number;

  //Todo : Ajouter le lien avec la table F_Utilisateur
  @Column
  ID_UTILISATEUR: number;

  //Todo ; Ajouter le lien avec la table P_Categorie_vitrine 
  @Column
  ID_CATEGORIE_VITRINE: number;

  //Todo : Ajouter le lien avec la table P_Type_Vitrine
  @Column
  ID_TYPE_VITRINE: number;

  @Column
  NOM: string;

  @Column
  PHOTO: string;

  @Column
  ADRESSE_RUE: string;

  @Column
  ADRESSE_CODE_POSTAL: string;

  @Column
  ADRESSE_VILLE: string;

  @Column
  DATE_CREATION: Date;

  @Column
  ACTIF: Boolean;
}