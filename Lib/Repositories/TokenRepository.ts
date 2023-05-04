import { Token } from "../../models/Token";
import { ITokenRepository } from "../IRepositories/ITokenRepository";
import sequelize from "../../sequelize/db";
import { TokenAttributes } from "../IModels/TokenAttributes";

export class TokenRepository implements ITokenRepository {
  //Properties
  tokenRepository = sequelize.getRepository(Token);

  constructor() { }

    async GetByUserIdAndToken(userId: number, token: string): Promise<Token | null> {
        return await this.tokenRepository.findOne({ 
            where: { 
                ID_USER: userId,
                TOKEN: token
            }
        });
    }
    async PostNewToken(newToken: TokenAttributes): Promise<void> {
        await this.tokenRepository.create(newToken)
    }
    async DeleteUserToken(userId: number): Promise<number> {
        return await this.tokenRepository.destroy({ where: { ID_USER: userId } })
    }

}