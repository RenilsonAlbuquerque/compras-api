import express from 'express';
import { SaveNfceDto } from '../dto/nfce/save.nfce.dto';
import nfceService from '../service/nfce.service';

class NfceController {

    public async getNfceDetailsById(req: express.Request, res: express.Response){
        let nfceId = parseInt(req.params.id);
        const result = await nfceService.getNfceDetail(nfceId);
        res.status(200).send(result);
    }
    public async getDetailsAndSave(req: express.Request, res: express.Response) {
        try{
            const result = await nfceService.describeDetaislsAndSave(req.body as SaveNfceDto);
            if(result){
                res.send(result);    
            }else{
                res.status(409)
                res.send("A NFCe já está cadastrada");
            }
        }catch(e){
            res.status(444)
            res.send(e);
        }
    }
    public async getDetails(req: express.Request, res: express.Response) {
        const result = await nfceService.getDetails(req.body.link);
        res.send(result);
    }
    /*
    public async saveNfce(req: express.Request, res: express.Response){
        const result = await nfceService.saveNFce(req.body);
        res.send(result);
    }*/
}
export default new NfceController();