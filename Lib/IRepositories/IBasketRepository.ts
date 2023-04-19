import { BasketDTO } from "../DTO/BasketDTO";
import { Basket } from "../../models/Basket";

export interface IBasketRepository {

    GetAllBasket(): Promise<Basket[]>;
    GetBasketById(id: number): Promise<Basket|null>;
    PostNewBasket(newBasket: BasketDTO): Promise<void>;
    PutBasket(basketToModify: BasketDTO): Promise<void>;
    DeleteBasket(basketToDeleteId: string): Promise<number>;
}