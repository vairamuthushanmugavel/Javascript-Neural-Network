var nn = new NeuralNetwork(2,3,1);
let inputs = [1,0];
let outputs = nn.feedForward(inputs);
console.log(Matrix.toArray(outputs))