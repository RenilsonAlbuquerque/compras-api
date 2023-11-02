import { AnalisisChart } from "../../dto/chart/analisis.chart";
import { ChartSearchDto } from "../../dto/chart/chart.search.dto";
import { ProductShoppingListDTO } from "../../dto/sugestion/product.shopping.list";

export interface ICartService{
    listCartByProfileId(profileId:number): Promise<ProductShoppingListDTO[]>;
    saveCart(cart: ProductShoppingListDTO[],profileId:number);
    ClearCartByProfileId(profileId:number):Promise<boolean>;
}