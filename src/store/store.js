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
});

export default store;
