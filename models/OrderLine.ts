import {
    Model, Column, Table, ForeignKey, BelongsTo, PrimaryKey
} from 'sequelize-typescript';
import {OrderLineAttributes} from "../Lib/IModels/OrderLineAttributes";
import { Product } from './Product';

@Table({
    timestamps: false,
    tableName: 'F_ORDER_LINE'
})
export class OrderLine extends Model<OrderLine, OrderLineAttributes> {
    @PrimaryKey
    @Column
    ID_ORDER_LINE: number;

    @ForeignKey(() => Product)
    @Column
    ID_PRODUCT: number;

    @BelongsTo(() => Product)
    PRODUCT: Product;

    @Column
    ID_ORDER_HEADER : number;

    @Column
    ORDER_QUANTITY: number;

    @Column
    PRICE : number;
}