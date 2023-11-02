import { IActivationFunction } from "../contracts/activation-functions/IActivationFunction";

export class StepActivationFunction implements IActivationFunction{
    activate(value: number): number {
        if(value > 0) return 1; else return 0;
    }
    derivate(value):number{
        return value;
    }


    
}