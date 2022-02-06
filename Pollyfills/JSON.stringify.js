function myJSON() {

    function parse(data) {

    };

    const handlers = {

        'object' : {
            
            'array' : function (data) {
    
                if(!Array.isArray(data)) throw new Error(' HANDLER :: ARRAY : Argument must be an array');
    
                let result = '[';

                for(let idx = 0; idx < data.length; idx++) {
                    
                    if(data[idx] instanceof Object) {

                        if(Array.isArray(data[idx])) {
                            result += handlers['object']['array'](data[idx]);
                        }
                        else {
                            result += handlers['object']['object'](data[idx]);
                        }
                    }

                }

                result += ']';

                return data;
            },

            'object' : function (data) {

                if(!(data instanceof Object)) throw new Error(' HANDLER :: OBJECT : Argument must be an object');

                return data;
            },
        }

    }

    function stringify(data) {

        function internal(data) {

            let stringedAns = '';

            try {
                stringedAns += '{';
                let startFlag = false;

                for(key in data) {

                    let keyValueString = '';

                    /*   Object End   */
                    if(startFlag) {
                        keyValueString += ',';
                    }
                    startFlag = true;

                    /*   Object Key   */
                    if(typeof key !== 'string') {
                        throw new Error('Key must be a string');
                    }
                    else {
                        keyValueString += `"${key}":`;
                    }

                    /*   Object Value   */
                    if(typeof data[key] === 'string') {
                        keyValueString += `"${data[key]}"`;
                    }
                    else if(typeof data[key] === 'object') {

                        if(Array.isArray(data[key])) {
                            let array = data[key];
                            keyValueString += '[';

                            for(let i = 0; i < array.length; i++) {
                                if(i !== 0) {
                                    keyValueString += ',';
                                }

                                if(typeof array[i] === 'object') {
                                    keyValueString += internal(array[i]);
                                }
                                else if(typeof array[i] === 'function') {
                                    keyValueString += null;
                                }
                                else {
                                    keyValueString += array[i];
                                }
                            }

                            keyValueString += ']';
                        }
                        else if(data[key] == null || data[key] == Infinity || data[key] == -Infinity || data[key] == NaN) {
                            keyValueString += null;
                        }
                        else {
                            keyValueString += internal(data[key]);
                        }
                    }
                    else if(typeof data[key] === 'boolean') {
                        keyValueString += data[key] ? 'true' : 'false';
                    }
                    else if(typeof data[key] === 'number') {
                        if(data[key] === Infinity || data[key] === -Infinity || data[key] === NaN) {
                            keyValueString += null;
                        }
                        else {
                            keyValueString += data[key];
                        }
                    }
                    // else if(typeof data[key] === '') {
                    else if(typeof data[key] === 'function') {
                        continue;
                    }
                    
                    stringedAns += keyValueString;
                }

                stringedAns += '}';

            } catch (error) {
                console.log(error);
                return error;
            }

            return stringedAns;
        };

        return internal(data);
    };

    return {
        parse,
        stringify
    }
}

function helpMeGawd() {
    return true;
}

let object = {
    'name': 'John',
    'object': {
        'sub_key_a' : 'value_1',
        'sub_key_b' : 'value_2',
    },
    1: [1,2,3],
    "2" : helpMeGawd(),
    true: 'false',
    undefined: null,
    key: [1,2,3,{ arrKey: 'arrValue' }],
    scam: [1,2, helpMeGawd(), helpMeGawd],
    1212321: Infinity,
    1221: -Infinity,
    "awee": NaN
}

console.log(myJSON().stringify(object));
console.log(JSON.stringify(object));

/*
    dataTypes: ['string', 'variable', 'array', 'object', 'function', 'number', 'boolean', 'null', 'undefined']

    edgecases: 
    1. key is not a string
    2. same key is added multiple times

*/