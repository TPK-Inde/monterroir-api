import { IOrderHeaderRepository } from "../IRepositories/IOrderHeaderRepository";
import sequelize from "../../sequelize/db";
import { OrderHeader } from "../../models/OrderHeader";
import { OrderHeaderDTO } from "../DTO/OrderHeaderDTO";

export class OrderHeaderRepository implements IOrderHeaderRepository {

    orderHeaderRepository = sequelize.getRepository(OrderHeader);

    constructor() {}

    async GetAllOrderHeaders(): Promise<OrderHeader[]> {

        return await this.orderHeaderRepository.findAll();
    }

    async GetOrderHeaderById(id: string): Promise<OrderHeader|null> {
        return await this.orderHeaderRepository.findByPk(id);
    }

    async GetOrderHeadersByUserId(userId : string) : Promise<OrderHeader[]>{
        return await this.orderHeaderRepository.findAll({
            where: {
                ID_USER: userId
            }
        });

    }

    async GetOrderHeadersFromUserAndStatus(statusId : string, userId : string ) : Promise<OrderHeader[]>{
        return await this.orderHeaderRepository.findAll({
            where:{
                ID_ORDER_STATUS : statusId ,
                ID_USER : userId
            }
        });

    }

    async PostNewOrderHeader(newOrderHeader : OrderHeaderDTO) : Promise<void> {
        await this.orderHeaderRepository.create({
            ID_ORDER_HEADER : newOrderHeader.ID_ORDER_HEADER,
            ID_ORDER_STATUS : newOrderHeader.ID_ORDER_STATUS,
            ID_USER : newOrderHeader.ID_USER,
            DATE : new Date(),
        })
    }

    async PutOrderHeader(orderHeaderToModify: OrderHeaderDTO): Promise<void> {
        await this.orderHeaderRepository.update({
            ID_ORDER_HEADER: orderHeaderToModify.ID_ORDER_HEADER,
            ID_ORDER_STATUS: orderHeaderToModify.ID_ORDER_STATUS,
            ID_USER: orderHeaderToModify.ID_USER,
            DATE: orderHeaderToModify.DATE
        }, {
            where: {
                ID_ORDER_HEADER: orderHeaderToModify.ID_ORDER_HEADER,
            }
        });
    }
    async DeleteOrderHeader(orderHeaderId: string): Promise<number> {
        return await this.orderHeaderRepository.destroy({
            where: {
                ID_ORDER_HEADER : orderHeaderId
            }
        })
    }

}