import { IPredictionEntry } from "../contracts/algorithms/IPerceptron";
//import * as brain from 'brain.js';

export class Brain<T> 
//implements IPredictionEntry<T>
{

 
    // private neuralNetwork: brain.NeuralNetwork;

    // constructor(){
    //     this.neuralNetwork = new brain.NeuralNetwork();
    // }
   
    // public predict(data: T):number {
      
    //     return this.neuralNetwork.run(this.mapSingleEntryToArray(data));
    // }
   
    // public train(dataSet:T[],epochs:number):void{
    //     let trainedEpochs = 0;
    //     let entriesArray = this.mapEntriesObjectToArray(dataSet);
       
    //     this.neuralNetwork.train(entriesArray);

        

    //     // while(trainedEpochs < epochs){
    //     //     for (let data = 0; data < dataSet.length ; data++) {
    //     //         this.neuralNetwork.step(
    //     //             this.mapTrainingEntryToParametersArray(entriesArray[data]),
    //     //             this.getResultFromDataArray(entriesArray[data]));
    //     //         trainedEpochs +=1;
    //     //     }
    //     // }

    // }
  

    // //========================Map methods========================================
    // private mapEntriesObjectToArray(dataSet:T[]):any[]{
    //     let result = []
    //     dataSet.forEach(data => result.push(
    //         {
    //             input:Object.values(data).slice(0,Object.values(data).length -1), 
    //             output:[Object.values(data)[Object.values(data).length -1]]
    //         }));  
    //     return result;
    // }
    // private mapTrainingEntryToParametersArray(entryArray){
    //     return entryArray.slice(0,entryArray.length -1)
    // }
    // private mapSingleEntryToArray(data:T){
    //     let wholeObject = Object.values(data);
    //     return wholeObject.splice(0, wholeObject.length -1);
    // }
    // private getResultFromDataArray(dataArray:number[]){
    //     return dataArray[dataArray.length -1]
    // }

}