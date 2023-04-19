import { BasketAttributes } from "../IModels/BasketAttributes";

export class BasketDTO implements BasketAttributes {
    ID: number;
    ID_USER: number;
    ID_PRODUCT: number;
    DATE: Date;

    constructor() {}
}