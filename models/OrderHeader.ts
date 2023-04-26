import {
    Model, Column, Table, ForeignKey, BelongsTo, PrimaryKey
} from 'sequelize-typescript';
import { Optional } from "sequelize";
import { OrderHeaderAttributes } from "../Lib/IModels/OrderHeaderAttributes";
import { User } from './User';
import { OrderStatus } from './OrderStatus';

interface OrderHeaderCreationAttributes extends Optional<OrderHeaderAttributes, 'ID_ORDER_HEADER'> { }

@Table({
    timestamps: false,
    tableName: 'F_ORDER_HEADER'
})
export class OrderHeader extends Model<OrderHeader, OrderHeaderCreationAttributes> {
    @PrimaryKey
    @Column
    ID_ORDER_HEADER: number;

    @ForeignKey(() => OrderStatus)
    @Column
    ID_ORDER_STATUS: number;

    @BelongsTo(() => OrderStatus)
    ORDER_STATUS: OrderStatus;

    @ForeignKey(() => User)
    @Column
    ID_USER: number;

    @BelongsTo(() => User)
    OWNER: User;

    @Column
    DATE: Date;


}