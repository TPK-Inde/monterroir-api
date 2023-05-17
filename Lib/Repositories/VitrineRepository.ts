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
        ],
        where: { DELETED: false }
      });
  }
  async GetAllActive(pageNumber: number, idUser: number): Promise<Vitrine[]> {
    return await this.vitrineRepository.findAll(
      {
        where: { ACTIVATE: true, DELETED: false },
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
  async GetAllActivateWithCoordonates(pageNumber: number, idUser: number, lat: number, lng: number): Promise<Vitrine[]> {
    return await this.vitrineRepository.findAll(
      {
        where: this.vitrineRepository.sequelize!.and(
          sequelize.where(
            sequelize.literal(`6371 * acos(cos(radians(${lat})) * cos(radians(latitude)) * cos(radians(${lng}) - radians(longitude)) + sin(radians(${lat})) * sin(radians(latitude)))`),
            '<=',
            30
          ),
          { ACTIVATE: true, DELETED: false }
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
  async GetAllVitrineWithCoordinate(lat: number, lng: number): Promise<Vitrine[]> {
    return await this.vitrineRepository.findAll(
      {
        where: this.vitrineRepository.sequelize!.and(
          sequelize.where(
            sequelize.literal(`6371 * acos(cos(radians(${lat})) * cos(radians(latitude)) * cos(radians(${lng}) - radians(longitude)) + sin(radians(${lat})) * sin(radians(latitude)))`),
            '<=',
            30
          ),
          { DELETED: false }
        ),
        include: [
          sequelize.models.CategoryVitrine,
          sequelize.models.TypeVitrine,
          { model: sequelize.models.User, attributes: userAttribute },
        ]
      });
  }
  async GetById(vitrineId: number, idUser: number): Promise<Vitrine | null> {
    return await this.vitrineRepository.findOne({
      where: { ID_VITRINE: vitrineId, ACTIVATE: true, DELETED: false },
      include: [
        sequelize.models.CategoryVitrine,
        sequelize.models.TypeVitrine,
        { model: sequelize.models.User, attributes: userAttribute },
        { model: sequelize.models.FavoriteVitrine, where: { ID_USER: idUser }, required: false }
      ]
    });
  }
  async GetByUserId(userId: number): Promise<Vitrine[]> {
    return await this.vitrineRepository.findAll({
      where: {
        ID_USER: userId,
        DELETED: false
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
  async DeleteVitrine(idVitrine: number): Promise<void> {
    await this.vitrineRepository.update({ DELETED: true }, { where: { ID_VITRINE: idVitrine } })
  }

}