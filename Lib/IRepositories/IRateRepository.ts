import { Rate } from "../../models/Rate";
import { RateDTO } from "../DTO/RateDTO";

export interface IRateRepository {

    GetAllRates(): Promise<Rate[]>;
    GetRateById(id: string): Promise<Rate|null>;
    GetVitrineRates(idVitrine: string): Promise<Rate[]>;
    PostNewRate(rateToPost: RateDTO): Promise<void>;
    PutRate(rateToModify: RateDTO): Promise<void>;
    DeleteRate(rateToDeleteId: string): Promise<number>;
    
}