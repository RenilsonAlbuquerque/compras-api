import { ISugestionRepository } from "../contracts/repository/ISugestion.repository";
import { NfceSugestionMergeVO } from "../dto/sugestion/merge/nfce.sugestion.merge.vo";
import { ProductSugestionMergeVO } from "../dto/sugestion/merge/poduct.sugestion.merge.vo";
import { ProductNfceSugestionMergeVO } from "../dto/sugestion/merge/product-nfce.sugestion.merge.vo";
import { ProductPredictVO } from "../dto/sugestion/product.predict.vo";
import { ProductShoppingListDTO } from "../dto/sugestion/product.shopping.list";
import { ProductSugestionDto } from "../dto/sugestion/product.sugestion.dto";
import { ProductSugestionVo } from "../dto/sugestion/product.sugestion.vo";
import { databaseToProductSugestionDto, databaseToProductSugestionVo } from "../mappers/sugestion.mapper";
import { NfceEntityName } from "../model/nfce";
import { ProductEntityName } from "../model/product";
import { ProductEntry } from "../neural-network/ProductEntry";
import { SugestionVO } from "../vo/Sugestion.vo";
import {DatabaseConnection} from './database';

export class SugestionRepository implements ISugestionRepository {


    

    async listAllProductsByProfileId(profileId:number):Promise<ProductSugestionMergeVO[]> {
        let queryString = `select produto.id,produto.codigo as codProd,produto.nome as prodNome
        from ${ProductEntityName} as produto
        inner join tb_ncm as ncm on produto.ncm like concat(ncm.codigo,'%')
        inner join mtm_produto_compra as prod_comp on produto.id = prod_comp.id_produto
        inner join tb_compra as compra on prod_comp.id_compra = compra.id
        inner join mtm_perfil_compra as perfil_comp on perfil_comp.id_compra = compra.id
        where perfil_comp.id_perfil = ${profileId}`;
        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let search = await connection.query(queryString);
        let result:ProductSugestionMergeVO[] = [];
        if(search[0].length > 0){
            result = search[0] as ProductSugestionMergeVO[];
        }else{
            [] as ProductSugestionMergeVO[]
        }
        return result;
    }
    async listAllNFCEByProfileId(profileId:number):Promise<NfceSugestionMergeVO[]> {
        let queryString = `select compra.data_compra as dataCompra, compra.id
        from ${NfceEntityName} as compra
        inner join mtm_perfil_compra as perfil_comp on perfil_comp.id_compra = compra.id
        where perfil_comp.id_perfil = ${profileId}
        order by compra.data_compra asc;`;
        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let search = await connection.query(queryString);
        let result:NfceSugestionMergeVO[] = [];
        if(search[0].length > 0){
            result = search[0] as NfceSugestionMergeVO[];
        }else{
            [] as NfceSugestionMergeVO[]
        }
        return result;
    }
    async listAllProductNfceByProfileId(profileId:number):Promise<ProductNfceSugestionMergeVO[]> {
        let queryString = `select prod_comp.id_produto as idProduto,prod_comp.id_compra as idCompra
        from mtm_produto_compra as prod_comp 
        inner join tb_compra as compra on prod_comp.id_compra = compra.id
        inner join mtm_perfil_compra as perfil_comp on perfil_comp.id_compra = compra.id
        where perfil_comp.id_perfil = ${profileId}
        order by compra.data_compra desc`;
        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let search = await connection.query(queryString);
        let result:ProductNfceSugestionMergeVO[] = [];
        if(search[0].length > 0){
            result = search[0] as ProductNfceSugestionMergeVO[];
        }else{
            [] as ProductNfceSugestionMergeVO[]
        }
        return result;
    }

    async listNCMsLastRegisterToPredict(profileId: number): Promise<ProductPredictVO[]> {
        console.log("called this shit")
        let queryString = `select generalResult.nome as name, datediff(curdate(),generalResult.dia_compra) as lastBoghtDayDifference, DAY(generalResult.dia_compra) as lastBoughtDay from (
            select 
                first_compra.id,
                first_ncm.nome,
                (select second_compra.data_compra
                    from mtm_produto_compra as second_prod_compra 
                    inner join tb_compra as second_compra on second_prod_compra.id_compra = second_compra.id 
                    inner join tb_produto as second_produto on second_produto.id = second_prod_compra.id_produto
                    inner join tb_ncm as second_ncm on second_ncm.codigo = second_produto.ncm
                    inner join mtm_perfil_compra as second_perfil_comp on second_perfil_comp.id_compra = second_compra.id
                    where second_perfil_comp.id_perfil = ${profileId} and second_ncm.codigo = first_ncm.codigo
                    order by second_compra.data_compra desc LIMIT 1 ) as dia_compra,
                first_prod_comp.valorProduto as valor,
                first_ncm.codigo
            from tb_compra as first_compra 
            -- left join mtm_produto_compra on compra.id = 
            inner join mtm_perfil_compra as first_perfil_comp on first_perfil_comp.id_compra = first_compra.id
            inner join mtm_produto_compra as first_prod_comp on first_compra.id = first_prod_comp.id_compra
            inner join tb_produto as first_produto on first_produto.id = first_prod_comp.id_produto
            inner join tb_ncm as first_ncm on first_ncm.codigo = first_produto.ncm
            where first_perfil_comp.id_perfil = ${profileId}
        GROUP BY first_ncm.codigo) as generalResult;`;
        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let search = await connection.query(queryString);
        let result:ProductPredictVO[] = [];
        if(search[0].length > 0){
            result = search[0] as ProductPredictVO[];
        }else{
            [] as ProductPredictVO[]
        }
        return result;
    }
    async listSugestionByProfile(profileId: number): Promise<SugestionVO[]> {
        let queryString = `SELECT 
		        compra.id,compra.data_compra as dataCompra,
                DAY(compra.data_compra) as diaCompra,
                ncm.codigo as ncm,
		        IF(prod_comp.id_produto IS NULL or ncm.codigo IS NULL, FALSE, TRUE) as comprado 
	    FROM tb_compra compra
	    LEFT JOIN mtm_produto_compra prod_comp ON compra.id = prod_comp.id_compra 
	    LEFT JOIN tb_produto as produto ON prod_comp.id_produto = produto.id 
        left join tb_ncm as ncm on ncm.codigo = produto.ncm
        left join mtm_perfil_compra as perfil_comp on perfil_comp.id_compra = compra.id
        where perfil_comp.id_perfil = ${profileId}
        GROUP BY produto.codigo
    UNION 
    SELECT 
		    compra.id,compra.data_compra as dataCompra,
            DAY(compra.data_compra) as diaCompra,
            ncm.codigo as ncm,
		    IF(prod_comp.id_produto IS NULL or ncm.codigo IS NULL, FALSE, TRUE) as comprado 
	    FROM tb_compra compra
	    RIGHT JOIN mtm_produto_compra prod_comp ON compra.id = prod_comp.id_compra
        RIGHT JOIN tb_produto as produto ON prod_comp.id_produto = produto.id 
        right join tb_ncm as ncm on ncm.codigo = produto.ncm
        left join mtm_perfil_compra as perfil_comp on perfil_comp.id_compra = compra.id
        where perfil_comp.id_perfil = ${profileId}
        GROUP BY produto.codigo`;
        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let search = await connection.query(queryString);
        let result:SugestionVO[] = [];
        if(search[0].length > 0){
            result = search[0] as SugestionVO[];
        }else{
            [] as SugestionVO[]
        }
        return result;
    }
    async listSugestionBySupermarket(marketId: number):Promise<ProductSugestionDto[]> {
        let queryString = `select produto.id,produto.nome,` 
        + `(select count(id_produto) as qtd from mtm_produto_compra where id_produto = produto.id) as qtd_compras `
    + `from tb_produto as produto `
    + `inner join mtm_produto_compra as prod_comp on produto.id = prod_comp.id_produto `
    + `inner join tb_compra as compra on compra.id = prod_comp.id_compra `
    + `inner join tb_estabelecimento as estabelecimento on estabelecimento.id = compra.id_mercado `
    + `where estabelecimento.id = ${marketId} `
    + `order by qtd_compras desc; `;
        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let search = await connection.query(queryString);
        let result:ProductSugestionDto[] = [];
        if(search[0].length > 0){
            search[0].forEach(element => {
                result.push( databaseToProductSugestionDto(element) );
            });
        }else{
            [] as ProductSugestionDto[]
        }
        return result;
    }
    async listSugestionBySupermarketWithDate(marketId: number):Promise<ProductSugestionVo[]> {
        let queryString = `select produto.id,produto.nome,compra.data_compra,` 
        + `(select count(id_produto) as qtd from mtm_produto_compra where id_produto = produto.id) as qtd_compras `
    + `from tb_produto as produto `
    + `inner join mtm_produto_compra as prod_comp on produto.id = prod_comp.id_produto `
    + `inner join tb_compra as compra on compra.id = prod_comp.id_compra `
    + `inner join tb_estabelecimento as estabelecimento on estabelecimento.id = compra.id_mercado `
    + `where estabelecimento.id = ${marketId} `
    + `order by qtd_compras desc; `;
        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let search = await connection.query(queryString);
        DatabaseConnection.getInstance().getPool().releaseConnection(connection);
        let result:ProductSugestionVo[] = [];
        if(search[0].length > 0){
            search[0].forEach(element => {
                result.push( databaseToProductSugestionVo(element) );
            });
        }else{
            [] as ProductSugestionVo[]
        }
        return result;
    }
    
}

