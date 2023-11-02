import express from 'express';
import { ProductShoppingListDTO } from '../dto/sugestion/product.shopping.list';
import cartService from '../service/cart.service';
import sugestionService from '../service/sugestion.service';


export class CartController {
    public async listCartByProfileId(req: express.Request, res: express.Response) {
        let profileId = parseInt(req.params.id);
        let result = await cartService.listCartByProfileId(profileId);
        res.status(200).send(result);
    }
    public async saveCartByProfile(req: express.Request, res: express.Response) {
        let profileId = parseInt(req.params.id);
        let requestDto = req.body as ProductShoppingListDTO[];
        let result = await cartService.saveCart(requestDto,profileId);
        res.status(200).send(result);
    }
    public async clearCartByProfile(req: express.Request, res: express.Response) {
        let profileId = parseInt(req.params.id);
        let result = await cartService.ClearCartByProfileId(profileId);
        res.status(200).send(result);
    }
    public async listCartPredictionByProfileId(req: express.Request, res: express.Response) {
        let profileId = parseInt(req.params.id);
        let result = await sugestionService.listCartSugestionByProfile(profileId);
        res.status(200).send(result);
    }


}
export default new CartController();