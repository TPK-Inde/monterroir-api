import { OrderHeaderAttributes } from "../IModels/OrderHeaderAttributes";


export class OrderHeaderDTO implements OrderHeaderAttributes {
    ID_ORDER_HEADER: number;
    ID_ORDER_STATUS: number;
    ID_USER: number;
    DATE: Date;

    constructor() {}
}