function timerPollyfill() {
    currentId = 0;
    timeoutIds = {};

    function mySetInterval(callback, delay, ...args) {
        currentId++;

        function onLoop() {

            timeoutIds[currentId] = setTimeout(() => {
                callback(...args);  

                if(timeoutIds[currentId]) {
                    onLoop();
                }
            }, delay);
        }

        onLoop();
        return currentId;
    };

    function myClearInterval(id) {
        clearTimeout(timeoutIds[id]);
        delete timeoutIds[id];
    };

    return {
        mySetInterval,
        myClearInterval
    }
}

const timer = timerPollyfill();
let count = 0;

const id = timer.mySetInterval( () => {
    console.log(count++);
}, 1000);

setTimeout( () => {
    timer.myClearInterval(id);
}, 4000);
