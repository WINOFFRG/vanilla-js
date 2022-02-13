function groupBy(collection, iteratee) {

    if(!collection instanceof Object) {
        throw new Error(`Argument collection must be itertable got: ${collection}`);
        return;
    }

    let type = null;

    if(typeof iteratee === 'function') {
        type = 'function';
    }
    else if(typeof iteratee === 'string') {
        type = 'string';
    }
    else {
        throw new Error(`Argument iteratee must be valid`);
    }

    let ans = {};

    for(let key in collection) {

        let value = collection[key];
        let modifiedValue = null;
        
        if(type === 'function') {
            modifiedValue = iteratee(value);
        }
        else if(type === 'string') {
            modifiedValue = value[iteratee];
        }

        if(Array.isArray(ans[modifiedValue])) {
            ans[modifiedValue].push(value);
        }
        else {
            ans[modifiedValue] = [];
            ans[modifiedValue].push(value);
        }
    }
    console.log(collection);

    return ans;
}

console.log("TC 1");
let users = ([6.5, 4.12, 6.8, 5.4]);
let grouped_data = groupBy(users, Math.floor );
console.log(grouped_data);

console.log("\nTC 2");
users = (['eight', 'nine', 'four', 'seven']);
grouped_data = groupBy(users, 'length')
console.log(grouped_data);
