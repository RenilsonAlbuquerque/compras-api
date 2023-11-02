import { INfceRepository } from "../../contracts/repository/INfceRepository";
import { ISugestionRepository } from "../../contracts/repository/ISugestion.repository";
import { ProductShoppingListDTO } from "../../dto/sugestion/product.shopping.list";
import { calculateDaysDifferenceDate } from "../../helpers/custom.date.helper";
import { IPredictionEntry } from "../../neural-network/contracts/algorithms/IPerceptron";
import { ProductEntry } from "../../neural-network/ProductEntry";
import { buildPerceptron } from "../../neural-network/utils/Perceptron.utils";
import { SugestionRepository } from "../../repository/sugestion.repository";
import { ICartSugestionStrategy } from "./Icart.sugestion.strategy";

export class IACartSugestionStrategy implements ICartSugestionStrategy {

    private sugestionRepository:ISugestionRepository;

    private predictionModel: IPredictionEntry<ProductEntry>;
    

    constructor() {
       
        this.sugestionRepository = new SugestionRepository();
        //this.predictionModel = new Brain<ProductEntry>();
        this.predictionModel = buildPerceptron();
    }
    async execute(profileId:number): Promise<ProductShoppingListDTO[]> {
        await this.trainModel(profileId);
        return await this.predictProductsByProfileId(profileId);
    }
    private async trainModel(profileId:number){
        let products = await this.createProductTranningDataSetWithMerge(profileId);
        // //==============Brain=====================
        this.predictionModel.train(products,20);

        //==============HomeMade Perceptron===============
        // let activationFunction = new StepActivationFunction();
        // let neuralNet = new SingleNeuronNetwork(2,0.01,activationFunction);
        // this.predictionModel = new Perceptron<ProductEntry>(neuralNet);
        // this.predictionModel.train(products,10);
    }
    private async createProductTranningDataSetWithMerge(profileId:number):Promise<ProductEntry[]>{

        let result = [] as ProductEntry[];

        let productsVO = await this.sugestionRepository.listAllProductsByProfileId(profileId);
        let nfcesVO = await this.sugestionRepository.listAllNFCEByProfileId(profileId);
        let productNfceVO = await this.sugestionRepository.listAllProductNfceByProfileId(profileId);
        
        //console.log(productsVO);
        //console.log(nfcesVO);
        //console.log(productNfceVO);

        let partialArray = [];
        let foundRegister = false;
        //let previousDate = null;

        for(let prodIndex = 0;prodIndex < productsVO.length; prodIndex++){
            for(let nfceIndex = 0;nfceIndex < nfcesVO.length; nfceIndex++){
                
                for(let prodNfceIndex = 0;prodNfceIndex < productNfceVO.length; prodNfceIndex++){
                    if(productNfceVO[prodNfceIndex].idProduto == productsVO[prodIndex].id &&
                        productNfceVO[prodNfceIndex].idCompra == nfcesVO[nfceIndex].id){
                            foundRegister = true;
                        }
                }
                if(foundRegister){
                    result.push(
                        {
                            daysPast:(nfceIndex > 0) ? calculateDaysDifferenceDate(nfcesVO[nfceIndex].dataCompra,nfcesVO[nfceIndex-1].dataCompra): 1000,
                            lastBoghtDay:nfcesVO[nfceIndex].dataCompra.getUTCDate(),
                            result:1
                        })          
                }else{
                    result.push({
                        daysPast:(nfceIndex > 0) ? calculateDaysDifferenceDate(nfcesVO[nfceIndex].dataCompra,nfcesVO[nfceIndex-1].dataCompra): 1000,
                        lastBoghtDay:nfcesVO[nfceIndex].dataCompra.getUTCDate(),
                        result:0
                    })  
                }
                foundRegister = false;   
            }   
        }
        console.log(result);
        //result.push({daysPast:15,lastBoghtDay:27,result:1});
        
        return result;
    }
    private async predictProductsByProfileId(profileId:number):Promise<ProductShoppingListDTO[]> {
        let allProductsBought = await this.sugestionRepository.listNCMsLastRegisterToPredict(profileId);
        
        //allProductsBought.push({lastBoghtDayDifference:1,currentDay:2,name:"bala de troco"} as ProductPredictVO)
        let result = [] as ProductShoppingListDTO[];

        allProductsBought.forEach(productToPredict => {
            let predResult = this.predictionModel.predict({
                daysPast:productToPredict.lastBoghtDayDifference,
                lastBoghtDay: productToPredict.lastBoughtDay,
                result: 0
            }as ProductEntry);
            console.log(productToPredict.name + " " + predResult);
            if(predResult > 0.15){
                result.push({
                    id:0,
                    name:productToPredict.name,
                    codigo:"",
                    ncm:"",
                    previousPrice:2,
                    quantity:3,
                    bought:false,
                });
            }
            //console.log(productToPredict.name + " : " + Object.values(predResult));
        });
        //console.log(result)
        return result;
    }
}