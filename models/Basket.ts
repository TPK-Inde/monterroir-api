import { Optional } from "sequelize";
import {
    Model, AllowNull, DataType, Column, Table, Scopes, CreatedAt, UpdatedAt, HasMany, BelongsToMany,
    ForeignKey, BelongsTo, PrimaryKey
  } from 'sequelize-typescript';
  import { BasketAttributes } from "../Lib/IModels/BasketAttributes";

  interface BasketCreationAttributes extends Optional<BasketAttributes, 'ID'> {}

  @Table({
    timestamps: false,
    tableName: 'f_baskets'
  })
  export class Basket extends Model<BasketAttributes, BasketCreationAttributes> {
    @PrimaryKey
    @Column
    ID: number

    @Column
    ID_USER: number

    @Column
    ID_PRODUCT: number

    @Column
    DATE: Date
  }
