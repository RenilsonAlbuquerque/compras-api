import express from 'express';
import { UserLoginDto } from '../dto/user.login.dto';
import { loginDtoToEntity } from '../mappers/user.mapper';
import sugestionService from '../service/sugestion.service';

export class SugestionController {
    public async takeSugestionByMarketId(req: express.Request, res: express.Response) {
        let marketId = parseInt(req.params.id);
        let result  = await sugestionService.listSugestionBySupermarket(marketId);
        res.status(200).send(result);
    }

}
export default new SugestionController();