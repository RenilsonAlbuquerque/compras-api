import { IUserRepository } from "../contracts/repository/IUser.repository";
import { KeyValueDto } from "../dto/commons/key.value";
import { databaseToEntity } from "../mappers/user.mapper";
import { User,UserEntityName } from "../model/user";
import {DatabaseConnection} from './database';


export class UserRepository implements IUserRepository {

    private connection:any;

    constructor() {
        //this.connection = DatabaseConnection.getInstance().getConnection;
    }
    
    public async searchByCodigo(codigo: string):Promise<User> {
        
        let queryString = `Select * from ${UserEntityName} where id_social='${codigo}'`;
        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let search = await connection.query(queryString);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection);
        let result:User = null;
        if(search[0].length > 0){
            result  = databaseToEntity(search[0][0]);
        }else{
            result = {
                id:-1
            } as User;
        }
        return result;
    }
    exists(id: number) {
        throw new Error("Method not implemented.");
    }
    async save(entity: User):Promise<User> {
        let query = `INSERT INTO ${UserEntityName} (id_social,token,nome,email) values `
        + `('${entity.idSocial}','${entity.token}','${entity.nome}','${entity.email}')`;
        let connection = await DatabaseConnection.getInstance().getConnection()
        const result = await connection.query(query);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection);
        entity.id = result[0].insertId;
        return entity; 
    }
    delete(id: number) {
        throw new Error("Method not implemented.");
    }
    async list():Promise<User[]> {
        throw new Error("Method not implemented.");
        // let queryString = `Select id,id_social as idSocial, from ${UserEntityName}`;
        // let connection = await DatabaseConnection.getInstance().getConnection(); 
        // let search = await connection.query(queryString);
        // // let result:ProfileDetailDto = null;
        // // if(search[0].length > 0){
        // //     result  = search[0][0] as ProfileDetailDto;
        // // }else{
        // //     result = {
        // //         id:-1
        // //     } as Product;
        // // }

        // return search[0] as User[];
    }
    async listUserDto(): Promise<KeyValueDto[]> {
        let queryString = `Select id,nome from ${UserEntityName}`;
        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let search = await connection.query(queryString);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection);
        return search[0] as KeyValueDto[]
    }
    update(entity: User) {
        throw new Error("Method not implemented.");
    }
    // public getUser(){
    //     pool.getConnection(function(err, connection) {
    //         // Use the connection
    //         connection.query('SELECT something FROM sometable', function (error, results, fields) {
    //           // And done with the connection.
    //           connection.release();
          
    //           // Handle error after the release.
    //           if (error) throw error;
          
    //           // Don't use the connection here, it has been returned to the pool.
    //         });
    //       });
    // }
    
}

