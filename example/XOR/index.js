var trainingdata = [
  {
    inputs: [1, 0],
    output: [1]
  },
  {
    inputs: [0, 1],
    output: [1]
  },
  {
    inputs: [0, 0],
    output: [0]
  },
  {
    inputs: [1, 1],
    output: [0]
  }
];
//getting the canvas element
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var nn = new NeuralNetwork(2, 4, 1);
let resolution = 5;
var cols = canvas.width / resolution;
var rows = canvas.height / resolution;
function drawLoop() {
  for (let i = 0; i < 10000; i++) {
    //shuffling data
    let index = Math.floor(Math.random() * 4);
    let data = trainingdata[index];
    nn.train(data.inputs, data.output);
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let inputs =[row/rows,col/cols];
      let guess = nn.feedForward(inputs);
        ctx.fillStyle = `rgb(${guess*255},${guess*255},${guess*255})`
      ctx.fillRect(row * resolution, col * resolution, resolution, resolution);
    }
  }
}

setInterval(drawLoop, 100);

