import Vue from "vue";
import Vuex from "vuex";
import articlesModule from "./modules/articlesModule";
import authorsModule from "./modules/authorsModule";
import modalModule from "./modules/modalModule";
import fetchPlugin from "./plugins/fetchPlugin";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        articlesModule,
        authorsModule,
        modalModule,
    },
    plugins: [fetchPlugin],
    state() {
        return {
            apiURL: "http://localhost:3000",
            errorNotificationIsVisible: null,
            successNotificationIsVisible: null,
        };
    },
    mutations: {
        setErrorNotification(state, notification) {
            state.errorNotificationIsVisible = notification;
        },
        setSuccessNotification(state, notification) {
            state.successNotificationIsVisible = notification;
        },
    },
    actions: {
        notificationAction({ commit }, notification) {
            if (notification.type === "error") {
                commit("setErrorNotification", notification);
                setTimeout(() => {
                    commit("setErrorNotification", null);
                }, 3000);
            } else {
                commit("setSuccessNotification", notification);
                setTimeout(() => {
                    commit("setSuccessNotification", null);
                }, 3000);
            }
        },
    },
    getters: {
        errorNotificationGetter(state) {
            return state.errorNotificationIsVisible;
        },
        successNotificationGetter(state) {
            return state.successNotificationIsVisible;
        },
    },
});

export default store;
