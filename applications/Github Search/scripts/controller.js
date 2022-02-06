const logic = {

    sorting: {
        sortBy(handler, arr, order) {

            if(handler === 'byName') {
                console.log('Sorting by Name');

                let unsortedMap = new Map();

                for(let idx = 0; idx < arr.length; idx++) {
                    unsortedMap.set(idx, arr[idx]['name']);
                }

                let sortedData = null;

                if(order === 'asc') {
                    return arr;
                }
                else {
                    sortedData = Array.from(unsortedMap.entries()).sort(function (a, b) {
                        if (a > b) {
                            return -1;
                        }
                        if (b > a) {
                            return 1;
                        }
                        return 0;
                    });;
                }

                console.log(sortedData);
                let newRepoData = [];
                
                sortedData.forEach( (repoIdxValue) => {
                    newRepoData.push(arr[repoIdxValue[0]])
                });
                
                return newRepoData;
            }
            else if(handler === 'byStars') {
                console.log(`Sorting ${handler} in ${order} order`);

                let unsortedMap = new Map();

                for(let idx = 0; idx < arr.length; idx++) {
                    unsortedMap.set(idx, arr[idx]['stargazers_count']);
                }

                let sortedData = null;

                if(order === 'asc') {
                    sortedData = Array.from(unsortedMap.entries()).sort((a, b) => a[1] - b[1]);
                }
                else {
                    sortedData = Array.from(unsortedMap.entries()).sort((a, b) => b[1] - a[1]);
                }

                let newRepoData = [];
                
                sortedData.forEach( (repoIdxValue) => {
                    newRepoData.push(arr[repoIdxValue[0]])
                });
                
                return newRepoData;
            }
            else if(handler === 'byForks') {
                console.log(`Sorting ${handler} in ${order} order`);

                let unsortedMap = new Map();

                for(let idx = 0; idx < arr.length; idx++) {
                    unsortedMap.set(idx, arr[idx]['forks_count']);
                }

                let sortedData = null;

                if(order === 'asc') {
                    sortedData = Array.from(unsortedMap.entries()).sort((a, b) => a[1] - b[1]);
                }
                else {
                    sortedData = Array.from(unsortedMap.entries()).sort((a, b) => b[1] - a[1]);
                }

                let newRepoData = [];
                
                sortedData.forEach( (repoIdxValue) => {
                    newRepoData.push(arr[repoIdxValue[0]])
                });
                
                return newRepoData;
            }
        }
    }
}

export default logic;