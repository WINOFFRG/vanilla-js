let p1 = Promise.resolve(3);
// let p2 = Promise.resolve(1337);
let p2 = 1337;
let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("foo");
    }, 100);
});

let p4 = function () {
    return Promise.reject('Error occured');
}


function myPromise() {

    function all(data) {

        async function internal(data) {

            if (Array.isArray(data) === false) {
                return Promise.reject(new Error('Promise :: All : Requires Array as an Argument'));
            }

            let promises = [];

            for (let idx = 0; idx < data.length; idx++) {
                const element = data[idx];
                promises.push(await element);
            }

            return Promise.resolve(promises);
        }

        return internal(data);
    }

    async function allSettled(data) {

        if (Array.isArray(data) === false) {
            return Promise.reject(new Error('Promise :: All : Requires Array as an Argument'));
        }

        let mappedPromises = data.map((p) => {
            
            if (typeof p !== 'object') {
                return {
                    status: 'fulfilled',
                    value: p,
                };   
            }

            return p
                .then((value) => {
                    return {
                        status: 'fulfilled',
                        value,
                    };
                })
                .catch((reason) => {
                    return {
                        status: 'rejected',
                        reason,
                    };
                });
        });

        return Promise.all(mappedPromises);
    };

    return {
        all,
        allSettled,
    }
}

// myPromise().all([p1, p2, p3, p4()]).then(values => {
//     try {
//         console.log('Your Result:');
//         console.log(values); // [3, 1337, "foo"]
//     } catch (error) {
//         console.log(error);
//     }
// });

// Promise.all([p1, p2, p3, p4()]).then(values => {
//     try {
//         console.log('Expected Result:');
//         console.log(values); // [3, 1337, "foo"]
//     } catch (error) {
//         console.log(error);
//     }
// });

myPromise().allSettled([p1, p2, p3, p4()]).then(values => {

    console.log('Your Result:');
    console.log(values); // [3, 1337, "foo"]

}).catch(error => {

    console.log(error);

});

// Promise.allSettled([p1, p2, p3, p4()]).then(values => {
//     try {
//         console.log('Expected Result:');
//         console.log(values); // [3, 1337, "foo"]
//     } catch (error) {
//         console.log(error);
//     }
// });