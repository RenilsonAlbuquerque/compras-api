import { PlaceDto } from "../../dto/place/place.dto";
import { Place } from "../../model/place";

export interface IPlaceService {

    checkPlaceAndSave(product:Place);
    listAllPlaces():Promise<PlaceDto[]>

}