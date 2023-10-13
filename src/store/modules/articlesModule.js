import axios from "axios";

const articlesModule = {
    state() {
        return {
            articlesData: null,
            articleDate: null,
        };
    },
    mutations: {
        setArticlesData(state, data) {
            state.articlesData = data;
        },
        setDate(state, data) {
            state.articleDate = data;
        },
    },
    actions: {
        async fetchArticlesData() {
            try {
                await this.fetchData(
                    "http://localhost:3000/posts",
                    "setArticlesData"
                );
            } catch (error) {
                console.log("There was an error", error);
            }
        },
        showCreatedOrEditedDate({ commit }, dateObject) {
            const createdDate = new Date(dateObject.created).getTime();
            const updatedDate = new Date(dateObject.updated).getTime();

            if (createdDate > updatedDate) {
                const date = new Date(createdDate)
                    .toLocaleString("lt-LT")
                    .slice(0, 11);
                commit("setDate", date);
            } else {
                const date = new Date(updatedDate)
                    .toLocaleString("lt-LT")
                    .slice(0, 11);
                commit("setDate", date);
            }
        },
        async deleteArticleAction(_, articleIdToDelete) {
            try {
                await axios.delete(
                    `http://localhost:3000/posts/${articleIdToDelete}`
                );
            } catch (error) {
                console.log("There was an error", error);
            }
        },
    },
    getters: {
        articlesGetter(state) {
            return state.articlesData;
        },
        articleDateGetter(state) {
            return state.articleDate;
        },
    },
};

export default articlesModule;
