import { IPlaceRepository } from "../contracts/repository/IPlace.repository";
import { IPlaceService } from "../contracts/service/IPlace.service";
import { Place } from "../model/place";
import { PlaceRepository } from "../repository/place.repository";

class PlaceService implements IPlaceService {

    private placeRepository:IPlaceRepository;

    constructor() {
        this.placeRepository = new PlaceRepository();
    }
    async checkPlaceAndSave(place: Place){
        let search = await this.placeRepository.searchByCNPJ(place.cnpj.trim()); 
        if(search.id < 0){
            place = await this.placeRepository.save(place);
        }else{
            place.id = search.id
        }
        return place;
    }
    async listAllPlaces(){
        return await this.placeRepository.listAll();
    }
   
}

export default new PlaceService();