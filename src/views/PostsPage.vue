<template>
    <div>
        <h1>Posts page</h1>
        <Article
            v-for="article in articlesData"
            :key="article.id"
            :title="article.title"
            :author="authorName(article.authorId)"
            :createdDate="article.created_at"
            :updatedDate="article.updated_at"
        ></Article>
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
            this.authorsData = this.$store.state.authorsModule.authorsData;
        });
        this.$store.dispatch("fetchArticlesData").then(() => {
            this.articlesData = this.$store.state.articlesModule.articlesData;
        });
    },
};
</script>
