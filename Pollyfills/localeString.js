function converter(value) {

    let numStr = value.toString();
    let start = parseInt(numStr.split(".")[0]);
    let end = parseInt(numStr.split(".")[1]);

    let convertedStart = start.toLocaleString('en-IN');
    
    end = !end ? '' : '.' + end; 
    
    let convertedStr = convertedStart + end;
    return convertedStr;
}