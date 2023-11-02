import express from 'express';
import { ChartSearchDto } from '../dto/chart/chart.search.dto';
import chartService from '../service/chart.service';

export class ChartController {
    public async listBuys(req: express.Request, res: express.Response) {
        let requestDto = req.body as ChartSearchDto;
        let result = await chartService.getDetailsByMonth(requestDto);
        res.status(200).send(result);
    }

}
export default new ChartController();