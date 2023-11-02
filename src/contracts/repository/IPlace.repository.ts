import { PlaceDto } from "../../dto/place/place.dto";
import { Place } from "../../model/place";
import { ICrud } from "./ICrud";

export interface IPlaceRepository extends ICrud<Place,number> {

  searchByCNPJ(cnpj:string):Promise<Place>;
  listAll():Promise<PlaceDto[]>;

}