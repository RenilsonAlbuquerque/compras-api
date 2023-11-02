import { ICartRepository } from "../contracts/repository/ICartRepository";
import { ChartList } from "../dto/chart/chart.list";
import { CartEntityName, ProductShoppingListDTO } from "../dto/sugestion/product.shopping.list";
import {DatabaseConnection} from './database';

export class CartRepository implements ICartRepository  {


    constructor() {
        //this.connection = DatabaseConnection.getInstance().getConnection;
    }
    
    async searchByName(entity: ProductShoppingListDTO): Promise<ProductShoppingListDTO> {
        let queryString = `Select id,nome as name, ncm, preco_anterior as previousPrice,quantidade as quantity,comprado as bought `
        + `from ${CartEntityName} where nome='${entity.name}'`;
        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let search = await connection.query(queryString);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection); 
        let result:ProductShoppingListDTO = null;
        if(search[0].length > 0){
            result  = search[0][0] as ProductShoppingListDTO;
        }else{
            result = {
                id:-1
            } as ProductShoppingListDTO;
        }
        return result;
    }
    async listCartItemsByProfileId(profileId: number): Promise<ProductShoppingListDTO[]> {
        let queryString = `select id,nome as name, ncm, preco_anterior as previousPrice,quantidade as quantity,comprado as bought `
        + `from tb_carrinho where id_perfil = ${profileId};`;
        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let search = await connection.query(queryString);
        let result:ProductShoppingListDTO[] = [];
        if(search[0].length > 0){
           result = search[0];
        }else{
            [] as ChartList[]
        }
        return result;
    }
    async save(entity: ProductShoppingListDTO,profileId:number):Promise<ProductShoppingListDTO> {
        let query = `INSERT INTO ${CartEntityName} (ncm,nome,preco_anterior,quantidade,comprado,id_perfil) values `
        + `('${entity.ncm}','${entity.name}',${entity.previousPrice},${entity.quantity},${entity.bought},${profileId})`;
        let connection = await DatabaseConnection.getInstance().getConnection()
        const result = await connection.query(query);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection); 
        entity.id = result[0].insertId;
        return entity; 
    }
    async update(entity: ProductShoppingListDTO): Promise<ProductShoppingListDTO> {
        let query = `UPDATE ${CartEntityName} SET comprado = ${entity.bought} where id = ${entity.id}`;
        let connection = await DatabaseConnection.getInstance().getConnection()
        const result = await connection.query(query);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection); 
        entity.id = result[0].insertId;
        return entity; 
    }
    async deleteCart(profileId:number):Promise<boolean> {
        let query = `Delete from ${CartEntityName} where id_perfil = ${profileId}; `
        let connection = await DatabaseConnection.getInstance().getConnection()
        await connection.query(query);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection); 
        return true; 
    }
    
    
    
}

