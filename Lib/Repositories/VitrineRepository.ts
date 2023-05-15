import { Vitrine } from "../../models/Vitrine";
import sequelize from "../../sequelize/db";
import { IVitrineRepository } from "../IRepositories/IVitrineRepository";

const config = require("../../config");
const userAttribute = ["ID_USER", "PSEUDONYM"];

export class VitrineRepository implements IVitrineRepository {

  // Properties
  vitrineRepository = sequelize.getRepository(Vitrine);

  //Constuctor
  constructor() { }

  async GetAll(pageNumber: number): Promise<Vitrine[]> {
    return await this.vitrineRepository.findAll(
      {
        limit: parseInt(config.listPerPage!),
        offset: ((pageNumber - 1) * parseInt(config.listPerPage!)),
        include: [
          sequelize.models.CategoryVitrine,
          sequelize.models.TypeVitrine,
          { model: sequelize.models.User, attributes: userAttribute }
        ]
      });
  }
  async GetAllActive(pageNumber: number, idUser: number): Promise<Vitrine[]> {
    return await this.vitrineRepository.findAll(
      {
        where: { ACTIVATE: true },
        limit: parseInt(config.listPerPage!),
        offset: ((pageNumber - 1) * parseInt(config.listPerPage!)),
        include: [
          sequelize.models.CategoryVitrine,
          sequelize.models.TypeVitrine,
          { model: sequelize.models.User, attributes: userAttribute },
          { model: sequelize.models.FavoriteVitrine, where: { ID_USER: idUser }, required: false }
        ]
      });
  }
  async GetAllActiveWithCoordonates(pageNumber: number, idUser: number, lat: number, lng: number): Promise<Vitrine[]> {
    return await this.vitrineRepository.findAll(
      {
        where: this.vitrineRepository.sequelize!.and(
          sequelize.where(
            sequelize.literal(`6371 * acos(cos(radians(${lat})) * cos(radians(latitude)) * cos(radians(${lng}) - radians(longitude)) + sin(radians(${lat})) * sin(radians(latitude)))`),
            '<=',
            30
          ),
          { ACTIVATE: true }
        ),
        limit: parseInt(config.listPerPage!),
        offset: ((pageNumber - 1) * parseInt(config.listPerPage!)),
        include: [
          sequelize.models.CategoryVitrine,
          sequelize.models.TypeVitrine,
          { model: sequelize.models.User, attributes: userAttribute },
          { model: sequelize.models.FavoriteVitrine, where: { ID_USER: idUser }, required: false }
        ]
      });
  }
  async GetById(vitrineId: number): Promise<Vitrine | null> {
    return await this.vitrineRepository.findByPk(vitrineId, {
      include: [
        sequelize.models.CategoryVitrine,
        sequelize.models.TypeVitrine,
        { model: sequelize.models.User, attributes: userAttribute }
      ]
    });
  }
  async GetByUserId(userId: number): Promise<Vitrine[]> {
    return await this.vitrineRepository.findAll({
      where: {
        ID_USER: userId
      },
      include: [
        sequelize.models.CategoryVitrine,
        sequelize.models.TypeVitrine,
        { model: sequelize.models.User, attributes: userAttribute }
      ]
    });
  }
  async PostNewVitrine(vitrineToPost: Vitrine): Promise<void> {
    await this.vitrineRepository.create(vitrineToPost)
  }
  async PutVitrine(vitrineToModify: Vitrine): Promise<void> {
    await this.vitrineRepository.update(vitrineToModify, { where: { ID_VITRINE: vitrineToModify.ID_VITRINE } })
  }
  async DeleteVitrine(vitrineToDeleteId: number): Promise<number> {
    return await this.vitrineRepository.destroy({ where: { ID_VITRINE: vitrineToDeleteId } })
  }

}