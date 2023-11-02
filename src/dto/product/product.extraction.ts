import { Product } from "../../model/product";
import { ProductTax } from "../product-tax.dto";

export interface ProductExtraction{
    produto:Product,
    valores:ProductTax,


}