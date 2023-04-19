import { Basket } from "../../models/Basket";
import sequelize from "../../sequelize/db";
import { BasketDTO } from "../DTO/BasketDTO";
import { IBasketRepository } from "../IRepositories/IBasketRepository";

export class BasketRepository implements IBasketRepository {

    // Properties
    repository = sequelize.getRepository(Basket);

    // GET
    async GetAllBasket(): Promise<Basket[]> {
        return await this.repository.findAll();
    }
    async GetBasketById(id: number): Promise<Basket | null> {
        return await this.repository.findByPk(id);
    }

    //POST
    async PostNewBasket(newBasket: BasketDTO): Promise<void> {
        await this.repository.create({
            ID_USER: newBasket.ID_USER,
            ID_PRODUCT: newBasket.ID_PRODUCT,
            DATE: newBasket.DATE
        })
    }

    // PUT
    async PutBasket(basketToModify: BasketDTO): Promise<void> {
        await this.repository.update({
            ID_USER: basketToModify.ID_USER,
            ID_PRODUCT: basketToModify.ID_PRODUCT,
            DATE: basketToModify.DATE
        }, {
            where: {
                ID_BASKET: basketToModify.ID
            }
        })
    }

    // DELETE
    async DeleteBasket(basketToDeleteId: string): Promise<number> {
        let rowIsDeleted: number = 0;
        await this.repository.destroy({
            where: {
                ID_BASKET: basketToDeleteId
            }
        }).then(rowDeleted => {
            if(rowDeleted === 1){
                rowIsDeleted = 1;
            }
        })
        return rowIsDeleted;
    }

}