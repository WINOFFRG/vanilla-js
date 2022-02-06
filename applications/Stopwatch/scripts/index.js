const stopwatch = {

    hooks: {
        elements: {
            countdown: null,
            // progressBa
        },
        state: {
            currentTime: 0,
            totalTime: 0,
            isRunning: false,
            timerId: null, 
            color: 'green',
            initTime: null,
        },
        timerObj: null,
    },

    initialize() {
        this.elements = {
            countdown: document.querySelector('.countdown'),
            progressBar: document.querySelector('.progress-bar')
        }

        this.state = {
            currentTime: 0,
            totalTime: 0,
            isRunning: false
        }

        stopwatch.startTimer(0.1);
    },

    displayTime(timeInSec) {
        const time = stopwatch.hooks.state.initTime + timeInSec;
        const currDate = new Date(time);
        const oldDate = new Date(stopwatch.hooks.state.initTime);

        console.log(currDate, oldDate);

        const hours = currDate.getHours() - oldDate.getHours();
        const minutes = currDate.getMinutes() - oldDate.getMinutes();
        const seconds = currDate.getSeconds() - oldDate.getSeconds();

        const strTime = `${hours}:${minutes}:${seconds}`;
        // console.log(strTime);
    },

    updateTime : function() {
        stopwatch.hooks.state.currentTime++
        // this.elements.progressBar.style.width = `${this.state.currentTime / this.state.totalTime * 100}%`

        stopwatch.displayTime(stopwatch.hooks.state.currentTime);
        console.log('Current Time: ', stopwatch.hooks.state.currentTime, 'Total Time: ', stopwatch.hooks.state.totalTime);

        // if(stopwatch.hooks.state.totalTime * 50 / 100 >= stopwatch.hooks.state.currentTime) {
        //     console.log('Yellow');
        // }

        // if(stopwatch.hooks.state.totalTime * 10 / 100 >= stopwatch.hooks.state.currentTime) {
        //     console.log('Red');
        // }

        if(stopwatch.hooks.state.currentTime === stopwatch.hooks.state.totalTime) {
            stopwatch.stopTimer();
        }

        // this.updateTime();
    },

    stopTimer() {
        let timer = stopwatch.hooks.timerObj;
        timer.myClearInterval(stopwatch.hooks.state.timerId);  
    },

    startTimer(totalTime) {
        this.hooks.state.initTime = Date.now();
        const timeInSeconds = totalTime * 60;
        this.hooks.state.totalTime = timeInSeconds;
        stopwatch.hooks.timerObj = this.timerPollyfill();
        stopwatch.hooks.state.timerId = stopwatch.hooks.timerObj.mySetInterval(this.updateTime, 1000);
        this.updateTime();
    },

    timerPollyfill() {
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
}

window.addEventListener('load', stopwatch.initialize);