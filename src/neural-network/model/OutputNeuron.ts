import { IActivationFunction } from "../contracts/activation-functions/IActivationFunction";
import { INeuron } from "../contracts/model/INeuron";
import { IOutputNeuron } from "../contracts/model/IOutputNeuron";
import { Neuron } from "./Neuron";

export class OutputNeuron extends Neuron implements IOutputNeuron{


    constructor(entriesQuantity:number,learningRate:number,activationFunction:IActivationFunction){
        super(entriesQuantity,learningRate,activationFunction)
    }
   
   
    outputDelta(error:number): number {
        return 1;
        //return error - super.activationFunction.derivate(this.activationValue)
    }
   

}