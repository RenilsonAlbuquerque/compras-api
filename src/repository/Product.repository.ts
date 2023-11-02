import { IproductRepository } from "../contracts/repository/IProduct.repository";
import { ProductAnalisisDto } from "../dto/product/product.analisis.dto";
import { ProductChartTimelineDto } from "../dto/product/product.chart.timeline.dto";
import { ProductOverviewDto } from "../dto/product/product.overview.dto";
import { ProductSearchDTO } from "../dto/product/product.search.dto";
import { NfceEntityName } from "../model/nfce";
import { PlaceEntityName } from "../model/place";
import { Product, ProductEntityName } from "../model/product";
import { ProductNfceEntityName } from "../model/product.nfce";
import { ProfileNfceRelationName } from "../model/profile.nfce";
import {DatabaseConnection} from './database';

export class ProductRepository implements IproductRepository {

    private connection:any;

    constructor() {
        //this.connection = DatabaseConnection.getInstance().getConnection;
    }
    
    // async getProductPriceAnalisis(ncm: string, profileId: number): Promise<ProductAnalisisDto> {
    //     let queryString = `select prodcomp.valorUnidade as value,comp.data_compra as buyData from ${NfceEntityName} as comp `
    //     + `inner join ${ProfileNfceRelationName} as perfcomp on perfcomp.id_compra = comp.id `
    //     + `inner join ${ProductNfceEntityName} as prodcomp on comp.id = prodcomp.id_compra `
    //     + `inner join ${ProductEntityName} as prod on prod.id = prodcomp.id_produto `
    //     + `where prod.ncm = '${ncm}' and perfcomp.id_perfil=${profileId}`;

    //     let connection = await DatabaseConnection.getInstance().getConnection(); 
    //     let search = await connection.query(queryString);
    //     DatabaseConnection.getInstance().getPool().releaseConnection(connection); 
    //     let timelineRows:ProductChartTimelineDto[] = null;
    //     if(search[0].length > 0){
    //         r  = search[0] as ProductChartTimelineDto[];
    //     }else{
    //         result = []
    //     }
    //     return result;
    // }
    async getProductAnalisis(ncm: string,profileId:number,productCode:string): Promise<ProductAnalisisDto> {
        let filterString = `and prod.ncm like '${ncm}%'`;
        if(productCode && productCode.trim().length > 0){
            filterString += ` and prod.codigo='${productCode}'`;
        }

        let queryString = `select distinct(DATE_FORMAT(comp.data_compra,'%d/%m/%Y')) as buyData,prodcomp.valorUnidade as value,prodcomp.total_imposto as imposto, prodcomp.quantidadeComprada,estab.nome as mercado `
        + `from ${NfceEntityName} as comp `
        + `inner join ${ProfileNfceRelationName} as perfcomp on perfcomp.id_compra = comp.id `
        + `inner join ${ProductNfceEntityName} as prodcomp on comp.id = prodcomp.id_compra `
        + `inner join ${ProductEntityName} as prod on prod.id = prodcomp.id_produto `
        + `inner join ${PlaceEntityName} as estab on estab.id = comp.id_mercado `
        + `where perfcomp.id_perfil=${profileId} ${filterString} order by comp.data_compra desc`;

       
        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let [searchResults,colDefinitions] = await connection.query(queryString);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection); 
        let timelineValueRows:ProductChartTimelineDto[] = [];
        if(searchResults.length > 0){
            searchResults.forEach(row => {
                timelineValueRows.push({
                    buyData: row.buyData,
                    value: row.value,
                    taxation:row.imposto,
                    quantidadeComprada: (row.quantidadeComprada > 0)? row.quantidadeComprada:1,
                    mercado: row.mercado
                });
            });
            
        }
        let result = {
            lastBuyValue:(timelineValueRows.length > 0)? timelineValueRows[0].value : 0,
            lastBuyDifference:(timelineValueRows.length >= 2) ? (timelineValueRows[0].value - timelineValueRows[1].value): 0,
            lastBuyTaxationDifference:(timelineValueRows.length >= 2) ? (timelineValueRows[0].taxation - timelineValueRows[1].taxation): 0,
            productTimeLine: timelineValueRows,
        } as ProductAnalisisDto;
        return result;
    }
    async getAllProductsByProfileId(profileId: number): Promise<ProductSearchDTO[]> {
        let queryString = `select prod.id,prod.nome as name,prod.ncm,prod.codigo from ${NfceEntityName} as comp `
        + `inner join ${ProfileNfceRelationName} as perfcomp on perfcomp.id_compra = comp.id `
        + `inner join ${ProductNfceEntityName} as prodcomp on comp.id = prodcomp.id_compra `
        + `inner join ${ProductEntityName} as prod on prod.id = prodcomp.id_produto `
        + `where perfcomp.id_perfil=${profileId}`;

        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let search = await connection.query(queryString);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection); 
        let result:ProductSearchDTO[] = null;
        if(search[0].length > 0){
            result  = search[0] as ProductSearchDTO[];
        }else{
            result = []
        }
        return result;
    }
    public async listAllProductsByNfceId(nfceId: number): Promise<ProductOverviewDto[]> {
        let queryString = `Select prod.id,prod.nome as name,comp.valorProduto as value,quantidadeComprada as quantity from ${ProductEntityName} as prod `
        + `inner join ${ProductNfceEntityName} as comp on prod.id = comp.id_produto `
        + `where comp.id_compra=${nfceId}`;
        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let search = await connection.query(queryString);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection); 
        let result:ProductOverviewDto[] = null;
        if(search[0].length > 0){
            result  = search[0] as ProductOverviewDto[];
        }else{
            result = []
        }
        return result;
    }
    public async searchByCodigo(codigo: string):Promise<Product> {
        
        let queryString = `Select * from ${ProductEntityName} where codigo='${codigo}'`;
        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let search = await connection.query(queryString);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection); 
        let result:Product = null;
        if(search[0].length > 0){
            result  = search[0][0] as Product;
        }else{
            result = {
                id:-1
            } as Product;
        }
        return result;
    }
    exists(id: number) {
        throw new Error("Method not implemented.");
    }
    async save(entity: Product):Promise<Product> {
        let query = `INSERT INTO ${ProductEntityName} (codigo,cean,nome,ncm,cest,cfop) values `
        + `('${entity.codigo}','${entity.cean}','${entity.nome}','${entity.ncm}','${entity.cest}','${entity.cfop}')`;
        let connection = await DatabaseConnection.getInstance().getConnection()
        const result = await connection.query(query);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection); 
        entity.id = result[0].insertId;
        return entity; 
    }
    delete(id: number) {
        throw new Error("Method not implemented.");
    }
    list():Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    update(entity: Product) {
        throw new Error("Method not implemented.");
    }
}

