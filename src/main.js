import Vue from "vue";
import vueDebounce from "vue-debounce";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/store.js";
import ArticleDeleteButton from "./components/ArticleDeleteButton.vue";

Vue.use(vueDebounce);

Vue.component("ArticleDeleteButton", ArticleDeleteButton);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
