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
    let isWaiting = false;

    return (...args) => {
        if(!isWaiting) {           
            callbackFn.apply(this, args);
            isWaiting = true;

            timerId = setTimeout( () => {
                isWaiting = false;
            }, delay);


        }
    }
}