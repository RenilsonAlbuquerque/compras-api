import { INeuralNetwork } from "./contracts/neural-network/INeuralNetwork";
import { IPredictionEntry } from "./contracts/algorithms/IPerceptron";


export class Perceptron<T> implements IPredictionEntry<T>{

 
    private neuralNetwork: INeuralNetwork;

    constructor(neuralNetwork:INeuralNetwork){

        this.neuralNetwork = neuralNetwork;
       
    }
   
    public predict(data: T):number {
        //console.log(this.mapSingleEntryToArray(data))
        return this.neuralNetwork.predict(this.mapSingleEntryToArray(data));
    }
   
    public train(dataSet:T[],epochs:number):void{
        let trainedEpochs = 0;
        let entriesArray = this.mapEntriesObjectToArray(dataSet);

        
        while(trainedEpochs < epochs){
            for (let data = 0; data < entriesArray.length ; data++) {
                
                this.neuralNetwork.step(
                    this.mapTrainingEntryToParametersArray(entriesArray[data]),
                    this.getResultFromDataArray(entriesArray[data]));
                trainedEpochs +=1;
            }
        }

    }
  

    //========================Map methods========================================
    private mapEntriesObjectToArray(dataSet:T[]):number[][]{
        let result = []
        dataSet.forEach(data => result.push(Object.values(data)));
        return result;
    }
    private mapTrainingEntryToParametersArray(entryArray){
        return entryArray.slice(0,entryArray.length -1)
    }
    private mapSingleEntryToArray(data:T){
        let wholeObject = Object.values(data);
        return wholeObject.splice(0, wholeObject.length -1);
    }
    private getResultFromDataArray(dataArray:number[]){
        return dataArray[dataArray.length -1]
    }

}