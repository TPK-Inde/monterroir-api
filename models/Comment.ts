import { Optional } from 'sequelize';
import {
  Model, Column, Table, ForeignKey, BelongsTo, PrimaryKey
} from 'sequelize-typescript';
import { CommentAttributes } from '../Lib/IModels/CommentAttributes';
import { User } from './User';
import { Vitrine } from './Vitrine';

interface CommentCreationAttributes extends Optional<CommentAttributes, 'ID_COMMENT'> { }

@Table({
  timestamps: false,
  tableName: 'F_COMMENTS'
})
export class Comment extends Model<CommentAttributes, CommentCreationAttributes> {
  @PrimaryKey
  @Column
  ID_COMMENT: number;

  @Column
  ID_RATE: number;

  @ForeignKey(() => User)
  @Column
  ID_USER: number;

  @ForeignKey(() => Vitrine)
  @Column
  ID_VITRINE: number;

  @BelongsTo(() => User)
  OWNER: User;

  @Column
  ID_PARENT: number;

  @Column
  COMMENT: string;

  @Column
  DATE: Date;
}