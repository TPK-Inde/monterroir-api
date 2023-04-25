import {
    Model, Column, Table, PrimaryKey
  } from 'sequelize-typescript';
  
  @Table({
    timestamps: false,
    tableName: 'P_ORDER_STATUS'
  })
  export class OrderStatus extends Model<OrderStatus> {
    @PrimaryKey
    @Column
    ID_ORDER_STATUS: number;
  
    @Column
    WORDING: string;
  }