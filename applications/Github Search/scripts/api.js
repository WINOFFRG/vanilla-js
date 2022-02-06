const github = {

    async fetchUserData(username) {

        try {
            const response = await fetch(`https://api.github.com/users/${username}`, {
                headers: {
            }
        });
            return await response.json();
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    async fetchMetaData(username) {
        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos`, {
                headers: {
            }
        });
            return await response.json();
        } catch (error) {
            console.log(error);
            return error;
        }
    },
}

export default github;