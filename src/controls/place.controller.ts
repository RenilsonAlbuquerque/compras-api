import express from 'express';
import placeService from '../service/place.service';

export class PlaceController {
    public async listAllPlaces(req: express.Request, res: express.Response) {
       
        let result = await placeService.listAllPlaces();
        res.status(200).send(result);
    }

}
export default new PlaceController();