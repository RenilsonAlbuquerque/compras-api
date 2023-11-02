import { ProductShoppingListDTO } from "../../dto/sugestion/product.shopping.list";
import { ICartSugestionStrategy } from "./Icart.sugestion.strategy";

export class DayMeanSugestionStrategy implements ICartSugestionStrategy {
    async execute(profileId: number): Promise<ProductShoppingListDTO[]> {
        //Listar todos os produtos por ncm e para cada produto, calcular a média de tempo para compra dos ultimos 5 dias além de retornar a data da ultima compra 
        throw new Error("Method not implemented.");
    }
}