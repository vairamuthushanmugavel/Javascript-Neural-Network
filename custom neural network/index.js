var trainingdata = [
  {
    inputs :[1,0],
    output:[1]
  },
  {
    inputs :[0,1],
    output:[1]
  },
  {
    inputs :[0,0],
    output:[0]
  },
  {
    inputs :[1,1],
    output:[0]
  },
]


var nn = new NeuralNetwork(2,2,1);
for(let i = 0 ;i < 100000 ; i++){
  //shuffling data
  let index = Math.floor(Math.random()*4)
  let data = trainingdata[index]
  nn.train(data.inputs,data.output);
}

console.log(nn.feedForward([1,1]));
console.log(nn.feedForward([1,0]))
console.log(nn.feedForward([0,1]))
console.log(nn.feedForward([0,0]))