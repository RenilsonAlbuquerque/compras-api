export interface User{
    id:number,
    idSocial:string,
    token:string,
    nome:string,
    email:string
}
export const UserEntityName = 'tb_usuario';