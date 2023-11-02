import { Profile } from "../../model/profile";
import {ProfileCreateDto} from '../../dto/profile/profile.create'
import { ProfileDetailDto } from "../../dto/profile/profile.detail";


export interface IProfileService {

    saveNewProfile(profile:ProfileCreateDto);
    listProfilesOfUser(userId: number):Promise<ProfileDetailDto[]>
}