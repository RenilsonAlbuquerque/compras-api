import { INCMRepository } from "../contracts/repository/INCMRepository";
import { IproductRepository } from "../contracts/repository/IProduct.repository";
import { IProductNfceRepository } from "../contracts/repository/IProductNfceRepository";
import { IProductService } from "../contracts/service/IProduct.service";
import { ProductTax } from "../dto/product-tax.dto";
import { NCMDto } from "../dto/product/ncm.dto";
import { ProductAnalisisDto } from "../dto/product/product.analisis.dto";
import { ProductAnalisisSearchDto } from "../dto/product/product.analisis.search.to";
import { ProductSearchDTO } from "../dto/product/product.search.dto";
import { calculateDaysDifference } from "../helpers/custom.date.helper";
import { getDuplicates } from "../mappers/product.mapper";
import { Nfce } from "../model/nfce";
import { Product } from "../model/product";
import { ProductNFCE } from "../model/product.nfce";
import { NcmRepository } from "../repository/ncm.reposistory";
import { ProductNfceRepository } from "../repository/product.nfce.repository";
import { ProductRepository } from "../repository/Product.repository";
//import {calculateDaysDifference } from '../repository/Product.repository';


class ProductService implements IProductService {

    private productRepository:IproductRepository;
    private nfceproductRepository: IProductNfceRepository;
    private ncmRepository: INCMRepository;

    constructor() {
        this.productRepository = new ProductRepository();
        this.nfceproductRepository = new ProductNfceRepository();
        this.ncmRepository = new NcmRepository();
    }
    async getProductAnalisis(analisisSearch: ProductAnalisisSearchDto): Promise<ProductAnalisisDto> {
      
        let result = await this.productRepository.getProductAnalisis(analisisSearch.productNcm,analisisSearch.profileId,analisisSearch.productCode);
        let mean = 0;
        result.productTimeLine = result.productTimeLine.reverse()
        if(result.productTimeLine.length > 1){
            for(let i = 1; i< result.productTimeLine.length;i++){
                mean += calculateDaysDifference(result.productTimeLine[i].buyData,result.productTimeLine[i-1].buyData)/ result.productTimeLine[i-1].quantidadeComprada
            }
            result.unityMeanValue = mean/(result.productTimeLine.length -1)
        }else{
            result.unityMeanValue = 0
        }
        
        return result;
    }
    async listAllProductsByProfileId(profileId: number): Promise<ProductSearchDTO[]> {
        return await this.productRepository.getAllProductsByProfileId(profileId);
    }
    async checkProductAndSave(product: Product){
        let search = await this.productRepository.searchByCodigo(product.codigo); 
        if(search.id < 0){
            product = await this.productRepository.save(product);
        }
        return product;
    }
    async checkProductAndSaveInNfce(product: Product,productTax:ProductTax,nfce:Nfce){
        let search  = await this.productRepository.searchByCodigo(product.codigo); 
        let productNfce = {
            idCompra:nfce.id,
            unidadeComprada: productTax.unidadeComprada,
            quantidadeComprada: productTax.quantidadeComprada,
            valorUnidade: productTax.valorUnidade,
            valorProduto: productTax.valorProduto,
            ceantrib: productTax.cEANTrib,
            utrib: productTax.uTrib,
            qtrib:productTax.qTrib,
            vunTrib: productTax.vUnTrib,
            indtot: productTax.indTot,
            valorIcms: productTax.valorIcms,
            valorTotalImposto:productTax.valorTotalImposto
            
        } as ProductNFCE;
        if(search.id < 0){
            product = await this.productRepository.save(product);
            productNfce.idProduto = product.id
        }
        else{
            productNfce.idProduto = search.id
        }
        

        await this.nfceproductRepository.save(productNfce);
        return product;
    }
    async listAllNCM(): Promise<NCMDto[]>{
        // let lista = getDuplicates( await this.ncmRepository.listAll());
        
        // lista.forEach(async (ncm) => {
        //     await this.ncmRepository.save(ncm)
        // })
        // return lista;
        return await this.ncmRepository.listAllNCMs();
    }
    
}

export default new ProductService();