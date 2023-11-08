const authorsModule = {
    state: {
        authorsData: null,
        totalAuthorsNumber: null,
        currentAuthorsPage: 1,
        authorsPageSize: 3,
        authorSearchInputValue: "",
    },
    mutations: {
        setAuthorsData(state, data) {
            state.authorsData = data;
        },
        setTotalAuthorsNumber(state, total) {
            state.totalAuthorsNumber = total;
        },
        setCurrentAuthorsPage(state, pageNumber) {
            state.currentAuthorsPage = pageNumber;
        },
        setEditedAuthorData(state, editedAuthor) {
            const postIndex = state.authorsData.findIndex(
                (author) => author.id === editedAuthor.id
            );
            if (postIndex !== -1) {
                state.authorsData.splice(postIndex, 1, editedAuthor);
            }
        },
        setAuthorSearchInputValue(state, inputValue) {
            state.authorSearchInputValue = inputValue;
        },
    },
    actions: {
        async fetchAuthorsData(
            { commit, rootState, dispatch, getters },
            authorsPage
        ) {
            try {
                const baseURL = rootState.apiURL + "/authors";

                const url = () => {
                    if (!authorsPage) {
                        return baseURL;
                    } else if (authorsPage && getters.authorSearchInputValue) {
                        return `${baseURL}?_page=${getters.currentAuthorsPage}&_limit=${getters.authorsPageSize}&q=${getters.authorSearchInputValue}`;
                    } else {
                        return `${baseURL}?_page=${getters.currentAuthorsPage}&_limit=${getters.authorsPageSize}`;
                    }
                };

                const response = await this.fetchData(url());

                dispatch(
                    "getTotalAuthorsNumber",
                    parseInt(response.headers.get("X-Total-Count"))
                );

                commit("setAuthorsData", response.data);
            } catch (error) {
                const errorNotification = {
                    type: "error",
                    message:
                        "There was a problem getting the data. Please try again later.",
                    isVisible: true,
                };
                dispatch("notificationAction", errorNotification);
                console.log(`There was an error", ${error.message}.`);
            }
        },
        getTotalAuthorsNumber({ commit }, total) {
            commit("setTotalAuthorsNumber", total);
        },
        async updateAuthorsPage({ commit, dispatch }, pageNumber) {
            commit("setCurrentAuthorsPage", pageNumber);
            await dispatch("fetchAuthorsData", true);
        },
        async postNewAuthor({ rootState, dispatch }, newAuthor) {
            try {
                await this.postData(`${rootState.apiURL}/authors`, newAuthor);

                await dispatch("fetchAuthorsData", true);

                dispatch("notificationAction", {
                    type: "success",
                    message: "You have successfully created the new author",
                    isVisible: true,
                });
            } catch (error) {
                console.log(`There was an error", ${error.message}.`);
                dispatch("notificationAction", {
                    type: "error",
                    message:
                        "There was a problem posting the new author. Please try again later.",
                    isVisible: true,
                });
            }
        },
        async deleteAuthorAction(
            { rootState, dispatch, getters },
            authorIdToDelete
        ) {
            try {
                await this.deleteData(
                    `${rootState.apiURL}/authors/${authorIdToDelete}`
                );

                if (
                    getters.allAuthors.length - 1 === 0 &&
                    getters.currentAuthorsPage > 1
                ) {
                    await dispatch(
                        "updateAuthorsPage",
                        getters.currentAuthorsPage - 1
                    );
                } else {
                    await dispatch("fetchAuthorsData", true);
                }

                dispatch("notificationAction", {
                    type: "success",
                    message: "You have successfully deleted the author.",
                    isVisible: true,
                });
            } catch (error) {
                console.log(`There was an error", ${error.message}.`);
                dispatch("notificationAction", {
                    type: "error",
                    message:
                        "There was a problem deleting the author. Please try again later.",
                    isVisible: true,
                });
            }
        },
        async editAuthor(
            { rootState, getters, dispatch, commit },
            editedAuthor
        ) {
            try {
                await this.editData(
                    `${rootState.apiURL}/authors/${getters.modalDataGetter.id}`,
                    editedAuthor
                );

                commit("setEditedAuthorData", editedAuthor);

                dispatch("notificationAction", {
                    type: "success",
                    message: "You have successfully edited the author",
                    isVisible: true,
                });
            } catch (error) {
                console.log(`There was an error: ${error.message}.`);
                dispatch("notificationAction", {
                    type: "error",
                    message:
                        "There was a problem editing the author. Please try again later.",
                    isVisible: true,
                });
            }
        },
        getAuthorSearchInputValue({ commit }, inputValue) {
            commit("setAuthorSearchInputValue", inputValue);
        },
    },
    getters: {
        allAuthors: (state) => state.authorsData,
        totalAuthorsNumber: (state) => state.totalAuthorsNumber,
        currentAuthorsPage: (state) => state.currentAuthorsPage,
        authorsPageSize: (state) => state.authorsPageSize,
        authorSearchInputValue: (state) => state.authorSearchInputValue,
    },
};

export default authorsModule;
