export interface INeuron{
    calculateActivationFunction(entries:number[]):number;
    getActivationValue():number;
    updateWeights(delta:number);
    getWeights();
}