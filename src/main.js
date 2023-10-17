import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/store.js";
import DeleteVerificationModal from "./components/modals/DeleteVerificationModal.vue";
import PopupNotification from "./components/PopupNotification.vue";
import ArticleDeleteButton from "./components/ArticleDeleteButton.vue";

Vue.component("DeleteVerificationModal", DeleteVerificationModal);
Vue.component("PopupNotification", PopupNotification);
Vue.component("ArticleDeleteButton", ArticleDeleteButton);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
