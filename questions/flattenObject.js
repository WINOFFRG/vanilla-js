const data = {
    a: 'Jack',
    b: {
        c: 'Sparrow',
        d: {
            e: 'Movie',
        }
    }
}

const ans = {
    'a': 'Jack',
    'b.c': 'Sparrow',
    'b.d.e': 'Movie',
}

function flattenObject(obj = null) {

    const ans = {};

    if(!obj) {
        return ans;
    }
    else if(typeof obj === 'function') {
        throw new Error("Object can't be a function");
    }

    for(let key in obj) {

        const value = obj[key];

        if(typeof value === 'object') {
            const flattenObjResult = flattenObject(value);

            for(let anotherKey in flattenObjResult) {
                ans[key + '.' + anotherKey] = flattenObjResult[anotherKey];
            }
        }
        else {
            ans[key] = obj[key];
        }
    }

    return ans;
}

console.log("Your Result: ",flattenObject(data));
console.log("Expected Result: ", ans);