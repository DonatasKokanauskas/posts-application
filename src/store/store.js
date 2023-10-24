import Vue from "vue";
import Vuex from "vuex";
import articlesModule from "./modules/articlesModule";
import authorsModule from "./modules/authorsModule";
import modalModule from "./modules/modalModule";
import apiRequestsPlugin from "./plugins/fetchPlugin";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        articlesModule,
        authorsModule,
        modalModule,
    },
    plugins: [apiRequestsPlugin],
    state: {
        apiURL: SERVER_ADDR,
        notificationData: {
            type: null,
            message: "",
            isVisible: false,
        },
    },
    mutations: {
        setNotification(state, notification) {
            state.notificationData = notification;
        },
    },
    actions: {
        notificationAction({ commit }, notification) {
            commit("setNotification", notification);
            setTimeout(() => {
                commit("setNotification", {
                    type: null,
                    message: "",
                    isVisible: false,
                });
            }, 3000);
        },
    },
    getters: {
        notificationGetter(state) {
            return state.notificationData;
        },
    },
});

export default store;
