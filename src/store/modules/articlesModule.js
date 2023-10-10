const articlesModule = {
    state() {
        return {
            articlesData: null,
        };
    },
    mutations: {
        setData(state, data) {
            state.articlesData = data;
        },
    },
    actions: {
        async fetchArticlesData() {
            try {
                await this.fetchData("http://localhost:3000/posts", "setData");
            } catch (error) {
                console.log("There was an error", error);
            }
        },
    },
    getters: {},
};

export default articlesModule;
