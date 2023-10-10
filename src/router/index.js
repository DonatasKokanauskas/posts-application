import Vue from "vue";
import VueRouter from "vue-router";
import PostsPage from "../views/PostsPage.vue";
import PostsDetailPage from "../views/PostDetailPage.vue";
import Page404 from "../components/Page404.vue";

Vue.use(VueRouter);

const routes = [
    { path: "/", component: PostsPage },
    { path: "/postsDetailPage/:id", component: PostsDetailPage },
    { path: "*", component: Page404 },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
