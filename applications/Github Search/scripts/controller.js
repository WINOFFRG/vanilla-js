const logic = {

    sorting: {
        sortBy(handler, arr, order) {
            
            console.log(`Sorting ${handler} in ${order} order`);
            
            const jsonIdxMap = {
                'byName': 'name',
                'byStars': 'stargazers_count',
                'byForks': 'forks_count',
                'byLanguage': 'language',
                'byLastUpdated': 'updated_at'
            }

            let unsortedMap = new Map();

            for(let idx = 0; idx < arr.length; idx++) {
                unsortedMap.set(idx, arr[idx][jsonIdxMap[handler]]);
            }

            let sortedData = null;

                if(handler === 'byName' || handler === 'byLanguage' || handler === 'byLastUpdated') {

                    if(order === 'asc') {

                        if(handler === 'byName') {
                            return arr;
                        }
                        else {
                            sortedData = Array.from(unsortedMap.entries()).sort(function (a, b) {
                                let stringA = a[1].toLowerCase(), stringB = b[1].toLowerCase();
                                if (stringA < stringB)
                                    return -1;
                                if (stringA > stringB)
                                    return 1;
                                return 0;
                            });                            
                        }
                    }
                    else {
                        sortedData = Array.from(unsortedMap.entries()).sort(function (a, b) {
                            let stringA = a[1].toLowerCase(), stringB = b[1].toLowerCase();
                            if (stringA < stringB)
                                return 1;
                            if (stringA > stringB)
                                return -1;
                            return 0;
                        });
                    }
                }
                else if(handler === 'byStars' || handler === 'byForks') {

                    if(order === 'asc') {
                        sortedData = Array.from(unsortedMap.entries()).sort((a, b) => a[1] - b[1]);
                    }
                    else {
                        sortedData = Array.from(unsortedMap.entries()).sort((a, b) => b[1] - a[1]);
                    }
                }
            
            let newRepoData = [];
            
            sortedData.forEach( (repoIdxValue) => {
                newRepoData.push(arr[repoIdxValue[0]])
            });

            return newRepoData;
        }
    },

    parsing: {
        
        parseData(data) {
            
            const currentDate = new Date();

            data.forEach( (repo) => {
                if(repo['language'] === null) {
                    repo['language'] = 'Unknown';
                }
            });
            
            data.forEach( (repo) => {   
                let lastUpdated = new Date(repo['updated_at']);
                // console.log(`${lastUpdated.getDate()} - ${lastUpdated.getMonth()} - ${lastUpdated.getFullYear()}`); 

                let yearGap = Math.abs(currentDate.getFullYear() - lastUpdated.getFullYear());
                let monthGap = Math.abs(currentDate.getMonth() - lastUpdated.getMonth());
                let dayGap = Math.abs(currentDate.getDate() - lastUpdated.getDate());

                if(yearGap > 0) {
                    if(yearGap === 1) {
                        repo['updated_at'] = `${yearGap}.${monthGap} year ago`;
                    }
                    else {
                        repo['updated_at'] = `${yearGap}.${monthGap} year's ago`;
                    }
                }
                else if(monthGap > 0) {
                    if(monthGap === 1) {
                        repo['updated_at'] = `${monthGap}.${dayGap} month ago`;
                    }
                    else {
                        repo['updated_at'] = `${monthGap} month's ago`;
                    }
                }
                else if(dayGap > 0) {
                    if(dayGap === 1) {
                        repo['updated_at'] = `${dayGap} day ago`;
                    }
                    else {
                        repo['updated_at'] = `${dayGap} days ago`;
                    }
                }
                else {
                    repo['updated_at'] = 'Today';
                }
            });
            
            return data;
        }
    } 
}

export default logic;