import Vue from "vue";
import store from "../store/store";
import VueRouter from "vue-router";
import PostsPage from "../views/PostsPage.vue";
import PostsDetailPage from "../views/PostDetailPage.vue";
import Page404 from "../views/Page404.vue";

Vue.use(VueRouter);

const redirectToPage404 = (to, from, next) => {
    if (store.getters.allArticles) {
        next();
    } else {
        next({ path: "*" });
    }
};

const routes = [
    { path: "/", component: PostsPage },
    {
        path: "/postsDetailPage/:id",
        component: PostsDetailPage,
        beforeEnter: redirectToPage404,
    },
    { path: "*", component: Page404 },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
