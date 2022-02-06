function myJSON() {

    function parse(data) {
        
        function internal(data) {
            
            let object = false;
            let stack = new Array();
            let parsingStaus = false;

            try {
                parsingStaus = true;

                    if(data[0] != '{' || data[data.length - 1] != '}') {
                        throw new Error('JSON :: PARSE :: Invalid JSON');
                    }

                    let newObject = {};
                    let newParseStr = str.substr(1,str.length-2);

                    let keyValPairs = newParseStr.split(',');

                    for(let idx = 0; idx < keyValPairs.length; idx++) {   
                        let onePair = keyValPairs[idx].split(':');
                        
                        newObject[onePair[0]] = onePair[1];

                        // console.log(onePair);
                    }

                    return newObject;

            } catch (error) {
                console.log('Error occured while parse' + error);
            }
        }

        return internal(data);
    }

    return {
        parse,
    }
}

let str = '{"name":"John","age":30,"city":"New York"}';
console.log(myJSON().parse(str));
// console.log(JSON.parse(str));