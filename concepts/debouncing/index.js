document.querySelector('.input-text-d').addEventListener('keyup',
deBouncer(fetchData)
);

document.querySelector('.input-text-t').addEventListener('keyup',
throttling(fetchData)
);

let counter = 0;
function fetchData() {
    console.log(counter++);
}

function deBouncer(callbackFn, delay = 1000) {
    let timerId = 0;

    return (...args) => {
        clearTimeout(timerId);

        timerId = setTimeout( () => {
            callbackFn.apply(this, args);
        }, delay);
    }
}

function throttling(callbackFn, delay = 1000) {
    let timerId = 0;
    let isWaiting = true;

    return (...args) => {
        // clearTimeout(timerId);

        if(isWaiting) {           
            timerId = setTimeout( () => {
                callbackFn.apply(this, args);
                isWaiting = false;
            }, delay);
        }
    }
}