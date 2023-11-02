export interface ProductShoppingListDTO{
    id:number,
    name:string,
    codigo:string,
    ncm:string,
    previousPrice:number,
    quantity:number,
    bought:boolean,
}
export const CartEntityName = 'tb_carrinho';