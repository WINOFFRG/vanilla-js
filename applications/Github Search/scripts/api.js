const github = {

    async fetchUserData(username) {

        try {
            const response = await fetch(`https://api.github.com/users/${username}`, {
                headers: {
                    'Authorization': 'token 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'
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
                    'Authorization': 'token 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'
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