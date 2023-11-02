import { NfceOverviewDto } from "../../dto/nfce/nfce.overview.dto";
import { SaveNfceDto } from "../../dto/nfce/save.nfce.dto";

export interface INfceService {

    describeDetaislsAndSave(saveDto:SaveNfceDto):Promise<Boolean>;
    getDetails(link:string);
    getNfceDetail(nfceId:number):Promise<NfceOverviewDto>;

}