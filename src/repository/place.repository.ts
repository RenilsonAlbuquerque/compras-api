import { IPlaceRepository } from "../contracts/repository/IPlace.repository";
import { PlaceDto } from "../dto/place/place.dto";
import { Place, PlaceEntityName } from "../model/place";
import { Product } from "../model/product";
import {DatabaseConnection} from './database';

export class PlaceRepository implements IPlaceRepository {

    private connection:any;

    constructor() {
        //this.connection = DatabaseConnection.getInstance().getConnection;
    }
    async listAll(): Promise<PlaceDto[]> {
        let query = `Select id,nome,cnpj from  ${PlaceEntityName}`;
        let connection = await DatabaseConnection.getInstance().getConnection()
        const result = await connection.query(query);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection); 
        return result[0] as PlaceDto[];
    }
    
    async searchByCNPJ(cnpj: string): Promise<Place> {
        let queryString = `Select * from tb_estabelecimento where cnpj='${cnpj}'`;
        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let search = await connection.query(queryString);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection); 
        let result:Place = null;
        
        if(search[0].lenght > 0){
            result.id = search[0][0].id;
        }else{
            result = {
                id:-1
            } as Place;
        }
        return result;
    }
    
    public async searchByCodigo(codigo: string):Promise<Product> {
        
        let queryString = `Select * from tb_produtp where codigo='${codigo}'`;
        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let search = connection.query(queryString);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection); 
        let result:Product = null;
        if(search.lenght == 0){
           result = {

           } as Product;
        }else{
            result.id = search[0][0].id;
        }
        return result;
    }
    exists(id: number) {
        throw new Error("Method not implemented.");
    }
    async save(entity: Place):Promise<Place> {
        let query = 'INSERT INTO tb_estabelecimento(cnpj,nome,logradouro,numero,bairro,municipio,uf,cep) values '
    + `('${entity.cnpj}','${entity.nome}','${entity.logradouro}',${entity.numero},'${entity.bairro}','${entity.municipio}','${entity.uf}','${entity.cep}')`;
        let connection = await DatabaseConnection.getInstance().getConnection()
        const result = await connection.query(query);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection); 
        entity.id = result[0].insertId; 
        return entity;
    }
    delete(id: number) {
        throw new Error("Method not implemented.");
    }
    async list():Promise<Place[]> {
      throw new Error("Method not implemented");
    }
    update(entity: Place) {
        throw new Error("Method not implemented.");
    }
}

