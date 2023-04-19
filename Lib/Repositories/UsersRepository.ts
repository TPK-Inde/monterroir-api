import { IUsersRepository } from "../IRepositories/IUsersRepository";
import sequelize from "../../sequelize/db";
import { User } from "../../models/User";

//Définition de constante
const config = require("../../config");

export class UsersRepository implements IUsersRepository {

  // Properties
  userRepository = sequelize.getRepository(User);

  async GetAllUsers(numPage: number): Promise<User[]> {
    return await this.userRepository.findAll({ limit: parseInt(config.listPerPage!), offset: ((numPage - 1) * parseInt(config.listPerPage!)) })
  }
  async GetUserById(userId: number): Promise<User | null> {
    return await this.userRepository.findByPk(userId);
  }
  async GetUserByEmail(userEmail: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { EMAIL: userEmail } });
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