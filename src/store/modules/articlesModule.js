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
    state: {
        articlesData: [],
        articleData: null,
    },
    mutations: {
        setArticlesData(state, data) {
            state.articlesData = data;
        },
        setArticleData(state, data) {
            state.articleData = data;
        },
        pushNewArticle(state, newArticle) {
            state.articlesData.push(newArticle);
        },
        filterArticles(state, articleIdToDelete) {
            state.articlesData = state.articlesData.filter(
                (article) => article.id !== articleIdToDelete
            );
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
        async deleteArticleAction(
            { rootState, dispatch, commit },
            articleIdToDelete
        ) {
            try {
                await this.deleteData(
                    `${rootState.apiURL}/posts/${articleIdToDelete}`
                );

                commit("filterArticles", articleIdToDelete);

                dispatch("notificationAction", {
                    type: "success",
                    message: "You have successfully deleted the article",
                });
            } catch (error) {
                console.log(`There was an error", ${error.message}.`);
                dispatch("notificationAction", {
                    type: "error",
                    message:
                        "There was a problem deleting the article. Please try again later.",
                });
            }
        },
        async postNewArticle({ rootState, dispatch, commit }, newArticle) {
            try {
                await this.postData(`${rootState.apiURL}/posts`, newArticle);
                commit("pushNewArticle", newArticle);

                dispatch("notificationAction", {
                    type: "success",
                    message: "You have successfully created the new article",
                });
            } catch (error) {
                console.log(`There was an error", ${error.message}.`);
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
        specificArticle: (state) => state.articleData,
    },
};

export default articlesModule;
