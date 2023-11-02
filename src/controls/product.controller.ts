import express from 'express';
import { ProductAnalisisSearchDto } from '../dto/product/product.analisis.search.to';
import { Product } from '../model/product';
import productService from '../service/product.service';

export class ProductController {
    public async saveProduct(req: express.Request, res: express.Response) {
        let product = req.body as Product;
        product = await productService.checkProductAndSave(product);
        res.status(200).send(product);
    }
    public async listAllProductsByProfileId(req: express.Request, res: express.Response) {
        let profileId = parseInt(req.params.id)
        let result = await productService.listAllProductsByProfileId(profileId);
        res.status(200).send(result);
    }
    public async getProductAnalisis(req: express.Request, res: express.Response) {
        let productAnalisisSearch = req.body as ProductAnalisisSearchDto;
        let result = await productService.getProductAnalisis(productAnalisisSearch);
        res.status(200).send(result);
    }
    public async getAllNCMs(req: express.Request, res: express.Response){
        let result = await productService.listAllNCM();
        res.set('Cache-control', 'public, max-age=3600')
        res.status(200).send(result);
    }

}
export default new ProductController();