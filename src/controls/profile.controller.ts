import express from 'express';
import { ProfileCreateDto } from '../dto/profile/profile.create';
import profileService from '../service/profile.service';

export class ProfileController {
    public async saveNewProfile(req: express.Request, res: express.Response) {
        let profileCreateDto = req.body as ProfileCreateDto;
        let result = await profileService.saveNewProfile(profileCreateDto);
        res.status(200).send(result);
    }
    public async listProfilesByUserId(req: express.Request, res: express.Response) {
        let userId = parseInt(req.params.id)
        //console.log(userId)
        try{
            let result = await profileService.listProfilesOfUser(userId);
            res.status(200).send(result);
        }catch(e){
            res.status(4230).send(e);
        }
        
    }

}
export default new ProfileController();