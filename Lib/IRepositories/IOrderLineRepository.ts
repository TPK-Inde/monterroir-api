import { OrderLine } from "../../models/OrderLine";
import { OrderLineDTO } from "../DTO/OrderLineDTO";

export interface IOrderLineRepository{

    GetOrderLineById(orderLineId : string) : Promise<OrderLine | null>
    GetOrderLinesByOrderHeaderId (orderHeaderId : string) : Promise<OrderLine[]>
    PostNewOrderLine (newOrderLine : OrderLineDTO) : void
    PutOrderLine(orderLineToModify : OrderLineDTO) : void
    DeleteOrderLine(orderLineId : string): Promise<number>

}