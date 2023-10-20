import axios from "axios";

const showFetchErrorNotification = (dispatch) => {
    const errorNotification = {
        type: "error",
        message:
            "There was a problem getting the data. Please try again later.",
    };
    dispatch("notificationAction", errorNotification);
};

const articlesModule = {
    state() {
        return {
            articlesData: null,
            articleData: null,
        };
    },
    mutations: {
        setArticlesData(state, data) {
            state.articlesData = data;
        },
        setArticleData(state, data) {
            state.articleData = data;
        },
    },
    actions: {
        async fetchArticlesData({ commit, rootState, dispatch }) {
            try {
                const data = await this.fetchData(
                    rootState.apiURL + "/posts?_expand=author"
                );
                commit("setArticlesData", data);
            } catch (error) {
                console.log(`There was an error", ${error.message}.`);
                showFetchErrorNotification(dispatch);
            }
        },
        async fetchArticleData({ commit, rootState, dispatch }, postId) {
            try {
                const data = await this.fetchData(
                    rootState.apiURL + "/posts/" + postId + "?_expand=author"
                );
                commit("setArticleData", data);
            } catch (error) {
                console.log(`There was an error", ${error.message}.`);
                showFetchErrorNotification(dispatch);
            }
        },
        async deleteArticleAction({ rootState }, articleIdToDelete) {
            try {
                await axios.delete(
                    `${rootState.apiURL}/posts/${articleIdToDelete}`
                );
            } catch (error) {
                console.log("There was an error", error);
            }
        },
    },
    getters: {
        allArticles: (state) => state.articlesData,
        articleGetter(state) {
            return state.articleData;
        },
    },
};

export default articlesModule;
