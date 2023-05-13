import { FavoriteVitrine } from "../../models/FavoriteVitrine";

export interface IFavoriteVitrineRepository{
    GetFavoriteVitrineByUserID(idUser: number): Promise<FavoriteVitrine[]>
    GetFavoriteVitrine(idVitrine: number, idUser: number): Promise<boolean>
    PostFavoriteVitrine(favoriteVitrine: FavoriteVitrine): Promise<void>;
    DeleteFavoriteVitrine(idVitrine : number, idUser: number): Promise<number>;
}