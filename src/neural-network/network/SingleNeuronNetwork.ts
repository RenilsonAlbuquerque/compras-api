import { IActivationFunction } from "../contracts/activation-functions/IActivationFunction";
import { INeuralNetwork } from "../contracts/neural-network/INeuralNetwork";
import { IHiddenNeuron } from "../contracts/model/IHiddenNeuron";
import { INeuron } from "../contracts/model/INeuron";
import { IOutputNeuron } from "../contracts/model/IOutputNeuron";
import { HiddenNeuron } from "../model/HiddenNeuron";
import { Neuron } from "../model/Neuron";
import { OutputNeuron } from "../model/OutputNeuron";
import { SingleNeuron } from "../model/SingleNeuron";

export class SingleNeuronNetwork implements INeuralNetwork{

    private entriesQuantity:number;
    private classificationNeuron: IOutputNeuron;
    private learningRate: number;
    private activationFunction : IActivationFunction;

    constructor(entriesQuantity:number,learningRate:number,activationFunction:IActivationFunction){
        this.learningRate = learningRate;
        this.entriesQuantity = entriesQuantity;
        this.activationFunction = activationFunction;
        this.initialize(entriesQuantity,learningRate,activationFunction);
    }
    
    private initialize(entriesQuantity:number,learningRate:number,activationFunction:IActivationFunction):void{
        this.classificationNeuron = new SingleNeuron(entriesQuantity,learningRate,activationFunction);
    }


    public predict(data:number[]) {
        return this.performClassification(data);
    }
   
    public step(dataEntries:number[],expectedOutput:number):void{
        let output = this.performClassification(dataEntries);
        this.updateWeights(output,expectedOutput);
    }

    public updateWeights(output:number,expectedResult:number){
        let error = this.loss(expectedResult,output);
        
        this.classificationNeuron.updateWeights(error);
        //console.log(this.classificationNeuron.getWeights());
        //console.log("==================================================")
    }
    private performClassification(data:number[]){
        //console.log(this.classificationNeuron.calculateActivationFunction(data))
        return this.classificationNeuron.calculateActivationFunction(data);
    }
   
    private loss(expectedResult:number,output:number):number{
        return expectedResult - output;
    }

}