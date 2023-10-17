const authorsModule = {
    state: () => ({
        authorsData: null,
        authorName: null,
    }),
    mutations: {
        setAuthorsData(state, data) {
            state.authorsData = data;
        },

        setAuthorName(state, name) {
            state.authorName = name;
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
        authorName(context, authorId) {
            const name = context.getters.authorsGetter.filter((author) => {
                return author.id === authorId;
            });
            context.commit("setAuthorName", name[0].name);
        },
    },
    getters: {
        authorsGetter(state) {
            return state.authorsData;
        },
        authorNameGetter(state) {
            return state.authorName;
        },
    },
};

export default authorsModule;
