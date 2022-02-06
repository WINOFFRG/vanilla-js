import githubApi from './api.js';
import applicationLogic from './controller.js';

const application = {

    stateData : {
        apiData: {
            userdata: {},
            metaData: []
        },
        sortedData: {
            byName: null,
            byStars: null,
            byForks: null,
            byLanguage: null,
            byLastUpdated: null,
        },
        filterBy: {
            languages: [],
        },
        loading: false,
    },

    initialize() {
        const searchBar = document.querySelector('#search-field');
        const searchButton = document.querySelector('#search-btn');

        searchButton.addEventListener('click', async () => {
            const searchTerm = searchBar.value || 'winoffrg';
            
            if(this.stateData.loading) {
                console.log("Please wait while the data is still loading ...");
                return;
            }

            this.render.isLoading(true);

            this.stateData.apiData.userdata = await githubApi.fetchUserData(searchTerm);
            this.stateData.apiData.metaData = await githubApi.fetchMetaData(searchTerm);
            
            this.render.isLoading(false);

            this.render.userData(this.stateData.apiData.userdata);
            this.render.metaData(this.stateData.apiData.metaData);

            this.setControls();
        });
    },

    render: {
        isLoading(value) {
            console.log(value);
        },

        userData(data) {
            const userAvatar = document.querySelector('.user-details__avatar > img');
            const userName = document.querySelector('.user-details__name');
            const userDetails = document.querySelector('.user-details__bio');

            userAvatar.src = data.avatar_url;
            userName.innerHTML = data.name;
            userDetails.innerHTML = data.bio;
        },

        metaData(data) {

            let repos = '';

            data.forEach(element => {
                
                const repoData = {
                    name: element.name,
                    stars: element.stargazers_count,
                    forks: element.forks,
                    language: element.language,
                    lastUpdated: element.updated_at
                }

                const repo = `
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap font-bold">
                        ${repoData.name}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="px-4 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"> ${repoData.stars} </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-3 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800"> ${repoData.forks} </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"> ${repoData.language} </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        ${repoData.lastUpdated}
                    </td>
                </tr>
                `;

                repos+= repo;
            });


            const repoContainer = document.querySelector('.table-rows');
            repoContainer.innerHTML = repos;
        },
    },

    setControls() {
        
        const buttons = ['sort-btn__name', 'sort-btn__stars'];
        const buttonReference = buttons.map(button => document.querySelector(`.${button}`));
        
        buttonReference[0].addEventListener('click', () => {
            this.menuLogic.sortBy('byName');
        });

        buttonReference[1].addEventListener('click', () => {
            this.menuLogic.sortBy('byStars');
        });
    },

    menuLogic: {
        
        renderControls: {
            toggleSortButton() {
                console.log('Toggle Sort Button');
            }
        },
        
        sortBy(handler) {
            
            // Check Caching
            if(application.stateData.sortedData[handler]) {
                    
            }

            // If not then cache it
            applicationLogic.sorting.sortBy(handler);
            this.renderControls.toggleSortButton();
            console.log('Sorting by ...');
        }
    }
}

window.addEventListener('load', () => {
    application.initialize.call(application);
});