import { INfceRepository } from "../contracts/repository/INfceRepository";
import { Nfce, NfceEntityName } from "../model/nfce";
import { ProfileNfceRelationName } from "../model/profile.nfce";
import {DatabaseConnection} from './database';

export class NfceProfileRepository  {

    //private connection:any;

    constructor() {
        
    }
    
    exists(id: number) {
        throw new Error("Method not implemented.");
    }
    async save(profileId:number,nfceId:number):Promise<boolean> {
        let query = `INSERT INTO ${ProfileNfceRelationName} (id_perfil,id_compra) values `
    + `(${profileId},${nfceId})`;
        let connection = await DatabaseConnection.getInstance().getConnection();
        const result = await connection.query(query); 
        return true;
    }
    delete(id: number) {
        throw new Error("Method not implemented.");
    }
    list():Promise<Nfce[]> {
        throw new Error("Method not implemented.");
    }
    update(entity: Nfce) {
        throw new Error("Method not implemented.");
    }
}

