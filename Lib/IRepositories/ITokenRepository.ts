import { Token } from "../../models/Token";
import { TokenAttributes } from "../IModels/TokenAttributes";

export interface ITokenRepository {

  GetByUserIdAndToken(userId: number, token: string): Promise<Token | null>;
  PostNewToken(newToken: TokenAttributes): Promise<void>;
  DeleteUserToken(userId: number): Promise<number>;
}