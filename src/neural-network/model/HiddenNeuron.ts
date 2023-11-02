import { IActivationFunction } from "../contracts/activation-functions/IActivationFunction";
import { IHiddenNeuron } from "../contracts/model/IHiddenNeuron";
import { Neuron } from "./Neuron";


export class HiddenNeuron extends Neuron implements IHiddenNeuron{ 


    constructor(entriesQuantity:number,learningRate:number,activationFunction:IActivationFunction){
        super(entriesQuantity,learningRate,activationFunction)
    }
    hiddenDelta(weight: number, outputDelta: number) {
        return 1;
        //return super.activationFunction.derivate(super.activationValue) * weight * outputDelta;
    }
   
   

}