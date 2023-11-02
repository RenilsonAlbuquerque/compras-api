import { IActivationFunction } from "../contracts/activation-functions/IActivationFunction";
import { INeuron } from "../contracts/model/INeuron";

export class Neuron implements INeuron{

    private entriesQuantity: number;
    private weights: number[]; 
    private lastEntries: number[];
    private learningRate:number;
    protected activationValue:number;
    protected activationFunction: IActivationFunction;
    private delta:number;

    constructor(entriesQuantity:number,learningRate:number,activationFunction:IActivationFunction){
        this.entriesQuantity = entriesQuantity;
        this.learningRate = learningRate;
        this.activationValue = 0;
        this.activationFunction = activationFunction;
        this.initializeWeights(this.entriesQuantity);
    }
    
    private initializeWeights(entriesQuantity:number):void{
        this.weights = [];
        this.lastEntries = [];
        for (let i = 0; i < entriesQuantity; i++) {
            //this.weights.push(Math.random());
            this.weights.push(0.5);
            this.lastEntries.push(0);
        }
    }
    public calculateActivationFunction(entries:number[]):number{
        let sumatory = 0;
        this.lastEntries = {...entries};

        for (let entry = 0; entry < entries.length ; entry++) {
            sumatory += entries[entry] * this.weights[entry];
        }
        
        this.activationValue = this.activationFunction.activate(sumatory); 
        return this.activationValue;
    }
    outputDelta(error:number): number {
        return error * this.activationFunction.derivate(this.activationValue);
    }
    public updateWeights(delta:number):void{
        let mommentum = 1;
        for (let weight = 0; weight < this.weights.length ; weight++) {
            this.weights[weight] = (this.weights[weight] * mommentum) + (this.lastEntries[weight] * delta *this.learningRate );
        }
    }
   
    public getWeights(){
        return this.weights;
    }
    public getActivationValue():number{
        return this.activationValue
    }

}