
export interface IPredictionEntry<T>{

    predict(data:T):number;
    train(dataSet:T[],epochs:number):void;
}