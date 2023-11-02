import { AnalisisBuy } from "./analisis.buy";
import { ChartList } from "./chart.list";
import { ChartTotals } from "./chart.totals";

export interface AnalisisChart{
    total:ChartTotals,
    chartList:ChartList[],
    buyList:AnalisisBuy[]
}