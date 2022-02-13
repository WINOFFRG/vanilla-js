function myReduce(callbackFn, initialValue) {

    array.forEach(element => {
        initialValue = initialValue !== undefined ? callbackFn(initialValue, element) : element
    });

    return initialValue;
}

Array.prototype.myReduce = myReduce;

const array = [1, 2, 3, 4];
const initialValue = 0;

console.log("Expected Ans:");
let sumWithInitial = array.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue
);
console.log(sumWithInitial);

console.log("Your Ans:");
sumWithInitial = array.myReduce( 
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
);
console.log(sumWithInitial);