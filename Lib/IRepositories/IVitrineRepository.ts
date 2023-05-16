import { Vitrine } from "../../models/Vitrine";

export interface IVitrineRepository {

  GetAll(pageNumber: number): Promise<Vitrine[]>;
  GetAllActive(pageNumber: number, idUser: number): Promise<Vitrine[]>;
  GetAllActivateWithCoordonates(pageNumber: number, idUser: number, lat: number, lng: number): Promise<Vitrine[]>;
  GetAllVitrineWithCoordinate(lat: number, lng: number): Promise<Vitrine[]>;
  GetById(vitrineId: number, idUser: number): Promise<Vitrine | null>;
  GetByUserId(userId: number): Promise<Vitrine[]>;
  PostNewVitrine(vitrineToPost: Vitrine): Promise<void>;
  PutVitrine(vitrineToModify: Vitrine): Promise<void>;
  DeleteVitrine(idVitrine: number): Promise<void>;
}