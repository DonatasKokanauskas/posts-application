<template>
    <div>
        <h1>Posts page</h1>
        <div v-if="articlesData">
            <Article
                v-for="article in articlesData"
                :key="article.id"
                :id="article.id"
                :title="article.title"
                :author="authorName(article.authorId)"
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
            articlesData: [],
            authorsData: [],
        };
    },
    methods: {
        authorName(authorId) {
            const name = this.authorsData.filter((author) => {
                return author.id === authorId;
            });
            return name[0].name;
        },
    },
    created() {
        this.$store.dispatch("fetchAuthorsData").then(() => {
            this.authorsData = this.$store.getters.authorsGetter;
        });
        this.$store.dispatch("fetchArticlesData").then(() => {
            this.articlesData = this.$store.getters.articlesGetter;
        });
    },
};
</script>
