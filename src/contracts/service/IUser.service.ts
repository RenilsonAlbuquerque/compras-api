import { KeyValueDto } from "../../dto/commons/key.value";
import { User } from "../../model/user";

export interface IUserService {

    checkUserAndSave(user:User);
    listAllUsersDto():Promise<KeyValueDto[]>
    //checkUserAndSaveInNfce(product: Product,productTax:ProductTax,nfce:Nfce);

}