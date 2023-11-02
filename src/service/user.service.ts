import { IUserRepository } from "../contracts/repository/IUser.repository";
import { IUserService } from "../contracts/service/IUser.service";
import { KeyValueDto } from "../dto/commons/key.value";
import { User } from "../model/user";
import { UserRepository } from "../repository/user.repository";

class UserService implements IUserService {

    private userRepository:IUserRepository;
    

    constructor() {
        this.userRepository = new UserRepository();
    }
    async listAllUsersDto(): Promise<KeyValueDto[]> {
        return await this.userRepository.listUserDto();
        
    }
    async checkUserAndSave(user: User){
        let search = await this.userRepository.searchByCodigo(user.idSocial); 
        if(search.id < 0){
            user = await this.userRepository.save(user);
        }
        else{
            user.id = search.id;
        }
        return user;
    }
   
}

export default new UserService();