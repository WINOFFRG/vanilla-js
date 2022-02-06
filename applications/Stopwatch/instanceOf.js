function converter(value) {

    let numStr = value.toString();
    let start = parseInt(numStr.split(".")[0]);
    let end = parseInt(numStr.split(".")[1]);

    let convertedStart = start.toLocaleString('en-IN');
    
    end = !end ? '' : '.' + end; 
    
    let convertedStr = convertedStart + end;
    return convertedStr;
}

function maniClone(object) {

    let ans = object;

    for(key in object) {
        if(object[key] instanceof Object) {
            ans[key] = maniClone(object[key]);
        }
    }

    return ans;
}

let deepObj = {
    obj : {
        'A': 'AA',
        'B': 'BB'
    },
    object : {
        'a' : 'apple',
        'b' : 'bheem'
    }
};


// let deepClone = maniClone(deepObj);
// deepClone.obj = 'AAAAA';
// console.log(deepObj, deepClone);

// console.log(converter(123456789.113343));