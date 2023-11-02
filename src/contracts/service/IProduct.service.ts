import { ProductTax } from "../../dto/product-tax.dto";
import { ProductAnalisisDto } from "../../dto/product/product.analisis.dto";
import { ProductAnalisisSearchDto } from "../../dto/product/product.analisis.search.to";
import { ProductSearchDTO } from "../../dto/product/product.search.dto";
import { Nfce } from "../../model/nfce";
import { Product } from "../../model/product";

export interface IProductService {

    checkProductAndSave(product:Product);
    checkProductAndSaveInNfce(product: Product,productTax:ProductTax,nfce:Nfce);
    listAllProductsByProfileId(profileId:number):Promise<ProductSearchDTO[]>;
    getProductAnalisis(analisisSearch:ProductAnalisisSearchDto):Promise<ProductAnalisisDto>;

}