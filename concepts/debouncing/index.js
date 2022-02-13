document.querySelector('.input-text').addEventListener('keyup',
deBouncer(fetchData)
);

// function onInput(event) {
//     const data = event.target.value;
//     deBouncer(fetchData)();
// }

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