import { IOrderLineRepository } from "../IRepositories/IOrderLineRepository";
import sequelize from "../../sequelize/db";
import { OrderLine } from "../../models/OrderLine";
import { OrderLineDTO } from "../DTO/OrderLineDTO";

export class OrderLineRepository implements IOrderLineRepository{

    orderLineRepository = sequelize.getRepository(OrderLine);

    constructor() {}

    async GetOrderLineById(orderLineId : string) : Promise<OrderLine | null>{
        return await this.orderLineRepository.findByPk(orderLineId)
    }

    async GetOrderLinesByOrderHeaderId (orderHeaderId : string) : Promise<OrderLine[]>{
        return await this.orderLineRepository.findAll({
            where : {
                ID_ORDER_HEADER : orderHeaderId
            }
        })
    }

    async PostNewOrderLine (newOrderLine : OrderLineDTO) : Promise<void>{
        await this.orderLineRepository.create({
            ID_ORDER_LINE : newOrderLine.ID_ORDER_LINE,
            ID_PRODUCT : newOrderLine.ID_PRODUCT,
            ID_ORDER_HEADER : newOrderLine.ID_ORDER_HEADER,
            ORDER_QUANTITY : newOrderLine.ORDER_QUANTITY,
            PRICE : newOrderLine.PRICE,
        })
    }

    async PutOrderLine(orderLineToModify : OrderLineDTO) : Promise<void>{
        await this.orderLineRepository.update({
            ID_ORDER_LINE : orderLineToModify.ID_ORDER_LINE,
            ID_PRODUCT : orderLineToModify.ID_PRODUCT,
            ID_ORDER_HEADER : orderLineToModify.ID_ORDER_HEADER,
            ORDER_QUANTITY : orderLineToModify.ORDER_QUANTITY,
            PRICE : orderLineToModify.PRICE,
        }, {
            where : {
                ID_ORDER_LINE : orderLineToModify.ID_ORDER_LINE,
            }
        })
    }

    async DeleteOrderLine(orderLineId : string): Promise<number>{
        return await this.orderLineRepository.destroy({
            where : {
                ID_ORDER_LINE : orderLineId
            }
        })
    }
}