import { SigmoidActivationFunction } from "./neural-network/activation-functions/SigmoidActivationFunction";
import { StepActivationFunction } from "./neural-network/activation-functions/StepActivationFunction";
import { DeepNetwork } from "./neural-network/network/DeepNetwork";
import { SingleNeuronNetwork } from "./neural-network/network/SingleNeuronNetwork";
import { Perceptron } from "./neural-network/Perceptron";
import { ProductEntry } from "./neural-network/ProductEntry";
import sugestionService from "./service/sugestion.service";

async function runFIle(){

    // let dataSet = [
    //     {daysPast:12,boughtLastTime:1,result:1},
    //     {daysPast:5,boughtLastTime:0,result:1},
    //     {daysPast:3,boughtLastTime:1,result:1},
    //     {daysPast:10,boughtLastTime:0,result:0},
    //     {daysPast:10,boughtLastTime:1,result:1},
    //     {daysPast:11,boughtLastTime:1,result:1},
    //     {daysPast:6,boughtLastTime:1,result:1},
    //     {daysPast:9,boughtLastTime:1,result:1},
    //     {daysPast:10,boughtLastTime:0,result:0},
    //     {daysPast:15,boughtLastTime:1,result:1},
    //     {daysPast:15,boughtLastTime:0,result:0},
    //     {daysPast:15,boughtLastTime:1,result:1}
    // ];
    // let activationFunction = new SigmoidActivationFunction();
    // //let activationFunction = new StepActivationFunction();
    // //let neuralNet = new DeepNetwork(2,[4],1,0.01,activationFunction);
    // let neuralNet = new SingleNeuronNetwork(2,0.01,activationFunction);
    // let perceptron = new Perceptron<ProductEntry>(neuralNet);
    // perceptron.train(dataSet,35000);

    // let predictResult = perceptron.predict({daysPast:15,boughtLastTime:1,result:1})
    // console.log("Resultado da previsão: " + predictResult)
    let result = await sugestionService.listCartSugestionByProfile(4);
    //console.log(result);

    // let dataSet = [
    //     {input:[12,1],output:[1]},
    //     {input:[5,0],output:[0]},
    //     {input:[3,1],output:[1]},
    //     {input:[10,0],output:[0]},
    //     {input:[10,1],output:[1]},

        
    //     // {daysPast:10,boughtLastTime:1,result:1},
    //     // {daysPast:11,boughtLastTime:1,result:1},
    //     // {daysPast:6,boughtLastTime:1,result:1},
    //     // {daysPast:9,boughtLastTime:1,result:1},
    //     // {daysPast:10,boughtLastTime:0,result:0},
    //     // {daysPast:15,boughtLastTime:1,result:1},
    //     // {daysPast:15,boughtLastTime:0,result:0},
    //     // {daysPast:15,boughtLastTime:1,result:1}
    // ];
    // var net = new brain.NeuralNetwork();

    // net.train(dataSet);

    // let predictResult = net.run([15,1])
    
}
runFIle();