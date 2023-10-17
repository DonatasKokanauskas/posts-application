<template>
    <div>
        <h1>Posts page</h1>
        <div v-if="articlesData !== null && articlesData.length > 0">
            <Article
                v-for="article in articlesData"
                :key="article.id"
                :id="article.id"
                :title="article.title"
                :authorId="article.authorId"
                :createdDate="article.created_at"
                :updatedDate="article.updated_at"
            ></Article>
        </div>
        <div v-else>
            <h1>There are no articles</h1>
        </div>
    </div>
</template>

<script>
import Article from "../components/Article.vue";

export default {
    components: {
        Article,
    },
    data() {
        return {
            authorsData: [],
        };
    },
    methods: {},
    computed: {
        articlesData() {
            return this.$store.getters.articlesGetter;
        },
        // showNotification() {
        //     return this.$store.getters.notificationGetter;
        // },
    },
    created() {
        this.$store.dispatch("fetchAuthorsData").then(() => {
            this.authorsData = this.$store.getters.authorsGetter;

            this.$store.dispatch("fetchArticlesData").then(() => {
                if (!this.articlesData) {
                    const errorNotification = {
                        type: "error",
                        message:
                            "There was a problem getting the data. Please try again later.",
                    };
                    this.$store.dispatch(
                        "notificationAction",
                        errorNotification
                    );
                }
            });
        });
    },
};
</script>
