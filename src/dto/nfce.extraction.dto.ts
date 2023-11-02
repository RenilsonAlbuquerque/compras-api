import { Nfce } from "../model/nfce";
import { Place } from "../model/place";

export interface NfceExtractionDto{
    place:Place,
    nfce:Nfce,
    produtos:any[]
}