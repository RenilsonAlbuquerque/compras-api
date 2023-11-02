import { IChartRepository } from "../contracts/repository/IChartRepository";
import { IChartService } from "../contracts/service/IChartService";
import { AnalisisChart } from "../dto/chart/analisis.chart";
import { ChartSearchDto } from "../dto/chart/chart.search.dto";
import { ChartRepository } from "../repository/chart.repository";

class ChartService implements IChartService {

    private chartRepository:IChartRepository;
    

    constructor() {
        this.chartRepository = new ChartRepository();
    }
    async getDetailsByMonth(chartSearch:ChartSearchDto): Promise<AnalisisChart> {
        let chartList = await this.chartRepository.listAllChartByMonthAndProfile(chartSearch);
        let totals = await this.chartRepository.getTotalsByMonthAndProfile(chartSearch);
        let buyList = await this.chartRepository.getBuyListByMonthAndProfile(chartSearch);
        let result = {
            chartList:chartList,
            total: totals,
            buyList:buyList.reverse()
        } as AnalisisChart
        return result;
    }
   
}

export default new ChartService();