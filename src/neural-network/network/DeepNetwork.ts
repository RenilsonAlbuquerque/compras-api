import { IActivationFunction } from "../contracts/activation-functions/IActivationFunction";
import { INeuralNetwork } from "../contracts/neural-network/INeuralNetwork";
import { IHiddenNeuron } from "../contracts/model/IHiddenNeuron";
import { INeuron } from "../contracts/model/INeuron";
import { IOutputNeuron } from "../contracts/model/IOutputNeuron";
import { HiddenNeuron } from "../model/HiddenNeuron";
import { Neuron } from "../model/Neuron";
import { OutputNeuron } from "../model/OutputNeuron";

export class DeepNetwork implements INeuralNetwork{

    private entriesQuantity:number;
    private outputsQuantity:number;
    private neurons: IHiddenNeuron[];
    private classificationNeuron: IOutputNeuron;
    private learningRate: number;
    private activationFunction : IActivationFunction;

    constructor(entriesQuantity:number,architecture:number[],outputs:number,learningRate:number,activationFunction:IActivationFunction){
        this.learningRate = learningRate;
        this.entriesQuantity = entriesQuantity;
        this.outputsQuantity = outputs;
        this.activationFunction = activationFunction;
        this.initialize(entriesQuantity,architecture,outputs);
    }
    
    private initialize(entriesQuantity:number,architecture:number[],outputsQuantity:number):void{
        this.neurons = [];
        for (let column = 0; column < architecture[0] ; column++) {
            this.neurons.push(new HiddenNeuron(entriesQuantity,this.learningRate,this.activationFunction));
        }
        this.classificationNeuron = new OutputNeuron(architecture[0],this.learningRate,this.activationFunction);
    }


    public predict(data:number[]) {
        this.calculateActivationFunctionOnDeepLayers(data,this.neurons);
        return this.performClassification(this.neurons);
    }
   
    public step(dataEntries:number[],expectedOutput:number):void{
        this.calculateActivationFunctionOnDeepLayers(dataEntries,this.neurons);
        let output = this.performClassification(this.neurons);
        this.updateWeights(output,expectedOutput);
    }

    public updateWeights(output:number,expectedResult:number){
        let error = this.loss(expectedResult,output);
        
        let outputDelta = this.classificationNeuron.outputDelta(error);

        this.neurons.forEach(neuron => {
            neuron.updateWeights(outputDelta);
            console.log(neuron.getWeights())
        })
        this.classificationNeuron.updateWeights(outputDelta);
        console.log(this.classificationNeuron.getWeights());
        console.log("==================================================")
    }

    private calculateActivationFunctionOnDeepLayers(dataEntries:number[],neurons:INeuron[]){
        let result = 0;
        for (let neuronRow = 0; neuronRow < neurons.length ; neuronRow++) {
            neurons[neuronRow].calculateActivationFunction(dataEntries);
        }
    }
    private performClassification(neurons:IHiddenNeuron[]){
        let values = neurons.map(n => n.getActivationValue());

        return this.classificationNeuron.calculateActivationFunction(values);
    }
   
    private loss(expectedResult:number,output:number):number{
        return expectedResult - output;
    }

}