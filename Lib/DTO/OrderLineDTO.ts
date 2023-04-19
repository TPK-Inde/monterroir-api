import { OrderLineAttributes } from "../IModels/OrderLineAttributes";


export class OrderLineDTO implements OrderLineAttributes {
    ID_ORDER_LINE: number;
    ID_PRODUCT: number;
    ID_ORDER_HEADER: number;
    ORDER_QUANTITY: number;
    PRICE : number;

    constructor() {}
}