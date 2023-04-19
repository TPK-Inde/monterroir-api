import { BasketAttributes } from "../IModels/BasketAttributes";

export class BasketDTO implements BasketAttributes {
    ID_BASKET: number;
    ID_USER: number;
    ID_PRODUCT: number;
    DATE: Date;

    constructor() { }
}