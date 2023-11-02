import { KeyValueDto } from "../../dto/commons/key.value";
import { User } from "../../model/user";
import { ICrud } from "./ICrud";

export interface IUserRepository extends ICrud<User,number> {

  searchByCodigo(codigo:string):Promise<User>;
  listUserDto():Promise<KeyValueDto[]>;

}