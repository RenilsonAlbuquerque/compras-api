export interface Place{
    id:number,
    cnpj:string,
    nome:string,
    logradouro:string,
    numero:number,
    bairro:string,
    municipio:string,
    uf:string,
    cep:string
}
export const PlaceEntityName = 'tb_estabelecimento';