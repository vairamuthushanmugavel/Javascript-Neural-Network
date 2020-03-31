var nn = new NeuralNetwork(2,2,1);
let inputs = [1,0];
let targets = [1] 
// let outputs = nn.feedForward(inputs);
// console.log(Matrix.toArray(outputs))
nn.train(inputs,targets);