import Vue from "vue";
import VueRouter from "vue-router";
import PostsPage from "../views/PostsPage.vue";
import PostsDetailPage from "../views/PostDetailPage.vue";

Vue.use(VueRouter);

const routes = [
    { path: "/", component: PostsPage },
    { path: "/postsDetailPage", component: PostsDetailPage },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
