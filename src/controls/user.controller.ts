import express from 'express';
import { UserLoginDto } from '../dto/user.login.dto';
import userService from '../service/user.service';

export class UserController {
    public async handleLogin(req: express.Request, res: express.Response) {
        
        let user = req.body as UserLoginDto;
        user = await userService.checkUserAndSave(user);
        res.status(200).send(user);
    }
    public async listAllUsersDto(req: express.Request, res: express.Response) {
        
        let result = await userService.listAllUsersDto();
        res.status(200).send(result);
    }

}
export default new UserController();