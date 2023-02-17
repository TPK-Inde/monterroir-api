import {
  Model, AllowNull, DataType, Column, Table, Scopes, CreatedAt, UpdatedAt, HasMany, BelongsToMany,
  ForeignKey, BelongsTo, PrimaryKey
} from 'sequelize-typescript';

//Todo : Ajouter le lien de dépendance avec la table P_STATUT_COMPTE
@Table({
  timestamps: false,
  tableName: 'f_utilisateurs'
})
export class Utilisateur extends Model<Utilisateur> {
  @PrimaryKey
  @Column
  ID_UTILISATEUR: number;

  @Column
  ID_STATUT_COMPTE: number;

  @Column
  PSEUDONYME: string;

  @Column
  NOM: string;

  @Column
  PRENOM: string;

  @Column
  DATE_DE_NAISSANCE: Date;

  @Column
  ADRESSE_EMAIL: string;

  @Column
  ADRESSE_RUE: string;

  @Column
  ADRESSE_CODE_POSTAL: string;

  @Column
  ADRESSE_VILLE: string;

  @Column
  MOT_DE_PASSE: string;

  @Column
  PHOTO_DE_PROFIL: string;
}