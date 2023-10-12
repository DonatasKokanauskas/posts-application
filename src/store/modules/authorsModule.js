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
        async fetchAuthorsData() {
            try {
                await this.fetchData(
                    "http://localhost:3000/authors",
                    "setAuthorsData"
                );
            } catch (error) {
                console.log("There was an error", error);
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
