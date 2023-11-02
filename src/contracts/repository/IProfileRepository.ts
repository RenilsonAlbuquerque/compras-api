import { ProfileCreateDto } from "../../dto/profile/profile.create";
import { ProfileDetailDto } from "../../dto/profile/profile.detail";
import { Profile } from "../../model/profile";
import { ICrud } from "./ICrud";

export interface IProfileRepository extends ICrud<Profile,number> {

    createProfile(placeCreate:ProfileCreateDto):Promise<ProfileCreateDto>;
    listProfilesByUserId(userId:number):Promise<ProfileDetailDto[]>;
  //searchByIds(productid:number,nfce:number):Promise<ProductNFCE>;

}