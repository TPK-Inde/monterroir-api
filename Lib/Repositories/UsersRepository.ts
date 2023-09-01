import { IUsersRepository } from "../IRepositories/IUsersRepository";
import sequelize from "../../sequelize/db";
import { User } from "../../models/User";
import { Op } from "sequelize";

//Définition de constante
const config = require("../../config");

export class UsersRepository implements IUsersRepository {

  // Properties
  userRepository = sequelize.getRepository(User);

  // Constructor
  constructor() { }

  async GetAllUsers(numPage: number): Promise<User[]> {
    return await this.userRepository.findAll({
      limit: parseInt(config.listPerPage!),
      offset: ((numPage - 1) * parseInt(config.listPerPage!)),
      include: [sequelize.models.AccountStatus],
      attributes: { exclude: ["PASSWORD"] }
    })
  }
  async GetAllUsersWithFilter(numPage: number, value: string): Promise<User[]> {
    return await this.userRepository.findAll({
      where: {
        [Op.or]: {
          PSEUDONYM: { [Op.like]: `%${value}%` },
          EMAIL: { [Op.like]: `%${value}%` },
          LAST_NAME: { [Op.like]: `%${value}%` },
          FIRST_NAME: { [Op.like]: `%${value}%` },
        }
      },
      limit: parseInt(config.listPerPage!),
      offset: ((numPage - 1) * parseInt(config.listPerPage!)),
      include: [sequelize.models.AccountStatus],
      attributes: { exclude: ["PASSWORD"] }
    })
  }
  async GetUserById(userId: number): Promise<User | null> {
    return await this.userRepository.findByPk(userId, {
      include: [sequelize.models.AccountStatus],
      attributes: { exclude: ["PASSWORD"] }
    });
  }
  async GetLimitedUserInformationById(userId: number): Promise<User | null> {
    return await this.userRepository.findByPk(userId, {
      include: [sequelize.models.AccountStatus],
      attributes: { exclude: ["ID_ACCOUNT_STATUS", "LAST_NAME", "FIRST_NAME", "DATE_OF_BIRTH", "EMAIL", "ADDRESS_STREET", "ADDRESS_ZIP_CODE", "ADDRESS_CITY", "PASSWORD"] }
    });
  }
  async GetUserFullById(userId: number): Promise<User | null> {
    return await this.userRepository.findByPk(userId);
  }
  async GetUserByEmail(userEmail: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { EMAIL: userEmail }, include: [sequelize.models.AccountStatus] });
  }
  async GetUserByPseudonym(userPseudonym: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { PSEUDONYM: userPseudonym }, include: [sequelize.models.AccountStatus] });
  }
  async PostNewUser(newUser: User): Promise<void> {
    await this.userRepository.create(newUser);
  }
  async PutUser(userToModify: User): Promise<void> {
    await this.userRepository.update(userToModify, { where: { ID_USER: userToModify.ID_USER } });
  }
  async DeleteUser(userId: number): Promise<number> {
    return await this.userRepository.destroy({ where: { ID_USER: userId } });
  }
}