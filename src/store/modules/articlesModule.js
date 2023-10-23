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
        async deleteArticleAction({ rootState, dispatch }, articleIdToDelete) {
            try {
                const response = await axios.delete(
                    `${rootState.apiURL}/posts/${articleIdToDelete}`
                );

                if (response.status >= 200 && response.status < 300) {
                    dispatch("notificationAction", {
                        type: "success",
                        message: "You have successfully deleted the article",
                    });
                }
            } catch (error) {
                console.log("There was an error", error);
                dispatch("notificationAction", {
                    type: "error",
                    message:
                        "There was a problem deleting the article. Please try again later.",
                });
            }
        },
        async postNewArticle({ rootState, dispatch }, newArticle) {
            try {
                const response = await axios.post(
                    `${rootState.apiURL}/posts`,
                    newArticle
                );

                if (response.status >= 200 && response.status < 300) {
                    dispatch("notificationAction", {
                        type: "success",
                        message:
                            "You have successfully created the new article",
                    });
                }
            } catch (error) {
                dispatch("notificationAction", {
                    type: "error",
                    message:
                        "There was a problem posting the new article. Please try again later.",
                });
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
