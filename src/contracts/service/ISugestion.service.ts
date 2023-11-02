import { ProductShoppingListDTO } from "../../dto/sugestion/product.shopping.list";
import { ProductSugestionDto } from "../../dto/sugestion/product.sugestion.dto";

export interface ISugestionService {

    listSugestionBySupermarket(marketId:number):Promise<ProductSugestionDto[]>;
    listCartSugestionByProfile(profileId:number):Promise<ProductShoppingListDTO[]>;

}