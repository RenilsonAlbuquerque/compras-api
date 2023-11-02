import { IProfileRepository } from "../contracts/repository/IProfileRepository";
import { IUserProfileRepository } from "../contracts/repository/IUserProfileRepository";
import { IProfileService } from "../contracts/service/IProfileService";
import { ProfileCreateDto } from "../dto/profile/profile.create";
import { ProfileDetailDto } from "../dto/profile/profile.detail";
import { ProfileRepository } from "../repository/profile.repository";
import { UserProfileRepository } from "../repository/user.profile.repository";


class ProfileService implements IProfileService {

    private profileRepository:IProfileRepository;
    private userProfileRepository: IUserProfileRepository;
    

    constructor() {
        this.profileRepository = new ProfileRepository();
        this.userProfileRepository = new UserProfileRepository();
    }
    async saveNewProfile(profile: ProfileCreateDto):Promise<boolean> {
        let profileSaved =  await this.profileRepository.createProfile(profile);
        profile.people.forEach(async (personId) => {
            await this.userProfileRepository.saveUserInProfile(profileSaved.id,personId)
        })
        return true;
    }
    async listProfilesOfUser(userId: number):Promise<ProfileDetailDto[]> {
        return await this.profileRepository.listProfilesByUserId(userId);
    }
   
}

export default new ProfileService();