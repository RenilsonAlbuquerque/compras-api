import { IUserProfileRepository } from "../contracts/repository/IUserProfileRepository";
import { UserProfile, UserProfileRelationName } from "../model/user.profile";
import {DatabaseConnection} from './database';

export class UserProfileRepository implements IUserProfileRepository {

    //private connection:any;

    constructor() {
        
    }
    async saveUserInProfile(profileId: number, userId: number): Promise<boolean> {
        let query = `INSERT INTO ${UserProfileRelationName} (id_usuario,id_perfil) values `
        + `(${userId},${profileId})`;
        let connection = await DatabaseConnection.getInstance().getConnection();
        DatabaseConnection.getInstance().getPool().releaseConnection(connection);
        const result = await connection.query(query); 
        return true;
    }
   
   
    exists(id: number) {
        throw new Error("Method not implemented.");
    }
    async save(entity: UserProfile):Promise<UserProfile> {
        throw new Error("Method not implemented.");
    }
    delete(id: number) {
        throw new Error("Method not implemented.");
    }
    list():Promise<UserProfile[]> {
        throw new Error("Method not implemented.");
    }
    update(entity: UserProfile) {
        throw new Error("Method not implemented.");
    }
}

