<template>
    <div>
        <div class="is-flex is-justify-content-center">
            <button class="button is-info is-light m-4" @click="showModal">
                Create article
            </button>
        </div>
        <Pagination
            :currentPage="currentPage"
            :pageSize="pageSize"
            :totalArticlesNumber="totalArticlesNumber"
            :updatePage="updatePage"
            @pageUpdate="pageUpdate"
        ></Pagination>
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
        <div v-else-if="allArticles && allArticles.length === 0" class="mt-6">
            <h1 class="title is-3 has-text-centered">There are no articles</h1>
        </div>
    </div>
</template>

<script>
import Article from "../components/Article.vue";
import Pagination from "../components/Pagination.vue";
import { mapGetters, mapActions } from "vuex";

export default {
    components: {
        Article,
        Pagination,
    },
    computed: {
        ...mapGetters([
            "allArticles",
            "currentPage",
            "pageSize",
            "totalArticlesNumber",
        ]),
    },
    methods: {
        ...mapActions([
            "fetchArticlesData",
            "fetchAuthorsData",
            "modalAction",
            "updatePage",
        ]),
        showModal() {
            this.modalAction({
                component: "CreateForm",
                isVisible: true,
            });
        },
        pageUpdate(pageNumber) {
            this.updatePage(pageNumber);
        },
    },
    async created() {
        await this.fetchArticlesData();
        await this.fetchAuthorsData();
    },
};
</script>
