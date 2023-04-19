import {
    Model, AllowNull, DataType, Column, Table, Scopes, CreatedAt, UpdatedAt, HasMany, BelongsToMany,
    ForeignKey, BelongsTo, PrimaryKey
} from 'sequelize-typescript';
import {Optional} from "sequelize";
import {OrderHeaderAttributes} from "../Lib/IModels/OrderHeaderAttributes";

interface OrderHeaderCreationAttributes extends Optional<OrderHeaderAttributes, 'ID_ORDER_HEADER'> {}

@Table({
    timestamps: false,
    tableName: 'f_order_header'
})
export class OrderHeader extends Model<OrderHeader, OrderHeaderAttributes> {
    @PrimaryKey
    @Column
    ID_ORDER_HEADER: number;

    @Column
    ID_ORDER_STATUS: number;

    @Column
    ID_USER : number;

    @Column
    DATE: Date;


}