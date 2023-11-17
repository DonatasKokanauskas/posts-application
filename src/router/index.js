import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import PostsPage from "../views/PostsPage.vue";
import PostsDetailPage from "../views/PostDetailPage.vue";
import Page404 from "../views/Page404.vue";
import AuthorsPage from "../views/AuthorsPage.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Home,
        alias: "/posts",
        children: [
            { path: "", component: PostsPage },
            { path: "authors", component: AuthorsPage },
            {
                path: "/postsDetailPage/:id",
                component: PostsDetailPage,
            },
        ],
    },

    { path: "*", component: Page404 },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
