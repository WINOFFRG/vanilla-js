// function myMap(callbackFn, referThis) {

//     let that = referThis ? referThis : this;
//     let ansArray = [];

//     this.forEach( (element, idx) => {
//         const result = callbackFn.apply(that, [element, idx, this]);
//         ansArray.push(result);
//     });

//     return ansArray;
// }

// Array.prototype.myMap = myMap;

// const arr = [1,2,3,4,5];

// console.log("Expected Output");
// const result = arr.map( (element, index, array) => {
//     return array;
// });
// console.log(result);

// console.log("Your Output");
// const result2 = arr.myMap( (element, index, array) => {
//     return array;
// });

// console.log(result2);


function myReduce(callbackFn, initialValue) {

    let initVal = initialValue;
    
    for (let idx = 0; idx < this.length; idx++) {
        
        if (initVal !== undefined) {
            initVal = callbackFn.call(undefined, initVal, this[idx], idx, this);
        } else {
            initVal = this[idx];
        }
    }
    
    return initVal;
}

Array.prototype.myReduce = myReduce;

const arr = [1,2,3,4,5];
const initialValue = undefined;

console.log("Expected Output");
let result = arr.reduce( (prevValue, currValue, array) => {
    return prevValue + currValue;
}, initialValue);
console.log(result);

result = arr.reduce( (prevValue, currValue, array) => {
    return prevValue + currValue;
});
console.log(result);

console.log("Your Output");
const result2 = arr.myReduce( (prevValue, currValue, array) => {
    return prevValue + currValue;
}, initialValue);

console.log(result2);

// function myBind(boundFn, ...args) {

//     return (...externalArgs) => {
//         return this.apply(boundFn, [...args, ...externalArgs])
//     }
// }

// Function.prototype.myBind = myBind;

// const obj = {
//     x: 42,
//     getX: function() {
//       return this.x;
//     }
// };
  
// const unboundGetX = obj.getX;
// const boundGetX = unboundGetX.bind(obj);
// console.log("Expected:");
// console.log(boundGetX());
// // expected output: 42

// console.log("Yours");
// const anotherBoundGetX = unboundGetX.myBind(obj);
// console.log(anotherBoundGetX());