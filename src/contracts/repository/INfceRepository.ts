import { NfceOverviewDto } from "../../dto/nfce/nfce.overview.dto";
import { Nfce } from "../../model/nfce";
import { ICrud } from "./ICrud";

export interface INfceRepository extends ICrud<Nfce,number> {
    

    searchByNumeroAndSerie(numero:number, serie:number):Promise<Nfce>;
    getNfceDetailById(nfceId:number):Promise<NfceOverviewDto>;


}