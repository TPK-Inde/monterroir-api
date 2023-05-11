import { IOrderLineRepository } from "../IRepositories/IOrderLineRepository";
import sequelize from "../../sequelize/db";
import { OrderLine } from "../../models/OrderLine";
import { OrderLineDTO } from "../DTO/OrderLineDTO";

const productAttibute = ["ID_PRODUCT", "NAME"]
const vitrineAttibute = ["ID_VITRINE", "NAME"]

export class OrderLineRepository implements IOrderLineRepository{

    // Properties
    orderLineRepository = sequelize.getRepository(OrderLine);

    // Constructor
    constructor() {}

    //  GET
    async GetOrderLineById(orderLineId : string) : Promise<OrderLine | null>{
        return await this.orderLineRepository.findByPk(orderLineId, {include: [{model: sequelize.models.Product, attributes: productAttibute, include: [{model: sequelize.models.Vitrine, attributes: vitrineAttibute}]}]})
    }

    async GetOrderLinesByOrderHeaderId (orderHeaderId : string) : Promise<OrderLine[]>{
        return await this.orderLineRepository.findAll({
            where : {
                ID_ORDER_HEADER : orderHeaderId
            },
            include: [{model: sequelize.models.Product, attributes: productAttibute, include: [{model: sequelize.models.Vitrine, attributes: vitrineAttibute}]}]
        })
    }

    // POST
    async PostNewOrderLine (newOrderLine : OrderLineDTO) : Promise<void>{
        await this.orderLineRepository.create({
            ID_ORDER_LINE : newOrderLine.ID_ORDER_LINE,
            ID_PRODUCT : newOrderLine.ID_PRODUCT,
            ID_ORDER_HEADER : newOrderLine.ID_ORDER_HEADER,
            ORDER_QUANTITY : newOrderLine.ORDER_QUANTITY,
            PRICE : newOrderLine.PRICE,
        })
    }

    // PUT
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

    // DELETE
    async DeleteOrderLine(orderLineId : string): Promise<number>{
        return await this.orderLineRepository.destroy({
            where : {
                ID_ORDER_LINE : orderLineId
            }
        })
    }
}