import { SigmoidActivationFunction } from "../activation-functions/SigmoidActivationFunction";
import { SingleNeuronNetwork } from "../network/SingleNeuronNetwork";
import { Perceptron } from "../Perceptron";
import { ProductEntry } from "../ProductEntry";

function buildPerceptron(){
    let activationFunction = new SigmoidActivationFunction();
    //let activationFunction = new StepActivationFunction();
    //let neuralNet = new DeepNetwork(2,[4],1,0.01,activationFunction);
    let neuralNet = new SingleNeuronNetwork(2,0.01,activationFunction);
    return new Perceptron<ProductEntry>(neuralNet);
}
export {buildPerceptron}