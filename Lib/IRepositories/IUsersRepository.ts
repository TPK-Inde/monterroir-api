import { User } from "../../models/User";

export interface IUsersRepository {

  GetAllUsers(numPage: number): Promise<User[]>;
  GetUserById(userId: number): Promise<User | null>;
  GetUserByEmail(userEmail: string): Promise<User | null>;
  PostNewUser(newUser: User): void;
  PutUser(userToModify: User): void;
  DeleteUser(userId: number): Promise<number>;
}