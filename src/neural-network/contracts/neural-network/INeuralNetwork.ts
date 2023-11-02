
export interface INeuralNetwork{

    predict(data:number[]):number;
    step(dataEntries:number[],expectedOutput:number):void;
}