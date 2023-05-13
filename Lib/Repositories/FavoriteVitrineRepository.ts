import { IFavoriteVitrineRepository } from "../IRepositories/IFavoriteVitrineRepository";
import { FavoriteVitrine } from "../../models/FavoriteVitrine";
import sequelize from "../../sequelize/db";

const vitrineAttribute = ["ID_VITRINE", "NAME", "IMAGE"];

export class FavoriteVitrineRepository implements IFavoriteVitrineRepository{

    //Properties
    favoriteVitrineRepository = sequelize.getRepository(FavoriteVitrine);

    //Constructor
    constructor() {}

    async GetFavoriteVitrineByUserID(idUser: number): Promise<FavoriteVitrine[]> {
        return await this.favoriteVitrineRepository.findAll({where: {ID_USER: idUser}, include: [{model: sequelize.models.Vitrine, attributes: vitrineAttribute}]});        
    }
    async GetFavoriteVitrine(idVitrine: number, idUser: number): Promise<boolean> {
        let result: boolean = false;
        await this.favoriteVitrineRepository.findOne({where: {ID_VITRINE: idVitrine, ID_USER: idUser}})
            .then((data: FavoriteVitrine | null) => {
                if (data != null){
                    result = true;
                }
            })
        
        return result;
    }
    async PostFavoriteVitrine(favoriteVitrine: FavoriteVitrine): Promise<void> {
        await this.favoriteVitrineRepository.create(favoriteVitrine);
    }
    async DeleteFavoriteVitrine(idVitrine: number, idUser: number): Promise<number> {
        return await this.favoriteVitrineRepository.destroy({ where: { ID_VITRINE: idVitrine, ID_USER: idUser } });
    }
}