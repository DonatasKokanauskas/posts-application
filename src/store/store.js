import Vue from "vue";
import Vuex from "vuex";
import articlesModule from "./modules/articlesModule";
import authorsModule from "./modules/authorsModule";
import modalModule from "./modules/modalModule";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        articlesModule,
        authorsModule,
        modalModule,
    },
});

export default store;
