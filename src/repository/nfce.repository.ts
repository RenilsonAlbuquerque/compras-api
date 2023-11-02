import { INfceRepository } from "../contracts/repository/INfceRepository";
import { NfceOverviewDto } from "../dto/nfce/nfce.overview.dto";
import { Nfce, NfceEntityName } from "../model/nfce";
import {DatabaseConnection} from './database';

export class NfceRepository implements INfceRepository {

    //private connection:any;

    constructor() {
        
    }
    async getNfceDetailById(nfceId: number):Promise<NfceOverviewDto> {
        let query = `Select id,valor_nf as total,data_compra as nfceDate from ${NfceEntityName} where id=${nfceId}`;
        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let search = await connection.query(query);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection); 
        let result:NfceOverviewDto = null;
        if(search[0].length > 0){
            result  = search[0][0] as NfceOverviewDto;
        }
        else{
            result = {
                id: -1
            } as NfceOverviewDto;
        }
        
        return result;
    }
    public async searchByNumeroAndSerie(numero:number, serie:number):Promise<Nfce>{
        
        let query = `Select * from ${NfceEntityName} where numero=${numero} and serie=${serie}`;
        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let search = await connection.query(query);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection); 
        let result:Nfce = null;
        if(search[0].length > 0){
            result  = search[0][0] as Nfce;
        }
        else{
            result = {
                id: -1
            } as Nfce;
        }
        return result;
    }
    exists(id: number) {
        throw new Error("Method not implemented.");
    }
    async save(entity: Nfce):Promise<Nfce> {
        let query = `INSERT INTO ${NfceEntityName} (id_mercado,data_compra,hora,numero,serie,valor_total,valor_icms,valor_icms_desc,valor_produtos,valor_nf) values `
    + `(${entity.idMercado},STR_TO_DATE('${entity.data_compra}','%Y-%m-%d'),'${entity.hora}',${entity.numero},${entity.serie},${entity.valorTotal},${entity.valorIcms},${entity.valorIcmsDesc},${entity.valorProdutos},${entity.valorNotaFiscal})`;
        let connection = await DatabaseConnection.getInstance().getConnection();
        const result = await connection.query(query);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection); 
        entity.id = result[0].insertId; 
        return entity;
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

