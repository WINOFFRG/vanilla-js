function myMap(callbackFn) {

    let array = this;
    let newArray = [];

    array.forEach(element => {
        let ans = callbackFn(element);
        newArray.push(ans);
    });

    return newArray;
}

Array.prototype.myMap = myMap;


const array = [1, 4, 9, 16];

const map1 = array.map(x => x * 2);
console.log("Expected Ans:");
console.log(map1);

console.log("Your Ans:");
const map2 = array.myMap(x => x * 2);
console.log(map2);