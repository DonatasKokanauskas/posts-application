const authorsModule = {
    state: () => ({
        authorsData: null,
    }),
    mutations: {
        setData(state, data) {
            state.authorsData = data;
        },
    },
    actions: {
        async fetchAuthorsData() {
            try {
                await this.fetchData(
                    "http://localhost:3000/authors",
                    "setData"
                );
            } catch (error) {
                console.log("There was an error", error);
            }
        },
    },
    getters: {},
};

export default authorsModule;
