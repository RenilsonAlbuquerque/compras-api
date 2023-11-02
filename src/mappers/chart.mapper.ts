import { ChartList } from "../dto/chart/chart.list";

export function databaseToChartListDto(databaseResult:any):ChartList{
    return {
        dateTime:databaseResult.data_compra,
        amount: databaseResult.valor_nf,
    } as ChartList;
}