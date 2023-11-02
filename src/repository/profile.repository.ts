import { IProfileRepository } from "../contracts/repository/IProfileRepository";
import { ProfileCreateDto } from "../dto/profile/profile.create";
import { ProfileDetailDto } from "../dto/profile/profile.detail";
import { Profile, ProfileEntityName } from "../model/profile";
import { UserProfileRelationName } from "../model/user.profile";
import {DatabaseConnection} from './database';

export class ProfileRepository implements IProfileRepository {

    //private connection:any;

    constructor() {
        
    }
    async listProfilesByUserId(userId: number): Promise<ProfileDetailDto[]> {
        let queryString = `Select per.id,per.nome from ${ProfileEntityName} as per `
        + `inner join ${UserProfileRelationName} as usper on usper.id_perfil = per.id `
        + `where usper.id_usuario = ${userId}`;
        let connection = await DatabaseConnection.getInstance().getConnection();
        
        let search = await connection.query(queryString);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection); 
        return search[0] as ProfileDetailDto[];
    }
    async createProfile(placeCreate: ProfileCreateDto): Promise<ProfileCreateDto> {
        let query = `INSERT INTO ${ProfileEntityName} (nome) values ('${placeCreate.nome}')`;
        let connection = await DatabaseConnection.getInstance().getConnection();
        const result = await connection.query(query);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection);
        placeCreate.id = result[0].insertId; 
        return placeCreate;
    }
   
    exists(id: number) {
        throw new Error("Method not implemented.");
    }
    async save(entity: Profile):Promise<Profile> {
        throw new Error("Method not implemented.");
    }
    delete(id: number) {
        throw new Error("Method not implemented.");
    }
    list():Promise<Profile[]> {
        throw new Error("Method not implemented.");
    }
    update(entity: Profile) {
        throw new Error("Method not implemented.");
    }
}

