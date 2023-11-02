import { UserProfile } from "../../model/user.profile";
import { ICrud } from "./ICrud";

export interface IUserProfileRepository extends ICrud<UserProfile,number> {

  saveUserInProfile(profileId:number,userId:number):Promise<boolean>;

}