//const
const HEADER_OFFSET = 0;
const IMAGE_PIX_LENGTH = 784;
const TRAINING_LIMIT = 800;
const TESTING_LIMIT = 200;
var nn;

//top level variable
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cats = {
  fileName: "data/cats.npy",
  training: [],
  testing: [],
  label: 0
};
var rainbow = {
  fileName: "data/rainbow.npy",
  training: [],
  testing: [],
  label: 1
};
var trains = {
  fileName: "data/trains.npy",
  training: [],
  testing: [],
  label: 2
};

/**
 * @param {string} fileName bitmap file that needs to be loaded.
 * @returns {ByteArray}  uint8Array of respose.
 */
function loadData(fileName) {
  return new Promise(function(resolve, reject) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", fileName, true);
    xhttp.responseType = "arraybuffer";
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        resolve(new Uint8Array(this.response));
      }
    };
    xhttp.send();
  });
}
/**
 *
 * @param {bytes} data byte array of 28 * 28
 * @param {*} x position in x plane
 * @param {*} y position in y plane
 */
function draw(data, x = 0, y = 0) {
  let imageData = ctx.createImageData(28, 28);
  // let data = dataset.subarray(HEADER_OFFSET, HEADER_OFFSET+IMAGE_PIX_LENGTH);
  for (let i = 0; i < 784; i++) {
    imageData.data[i * 4 + 0] = 255 - data[i];
    imageData.data[i * 4 + 1] = 255 - data[i];
    imageData.data[i * 4 + 2] = 255 - data[i];
    imageData.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(imageData, x, y);
}
/**
 *
 * @param {Object} catagory container with data
 * @description small function which will print 100 image of training dataset
 */
function draw100Image(catagory) {
  for (let i = 0; i < 100; i++) {
    let x = (i % 10) * 28;
    let y = Math.floor(i / 10) * 28;
    let data = catagory.training[i];
    draw(data, x, y);
  }
}
/**
 *
 * @param {object} catagory catagory which data needs to be loaded and loaded.
 */

async function prepData(catagory) {
  let data = await loadData(catagory.fileName);
  let totallimit = TRAINING_LIMIT + TESTING_LIMIT;
  for (let i = 0; i < totallimit; i++) {
    let offset = HEADER_OFFSET + i * IMAGE_PIX_LENGTH;
    if (i < TRAINING_LIMIT) {
      catagory.training.push(data.subarray(offset, offset + IMAGE_PIX_LENGTH));
      catagory.training[catagory.training.length - 1].label = catagory.label;
    } else {
      catagory.testing.push(data.subarray(offset, offset + IMAGE_PIX_LENGTH));
      catagory.testing[catagory.testing.length - 1].label = catagory.label;
    }
  }
}

function shuffle(arr) {
  let max = arr.length;
  let min = 0;
  for (let i = 0; i < max; i++) {
    let index = Math.floor(Math.random() * (max - min)) + min;
    let temp = arr[index];
    arr[index] = arr[i];
    arr[i] = temp;
  }
}

// training the data
function trainEpoch(training_total) {
  shuffle(training_total);
  for (let i = 0; i < training_total.length; i++) {
    // for (let i = 0; i < 1; i++) {
    let data = training_total[i];
    let label = training_total[i].label;
    let inputs = Array.from(data).map(x => x / 255);
    let outputs = [0, 0, 0];
    //one hot encoding
    outputs[label] = 1;

    nn.train(inputs, outputs);
  }
}
//testing the data
function testAll(testData){
  var correct = 0;
  for (let i = 0; i < testData.length; i++) {
    // for (let i = 0; i < 1; i++) {
    let data = testData[i];
    let label = testData[i].label;
    let inputs = Array.from(data).map(x => x / 255);
    let guess = nn.feedForward(inputs);
    let max = Math.max(...guess);
    let index = guess.indexOf(max)
    if(index === label){
      correct++
    }
  }
  let percentage = correct / testData.length
  return percentage;
}


async function setup() {
  await prepData(rainbow);
  await prepData(trains);
  await prepData(cats);
  draw100Image(cats)
  //creating the neural network
  nn = new NeuralNetwork(784, 64, 3);
  var training_total = [];
  training_total = training_total
    .concat(rainbow.training)
    .concat(cats.training)
    .concat(trains.training);
    //concating the test data 
    var testing = []
    testing = testing
    .concat(rainbow.training)
    .concat(cats.training)
    .concat(trains.training);
    for(let i = 1 ;  i  < 1 ; i++){

      trainEpoch(training_total);
      console.log(i + " epoch has been trained");
      
      let percentage =  testAll(testing);
      console.log(percentage);
    }
  
}
setup();
