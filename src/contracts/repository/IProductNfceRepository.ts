import { Product } from "../../model/product";
import { ProductNFCE } from "../../model/product.nfce";
import { ICrud } from "./ICrud";

export interface IProductNfceRepository extends ICrud<ProductNFCE,number> {

  //searchByIds(productid:number,nfce:number):Promise<ProductNFCE>;

}