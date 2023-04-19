import {
    Model, AllowNull, DataType, Column, Table, Scopes, CreatedAt, UpdatedAt, HasMany, BelongsToMany,
    ForeignKey, BelongsTo, PrimaryKey
} from 'sequelize-typescript';
import {Optional} from "sequelize";
import {OrderLineAttributes} from "../Lib/IModels/OrderLineAttributes";

interface OrderLineCreationAttributes extends Optional<OrderLineAttributes, 'ID_ORDER_LINE'> {}

@Table({
    timestamps: false,
    tableName: 'F_ORDER_LINE'
})
export class OrderLine extends Model<OrderLine, OrderLineAttributes> {
    @PrimaryKey
    @Column
    ID_ORDER_LINE: number;

    @Column
    ID_PRODUCT: number;

    @Column
    ID_ORDER_HEADER : number;

    @Column
    ORDER_QUANTITY: number;

    @Column
    PRICE : number;


}