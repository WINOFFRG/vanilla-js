const gameLogic = {

    checkStatus(data) {

        // Check Row and Col
        for(let idx = 0; idx < 3; idx++) {            
            if(data[0][idx] === data[1][idx] && data[1][idx] === data[2][idx] && data[0][idx] != -1) {
                console.log('Row Check');
                return data[0][idx];
            }
        }

        for(let idx = 0; idx < 3; idx++) {
            if(data[idx][0] === data[idx][1] && data[idx][1] === data[idx][2] && data[idx][0] != -1) {
                console.log('Column Check');
                return data[idx][0];
            }
        }

        //Check Diagonal
        if(data[0][0] == data[1][1] && data[1][1] == data[2][2] && data[0][0] != -1) {
            console.log('Diagonal Left');
            return[0][0];
        }

        if(data[0][2] == data[1][1] && data[1][1] == data[2][0] && data[0][2] != -1) {
            console.log('Diagonal Right');
            return[0][2];
        }

        return -1;
    }
}

export default gameLogic;