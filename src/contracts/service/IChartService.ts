import { AnalisisChart } from "../../dto/chart/analisis.chart";
import { ChartSearchDto } from "../../dto/chart/chart.search.dto";

export interface IChartService{
    getDetailsByMonth(chartSearch:ChartSearchDto): Promise<AnalisisChart> 
}