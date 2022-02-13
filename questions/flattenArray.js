/*
    Date: 02:02:2022
    JS Revise Class 1
*/

const arr = [
    [1,2,3],
    [[4,5,[6]]],
    [7,[8],9],
    10
];

// Approach 2 - Direct smartJS

function usingSmartJS(arr) {
    return arr.toString().split(',').map((e) => Number(e));
}

function usingRecursion(arr = []) {

    try {
        if(arr && Array.isArray(arr)) {
            let result = [];
            const length = arr.length;

            for(let key = 0; key < length; key++) {
                const currValue = arr[key];

                if(Array.isArray(currValue)) {
                    const innerData = usingRecursion(currValue);

                    result = result.concat(innerData);
                }

                else {
                    result.push(currValue);
                }
            }
            return result;
        }
        else {
            const infoAns = arr ? 'Passed parameter is not an Array' : 'Please check the parameter';
            console.log(infoAns);
        }
    } catch (error) {
        console.log("Cannot concat to this array", error);
    }
}

console.log("Approach 1: ", usingSmartJS(arr));
console.log("Approach 2: ",usingRecursion(arr));