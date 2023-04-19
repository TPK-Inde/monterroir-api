import { Vitrine } from "../../models/Vitrine";
import sequelize from "../../sequelize/db";
import { IVitrineRepository } from "../IRepositories/IVitrineRepository";

const config = require("../../config");


export class VitrineRepository implements IVitrineRepository {

  // Properties
  vitrineRepository = sequelize.getRepository(Vitrine);

  //Constuctor
  constructor() { }

  async GetAll(pageNumber: number): Promise<Vitrine[]> {
    return await this.vitrineRepository.findAll({ limit: parseInt(config.listPerPage!), offset: ((pageNumber - 1) * parseInt(config.listPerPage!)) });
  }
  async GetAllActive(pageNumber: number): Promise<Vitrine[]> {
    return await this.vitrineRepository.findAll({ where: { ACTIVATE: true }, limit: parseInt(config.listPerPage!), offset: ((pageNumber - 1) * parseInt(config.listPerPage!)) });
  }
  async GetById(vitrineId: number): Promise<Vitrine | null> {
    return await this.vitrineRepository.findByPk(vitrineId);
  }
  async GetByUserId(userId: number): Promise<Vitrine[]> {
    return await this.vitrineRepository.findAll({ where: { ID_USER: userId } });
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