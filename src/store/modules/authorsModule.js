const authorsModule = {
    state: {
        authorsData: null,
    },
    mutations: {
        setAuthorsData(state, data) {
            state.authorsData = data;
        },
    },
    actions: {
        async fetchAuthorsData({ commit, rootState }) {
            try {
                const data = await this.fetchData(
                    rootState.apiURL + "/authors"
                );
                commit("setAuthorsData", data);
            } catch (error) {
                console.log(`There was an error", ${error.message}.`);
            }
        },
    },
    getters: {
        allAuthors(state) {
            return state.authorsData;
        },
    },
};

export default authorsModule;
