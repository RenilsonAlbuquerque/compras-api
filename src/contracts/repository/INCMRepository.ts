import { NCMDto } from "../../dto/product/ncm.dto";

export interface INCMRepository {
    

    listAll():Promise<NCMDto[]>;
    listAllNCMs():Promise<NCMDto[]>;
    save(ncm:NCMDto): Promise<NCMDto>;


}