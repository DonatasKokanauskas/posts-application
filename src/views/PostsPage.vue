<template>
    <div>
        <h1>Posts page</h1>
        <div v-if="articlesData.length > 0">
            <Article
                v-for="article in articlesData"
                :key="article.id"
                :id="article.id"
                :title="article.title"
                :authorId="article.authorId"
                :createdDate="article.created_at"
                :updatedDate="article.updated_at"
                :articles="articlesData"
                @updateArticlesList="updateArticlesList"
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
            articlesData: [],
            authorsData: [],
        };
    },
    methods: {
        updateArticlesList() {
            this.$store.dispatch("fetchArticlesData").then(() => {
                this.articlesData = this.$store.getters.articlesGetter;
                // !!!
            });
        },
    },
    created() {
        this.$store.dispatch("fetchAuthorsData").then(() => {
            this.authorsData = this.$store.getters.authorsGetter;

            this.$store.dispatch("fetchArticlesData").then(() => {
                this.articlesData = this.$store.getters.articlesGetter;
                // !!!
            });
        });
    },
};
</script>
