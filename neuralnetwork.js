function sigmoid(x){
  return (1/(1+Math.exp(-x)));
}

class NeuralNetwork{
 constructor(inputcount,hiddencount,outputcount){
    this.inputcount = inputcount;
    this.hiddencount = hiddencount;
    this.outputcount = outputcount;
    //inititalizing the weights
    //initializing weights between input node and hidden node.
    this.weights_ih =  new Matrix(this.hiddencount,this.inputcount);
    this.weights_ih.randomize();
    //initializing the weights between output node and hidden node.
    this.weights_ho = new Matrix(this.outputcount,this.hiddencount);
    this.weights_ho.randomize();
    //bias for hiddde node 
    this.bias_h = new Matrix(this.hiddencount,1);
    this.bias_h.randomize()
    //bias for output node.
    this.bias_o = new Matrix(this.outputcount,1);
    this.bias_o.randomize()
 }
 feedForward(inputs){
   //coverting the input into array 
   if(!(inputs instanceof Matrix)){
      inputs = Matrix.fromArray(inputs)
   }
   //Matrix multiplication between input to hidden weights and inputs
   let hiddenoutput = Matrix.multiply(this.weights_ih,inputs);
   //adding the bias
   hiddenoutput.add(this.bias_h)
    // Activation function
    hiddenoutput.map(sigmoid);
   //multiplying the hidden output with hidden to output weights
   let output = Matrix.multiply(this.weights_ho,hiddenoutput);
   //adding the bias
   output.add(this.bias_o);
   //Activation function
    output.map(sigmoid);

   return output

 }
 /**
  * training function of the neuralnetwork.
  */
 train(inputs, targets){
    if(!(inputs instanceof Matrix)){
       inputs = Matrix.fromArray(inputs);
    }
    if(!(targets instanceof Matrix)){
       targets = Matrix.fromArray(targets);
    }
    let guess = this.feedForward(inputs)  
    //calculating the output error
    //error =  target - error
    let output_errors = Matrix.substract(targets,guess)
    //calculating the output error transposed
    let weights_ho_t = Matrix.transpose(this.weights_ho);
    //calculting the hidden error
    let hidden_errors = Matrix.multiply(weights_ho_t,output_errors);
    hidden_errors.print()


 }
}