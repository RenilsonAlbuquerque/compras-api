import { ProductOverviewDto } from "../product/product.overview.dto";

export interface NfceOverviewDto{
    id:number,
    nfceDate:string,
    products:ProductOverviewDto[]
    total:number
}