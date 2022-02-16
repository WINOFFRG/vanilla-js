/*
    Date: 03-02-22
    Class: JS Revision
*/

function myBind(boundObj, ...args) {
    
    if(!boundObj) {
        throw new Error("Invalid bind object")
    }

    return function (... innerArgs) {
        this.apply(boundObj, [...innerArgs, ...args]);
    }
}

Function.prototype.myBind = myBind;

const obj = {
    x: 42,
    getX: function() {
      return this.x;
    }
};
  
const unboundGetX = obj.getX;
const boundGetX = unboundGetX.bind(obj);
console.log("Expected Output:");
console.log(boundGetX());

console.log("Your Output:");
const customBoundGetX = unboundGetX.myBind(obj);
console.log(customBoundGet);