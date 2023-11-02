import { ProductShoppingListDTO } from "../../dto/sugestion/product.shopping.list";

export interface ICartRepository {

    listCartItemsByProfileId(profileId:number):Promise<ProductShoppingListDTO[]>;
    save(entity: ProductShoppingListDTO,profileId:number):Promise<ProductShoppingListDTO>;
    update(entity: ProductShoppingListDTO):Promise<ProductShoppingListDTO>;
    searchByName(entity: ProductShoppingListDTO):Promise<ProductShoppingListDTO>;
    deleteCart(profileId:number):Promise<boolean>;

}