import { NCMDto } from "../dto/product/ncm.dto";
import { ProductExtraction } from "../dto/product/product.extraction";

export function concatDuplicates(products:ProductExtraction[]){
    for(let i = 0; i < products.length; i++){
        for(let j = 0; j < products.length; j++){
            if(j!= i && products[i].produto.codigo === products[j].produto.codigo){
                products[i].valores.quantidadeComprada++;
                products = removeElementFromArray(products,j)
            }
        }    
    }
    return products;
}
function removeElementFromArray(originalArray:any[],indexToRemove:number){
    return originalArray.filter(function(element,index){
        return index != indexToRemove
    })
}
export function getDuplicates(products:NCMDto[]){
    for(let i = 0; i < products.length; i++){
        for(let j = (i +1); j < products.length; j++){
            if(j <= products.length && products[i].codigo === products[j].codigo){
                products = removeElementFromArray(products,j)
            }
        }    
    }
    return products;
}