import { RateAttributes } from "../IModels/RateAttributes";

export class RateDTO implements RateAttributes {
    ID_RATE: number;
    ID_USER: number;
    ID_VITRINE: number;
    RATE: number;
    DATE: Date;

    constructor() {}
}