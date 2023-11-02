import { IProductNfceRepository } from "../contracts/repository/IProductNfceRepository";
import { ProductNFCE } from "../model/product.nfce";
import {DatabaseConnection} from './database';
import {ProductNfceEntityName} from '../model/product.nfce';

export class ProductNfceRepository implements IProductNfceRepository {

    //private connection:any;

    constructor() {
        
    }
    
    exists(id: number) {
        throw new Error("Method not implemented.");
    }
    async save(entity: ProductNFCE):Promise<ProductNFCE> {
        let query = `INSERT INTO ${ProductNfceEntityName} (id_produto,id_compra,unidadeComprada,quantidadeComprada,valorUnidade,valorProduto,ceantrib,utrib,qtrib,vunTrib,indtot,valor_icms,total_imposto) values `
    + `(${entity.idProduto},${entity.idCompra},'${entity.unidadeComprada}',${entity.quantidadeComprada},${entity.valorUnidade},${entity.valorProduto},'${entity.ceantrib}','${entity.utrib}',${entity.qtrib},'${entity.vunTrib}',${entity.indtot},${entity.valorIcms},${entity.valorTotalImposto})`;
        let connection = await DatabaseConnection.getInstance().getConnection();
        const result = await connection.query(query);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection); 
        //entity.id = result[0].insertId; 
        return entity;
    }
    delete(id: number) {
        throw new Error("Method not implemented.");
    }
    list():Promise<ProductNFCE[]> {
        throw new Error("Method not implemented.");
    }
    update(entity: ProductNFCE) {
        throw new Error("Method not implemented.");
    }
}

