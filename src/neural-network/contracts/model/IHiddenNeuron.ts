import { INeuron } from "./INeuron";

export interface IHiddenNeuron extends INeuron{
   hiddenDelta(sigmoid:number,weight:number,outputDelta:number):number;
}