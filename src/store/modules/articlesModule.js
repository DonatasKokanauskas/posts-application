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
        currentPage: 1,
        pageSize: 3,
        totalArticlesNumber: null,
        searchInputValue: "",
    },
    mutations: {
        setArticlesData(state, data) {
            state.articlesData = data;
        },
        setArticleData(state, data) {
            state.articleData = data;
        },
        editArticle(state, editedArticle) {
            const postIndex = state.articlesData.findIndex(
                (article) => article.id === editedArticle.id
            );
            if (postIndex !== -1) {
                state.articlesData.splice(postIndex, 1, editedArticle);
            }

            state.articleData = editedArticle;
        },
        setCurrentPage(state, pageNumber) {
            state.currentPage = pageNumber;
        },
        setTotalArticlesNumber(state, total) {
            state.totalArticlesNumber = total;
        },
        setSearchInputValue(state, inputValue) {
            state.searchInputValue = inputValue;
        },
    },
    actions: {
        async fetchArticlesData({ commit, rootState, getters, dispatch }) {
            try {
                const baseURL =
                    rootState.apiURL +
                    `/posts?_expand=author&_page=${getters.currentPage}&_limit=${getters.pageSize}`;

                const data = await this.fetchData(
                    !getters.searchInputValue
                        ? baseURL
                        : `${baseURL}&q=${getters.searchInputValue}`
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
            { rootState, dispatch, getters },
            articleIdToDelete
        ) {
            try {
                await this.deleteData(
                    `${rootState.apiURL}/posts/${articleIdToDelete}`
                );

                if (
                    getters.allArticles.length - 1 === 0 &&
                    getters.currentPage > 1
                ) {
                    await dispatch("updatePage", getters.currentPage - 1);
                } else {
                    await dispatch("fetchArticlesData");
                }

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
        async postNewArticle({ rootState, dispatch }, newArticle) {
            try {
                await this.postData(`${rootState.apiURL}/posts`, newArticle);

                await dispatch("fetchArticlesData");

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
        async updatePage({ commit, dispatch }, pageNumber) {
            commit("setCurrentPage", pageNumber);
            await dispatch("fetchArticlesData");
        },
        getTotalArticlesNumber({ commit }, total) {
            commit("setTotalArticlesNumber", total);
        },
        getSearchInputValue({ commit }, inputValue) {
            commit("setSearchInputValue", inputValue);
        },
    },
    getters: {
        allArticles: (state) => state.articlesData,
        specificArticle: (state) => state.articleData,
        currentPage: (state) => state.currentPage,
        pageSize: (state) => state.pageSize,
        totalArticlesNumber: (state) => state.totalArticlesNumber,
        searchInputValue: (state) => state.searchInputValue,
    },
};

export default articlesModule;
