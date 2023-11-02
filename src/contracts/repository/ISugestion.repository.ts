import { NfceSugestionMergeVO } from "../../dto/sugestion/merge/nfce.sugestion.merge.vo";
import { ProductSugestionMergeVO } from "../../dto/sugestion/merge/poduct.sugestion.merge.vo";
import { ProductNfceSugestionMergeVO } from "../../dto/sugestion/merge/product-nfce.sugestion.merge.vo";
import { ProductPredictVO } from "../../dto/sugestion/product.predict.vo";
import { ProductShoppingListDTO } from "../../dto/sugestion/product.shopping.list";
import { ProductSugestionDto } from "../../dto/sugestion/product.sugestion.dto";
import { ProductEntry } from "../../neural-network/ProductEntry";
import { SugestionVO } from "../../vo/Sugestion.vo";


export interface ISugestionRepository {

    listSugestionBySupermarket(marketId:number):Promise<ProductSugestionDto[]>;
    listSugestionByProfile(profileId: number): Promise<SugestionVO[]>;
    listNCMsLastRegisterToPredict(profileId:number): Promise<ProductPredictVO[]>;

    //=======================================================//
    listAllProductsByProfileId(profileId:number):Promise<ProductSugestionMergeVO[]>;
    listAllNFCEByProfileId(profileId:number):Promise<NfceSugestionMergeVO[]>;
    listAllProductNfceByProfileId(profileId:number):Promise<ProductNfceSugestionMergeVO[]>;



}