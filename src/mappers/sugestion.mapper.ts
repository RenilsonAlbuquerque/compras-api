import { ProductSugestionDto } from "../dto/sugestion/product.sugestion.dto";
import { ProductSugestionVo } from "../dto/sugestion/product.sugestion.vo";

export function databaseToProductSugestionDto(databaseResult:any):ProductSugestionDto{
    return {
        id:databaseResult.id,
        nome: databaseResult.nome,
    } as ProductSugestionDto;
}
export function databaseToProductSugestionVo(databaseResult:any):ProductSugestionVo{
    return {
        id:databaseResult.id,
        nome: databaseResult.nome,
        data_compra: databaseResult.data_compra
    } as ProductSugestionVo;
}