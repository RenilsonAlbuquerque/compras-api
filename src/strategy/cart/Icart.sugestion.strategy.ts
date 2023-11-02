import { ProductShoppingListDTO } from "../../dto/sugestion/product.shopping.list";

export interface ICartSugestionStrategy{
    execute(profileId:number):Promise<ProductShoppingListDTO[]> ;
}