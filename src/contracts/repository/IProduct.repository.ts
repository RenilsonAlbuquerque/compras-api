import { ProductAnalisisDto } from "../../dto/product/product.analisis.dto";
import { ProductChartTimelineDto } from "../../dto/product/product.chart.timeline.dto";
import { ProductOverviewDto } from "../../dto/product/product.overview.dto";
import { ProductSearchDTO } from "../../dto/product/product.search.dto";
import { Product } from "../../model/product";
import { ICrud } from "./ICrud";

export interface IproductRepository extends ICrud<Product,number> {
  
  searchByCodigo(codigo:string):Promise<Product>;
  listAllProductsByNfceId(nfceId:number):Promise<ProductOverviewDto[]>;
  getAllProductsByProfileId(profileId:number):Promise<ProductSearchDTO[]>;
  getProductAnalisis(ncm:string,profileId:number,productCode:string):Promise<ProductAnalisisDto>;
  //getProductPriceAnalisis(ncm:string,profileId:number):Promise<ProductAnalisisDto>;
}