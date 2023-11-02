import { Neuron } from "../../model/Neuron";
import { INeuron } from "./INeuron";

export interface IOutputNeuron extends INeuron{
    outputDelta(error:number):number;
 }