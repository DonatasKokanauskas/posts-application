const showFetchErrorNotification = (dispatch) => {
    const errorNotification = {
        type: "error",
        message:
            "There was a problem getting the data. Please try again later.",
        isVisible: true,
    };
    dispatch("notificationAction", errorNotification);
};

const articlesModule = {
    state: {
        articlesData: [],
        articleData: null,
        currentPage: 0,
        pageSize: 3,
        visibleArticles: [],
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
        editArticle(state, editedArticle) {
            const postIndex = state.articlesData.findIndex(
                (article) => article.id === editedArticle.id
            );
            if (postIndex !== -1) {
                state.articlesData.splice(postIndex, 1, editedArticle);
            }
        },
        setCurrentPage(state, pageNumber) {
            state.currentPage = pageNumber;
        },
        setVisibleArticles(state, visibleArticles) {
            state.visibleArticles = visibleArticles;
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
                dispatch("updateVisibleArticles");

                dispatch("notificationAction", {
                    type: "success",
                    message: "You have successfully deleted the article",
                    isVisible: true,
                });
            } catch (error) {
                console.log(`There was an error", ${error.message}.`);
                dispatch("notificationAction", {
                    type: "error",
                    message:
                        "There was a problem deleting the article. Please try again later.",
                    isVisible: true,
                });
            }
        },
        async postNewArticle({ rootState, dispatch, commit }, newArticle) {
            try {
                await this.postData(`${rootState.apiURL}/posts`, newArticle);

                commit("pushNewArticle", newArticle);
                dispatch("updateVisibleArticles");

                dispatch("notificationAction", {
                    type: "success",
                    message: "You have successfully created the new article",
                    isVisible: true,
                });
            } catch (error) {
                console.log(`There was an error", ${error.message}.`);
                dispatch("notificationAction", {
                    type: "error",
                    message:
                        "There was a problem posting the new article. Please try again later.",
                    isVisible: true,
                });
            }
        },
        async editArticle(
            { rootState, getters, dispatch, commit },
            editedArticle
        ) {
            try {
                await this.editData(
                    `${rootState.apiURL}/posts/${getters.modalDataGetter.id}`,
                    editedArticle
                );

                commit("editArticle", editedArticle);
                dispatch("updateVisibleArticles");

                dispatch("notificationAction", {
                    type: "success",
                    message: "You have successfully edited the article",
                    isVisible: true,
                });
            } catch (error) {
                console.log(`There was an error", ${error.message}.`);
                dispatch("notificationAction", {
                    type: "error",
                    message:
                        "There was a problem editing the article. Please try again later.",
                    isVisible: true,
                });
            }
        },
        updatePage({ commit, dispatch }, pageNumber) {
            commit("setCurrentPage", pageNumber);
            dispatch("updateVisibleArticles");
        },
        updateVisibleArticles({ commit, getters, dispatch }) {
            const visibleArticles = getters.allArticles.slice(
                getters.currentPage * getters.pageSize,
                getters.currentPage * getters.pageSize + getters.pageSize
            );
            commit("setVisibleArticles", visibleArticles);

            if (
                getters.visibleArticles.length === 0 &&
                getters.currentPage > 0
            ) {
                dispatch("updatePage", getters.currentPage - 1);
            }
        },
    },
    getters: {
        allArticles: (state) => state.articlesData,
        specificArticle: (state) => state.articleData,
        visibleArticles: (state) => state.visibleArticles,
        currentPage: (state) => state.currentPage,
        pageSize: (state) => state.pageSize,
    },
};

export default articlesModule;
