import { ProductChartTimelineDto } from "./product.chart.timeline.dto";

export interface ProductAnalisisDto{
    lastBuyValue:number,
    unityMeanValue:number,
    lastBuyDifference:number,
    lastBuyTaxationDifference:number,
    productTimeLine:ProductChartTimelineDto[]
}