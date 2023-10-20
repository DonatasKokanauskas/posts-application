<template>
    <div>
        <div v-if="allArticles && allArticles.length > 0">
            <Article
                v-for="article in allArticles"
                :key="article.id"
                :id="article.id"
                :title="article.title"
                :authorId="article.authorId"
                :createdDate="article.created_at"
                :updatedDate="article.updated_at"
                :authorName="article.author.name"
            ></Article>
        </div>
        <div v-else class="mt-6">
            <h1 class="title is-3 has-text-centered">There are no articles</h1>
        </div>
    </div>
</template>

<script>
import Article from "../components/Article.vue";
import { mapGetters, mapActions } from "vuex";

export default {
    components: {
        Article,
    },
    computed: {
        ...mapGetters(["allArticles"]),
    },
    methods: {
        ...mapActions(["fetchArticlesData"]),
    },
    async created() {
        await this.fetchArticlesData();
    },
};
</script>
