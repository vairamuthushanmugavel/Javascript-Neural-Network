class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.matrix = [];
    for (let row = 0; row < this.rows; row++) {
      this.matrix[row] = [];
      for (let col = this.cols; col < this.cols; col++) {
        this.matrix[row][col] = 0
      }
    }
  }
}
/*
*@param {Number} num scaler value
*@return {Matrix} Matrix Object 
*/
Matrix.prototype.multiply=function(num){
  for (let row = 0; row < this.rows; row++) {
    for (let col = this.cols; col < this.cols; col++) {
      this.matrix[row][col] *= num
    }
  }
}
/*
* @param {Number} num  value to be added
* @returns {Matrix} Matrix Object
*/
Matrix.prototype.add=function(num){
  for (let row = 0; row < this.rows; row++) {
    for (let col = this.cols; col < this.cols; col++) {
      this.matrix[row][col] += num
    }
  }
}