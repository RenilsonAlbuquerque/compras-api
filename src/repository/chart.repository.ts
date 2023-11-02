import { IChartRepository } from "../contracts/repository/IChartRepository";
import { AnalisisBuy } from "../dto/chart/analisis.buy";
import { ChartList } from "../dto/chart/chart.list";
import { ChartSearchDto } from "../dto/chart/chart.search.dto";
import { ChartTotals } from "../dto/chart/chart.totals";
import { databaseToChartListDto } from "../mappers/chart.mapper";
import { NfceEntityName } from "../model/nfce";
import { PlaceEntityName } from "../model/place";
import { ProfileNfceRelationName } from "../model/profile.nfce";
import {DatabaseConnection} from './database';

export class ChartRepository implements IChartRepository  {


    constructor() {
        //this.connection = DatabaseConnection.getInstance().getConnection;
    }
    async  listAllChartByMonthAndProfile(chartSearch:ChartSearchDto):Promise<ChartList[]> {
        let queryString = `select comp.data_compra,comp.valor_nf  from ${NfceEntityName} as comp `
        + `inner join ${ProfileNfceRelationName} as profComp on comp.id = profComp.id_compra `
        + `where month(comp.data_compra) = ${chartSearch.month} and year(comp.data_compra) = ${chartSearch.year} and profComp.id_perfil = ${chartSearch.profileId} order by comp.data_compra asc;`;
        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let search = await connection.query(queryString);
        let result:ChartList[] = [];
        if(search[0].length > 0){
            search[0].forEach(element => {
                result.push( databaseToChartListDto(element) );
            });
        }else{
            [] as ChartList[]
        }
        return result;
    }
    async getTotalsByMonthAndProfile(chartSearch:ChartSearchDto):Promise<ChartTotals> {
        let queryString = `select sum(comp.valor_nf) as total, sum(comp.valor_icms) as taxation_icms, sum(comp.valor_total) as total_product from ${NfceEntityName} as comp ` 
        + `inner join ${ProfileNfceRelationName} as profComp on comp.id = profComp.id_compra `
        + `where month(comp.data_compra) = ${chartSearch.month} and year(comp.data_compra) = ${chartSearch.year} and profComp.id_perfil = ${chartSearch.profileId} order by comp.data_compra asc;`;
        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let search = await connection.query(queryString);
        let result:ChartTotals = {} as ChartTotals;
        if(search[0].length > 0){
            result = search[0][0] as ChartTotals;
        }
        else{
            result = {
                total:0,
                total_product:0,
                taxation_icms:0
            } as ChartTotals
        }
        return result;
    }

    async getBuyListByMonthAndProfile(chartSearch:ChartSearchDto):Promise<AnalisisBuy[]> {
        let queryString = `select comp.id as idCompra,DATE_FORMAT(comp.data_compra,'%d/%m/%Y') as data,comp.valor_nf as total,comp.valor_icms as icms,estab.nome as mercado `
        + `from ${NfceEntityName} as comp inner join ${PlaceEntityName} as estab on comp.id_mercado = estab.id `
        + `inner join ${ProfileNfceRelationName} as profComp on comp.id = profComp.id_compra ` 
        + `where month(comp.data_compra) = ${chartSearch.month} and year(comp.data_compra) = ${chartSearch.year} and profComp.id_perfil = ${chartSearch.profileId} order by comp.data_compra asc;`;
        let connection = await DatabaseConnection.getInstance().getConnection(); 
        let search = await connection.query(queryString);
        let result:AnalisisBuy[] = [] as AnalisisBuy[];
        if(search[0].length > 0){
            search[0].forEach(element => {
                result.push( element);
            });
        }
        return result;
    }
    
}

