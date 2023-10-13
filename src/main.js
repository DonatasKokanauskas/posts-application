import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/store.js";
import NotificationModal from "./components/modals/NotificationModal.vue";
import ArticleDeleteButton from "./components/ArticleDeleteButton.vue";

Vue.component("NotificationModal", NotificationModal);
Vue.component("ArticleDeleteButton", ArticleDeleteButton);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
