import { OrderHeader } from "../../models/OrderHeader";
import { OrderHeaderDTO } from "../DTO/OrderHeaderDTO";

export interface IOrderHeaderRepository {

    GetAllOrderHeaders(): Promise<OrderHeader[]>;
    GetOrderHeaderById(id: string): Promise<OrderHeader|null>;
    GetOrderHeadersByUserId(id: string): Promise<OrderHeader[]>;
    GetOrderHeadersFromUserAndStatus(statusId : string, userId : string): Promise<OrderHeader[]>
    PostNewOrderHeader(newOrderHeader: OrderHeaderDTO): void;
    PutOrderHeader(orderHeaderToModify: OrderHeaderDTO): void;
    DeleteOrderHeader(orderHeaderId: string): Promise<number>;

}