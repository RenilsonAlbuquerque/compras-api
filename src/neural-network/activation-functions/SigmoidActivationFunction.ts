import { IActivationFunction } from "../contracts/activation-functions/IActivationFunction";



export class SigmoidActivationFunction implements IActivationFunction{
    activate(value: number): number {
        return 1/(1 + Math.pow(2.71828,-value) ) 
        
    }
    derivate(value):number{
        return value * (1-value);
    }

    
}