import { AnalisisBuy } from "../../dto/chart/analisis.buy";
import { ChartList } from "../../dto/chart/chart.list";
import { ChartSearchDto } from "../../dto/chart/chart.search.dto";
import { ChartTotals } from "../../dto/chart/chart.totals";

export interface IChartRepository {

    listAllChartByMonthAndProfile(chartSearch:ChartSearchDto):Promise<ChartList[]>;
    getTotalsByMonthAndProfile(chartSearch:ChartSearchDto):Promise<ChartTotals>;
    getBuyListByMonthAndProfile(chartSearch:ChartSearchDto):Promise<AnalisisBuy[]>;

}