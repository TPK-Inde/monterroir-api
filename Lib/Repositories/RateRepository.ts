import { Rate } from "../../models/Rate";
import sequelize from "../../sequelize/db";
import { RateDTO } from "../DTO/RateDTO";
import { IRateRepository } from "../IRepositories/IRateRepository";


export class RateRepository implements IRateRepository {

    // Properties
    repository = sequelize.getRepository(Rate);

    async GetAllRates(): Promise<Rate[]> {
        const rates = await this.repository.findAll();
        return rates;
    }
    async GetRateById(id: string): Promise<Rate|null> {
        const rate = await this.repository.findByPk(id);
        return rate;
    }
    async GetVitrineRates(idVitrine: string): Promise<Rate[]> {
        const vitrineRates = await this.repository.findAll({
            where: {
                ID_VITRINE: idVitrine
            }
        });
        if(vitrineRates != null){
            return vitrineRates
        } else {
            const emptyVitrineRate: Rate[] = []
            return emptyVitrineRate;
        }

    }
    async PostNewRate(rateToPost: RateDTO): Promise<void> {
        await this.repository.create({
            ID_USER: rateToPost.ID_USER,
            ID_VITRINE: rateToPost.ID_VITRINE,
            RATE: rateToPost.RATE,
            DATE: rateToPost.DATE
        })
    }
    async PutRate(rateToModify: RateDTO): Promise<void> {
        await this.repository.update({
            ID_USER: rateToModify.ID_USER,
            ID_VITRINE: rateToModify.ID_VITRINE,
            RATE: rateToModify.RATE,
            DATE: rateToModify.DATE
        }, {
            where: {
                ID_RATE: rateToModify.ID_RATE
            }
        })
    }
    async DeleteRate(rateToDeleteId: string): Promise<number> {
        let rowIsDeleted: number = 0;
        await this.repository.destroy({
            where: {
                ID_RATE: rateToDeleteId
            }
        }).then(rowDeleted => {
            if(rowDeleted === 1) {
                rowIsDeleted = 1
            }
        })
        return rowIsDeleted;
    }

}