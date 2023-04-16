import { Optional } from 'sequelize';
import {
    Model, AllowNull, DataType, Column, Table, Scopes, CreatedAt, UpdatedAt, HasMany, BelongsToMany,
    ForeignKey, BelongsTo, PrimaryKey
  } from 'sequelize-typescript';
import { CommentAttributes } from '../Lib/IModels/CommentAttributes';

  interface CommentCreationAttributes extends Optional<CommentAttributes, 'ID_COMMENT'> {}
  
  @Table({
    timestamps: false,
    tableName: 'f_comments'
  })
  export class Comment extends Model<CommentAttributes, CommentCreationAttributes> {
    @PrimaryKey
    @Column
    ID_COMMENT: number;

    @Column
    ID_RATE: number;

    @Column
    ID_USER: number;

    @Column
    ID_PARENT: number;

    @Column
    COMMENT: string;

    @Column
    DATE: Date;
  }