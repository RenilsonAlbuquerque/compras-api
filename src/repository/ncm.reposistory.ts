import { INCMRepository } from "../contracts/repository/INCMRepository";
import { NCMDto } from "../dto/product/ncm.dto";
import { NcmeEntityName } from "../model/ncm";
import { ProductEntityName } from "../model/product";
import {DatabaseConnection} from './database';

export class NcmRepository implements INCMRepository {

    //private connection:any;

    constructor() {
        
    }
    async save(ncm: NCMDto) {
        let query = `INSERT INTO ${NcmeEntityName} (codigo,nome) values `
    + `('${ncm.codigo}','${ncm.name}')`;
        let connection = await DatabaseConnection.getInstance().getConnection();
        const result = await connection.query(query);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection); 
        ncm.id = result[0].insertId; 
        return ncm;
    }
    async listAll(): Promise<NCMDto[]> {
        let query = `Select ncm as codigo,nome as name from ${ProductEntityName}`;
        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let search = await connection.query(query);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection); 
        let result:NCMDto[] = null;
        if(search[0].length > 0){
            result  = search[0];
        }
        else{
            result = [];
        }
        return result;
    }
    async listAllNCMs(): Promise<NCMDto[]> {
        let query = `Select id,codigo,nome from ${NcmeEntityName}`;
        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let search = await connection.query(query);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection); 
        let result:NCMDto[] = null;
        if(search[0].length > 0){
            result  = search[0];
        }
        else{
            result = [];
        }
        return result;
    }
}

