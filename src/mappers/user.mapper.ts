import { UserLoginDto } from "../dto/user.login.dto";
import { User } from "../model/user";

export function databaseToEntity(databaseResult:any):User{
    return {
        id:databaseResult.id,
        idSocial: databaseResult.id_social,
        token: databaseResult.token,
        nome: databaseResult.nome,
        email: databaseResult.email
    } as User;
}
export function loginDtoToEntity(loginDto:UserLoginDto):User{
    return {
        id:0,
        idSocial: loginDto.idSocial,
        token: loginDto.token,
        nome: loginDto.nome,
        email: loginDto.email
    } as User;
}