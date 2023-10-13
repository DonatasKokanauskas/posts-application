<template>
    <div v-if="articleData">
        <h1>More details about article</h1>
        <h2>Title: {{ articleData[0].title }}</h2>
        <h2>Author: {{ authorName }}</h2>
        <h2>Article content: {{ articleData[0].body }}</h2>
        <h2>Date: {{ articleDate }}</h2>
        <notification-modal
            v-if="isModalVisible"
            @closeModal="isModalVisible = false"
        >
            <template #message
                >Are you sure that you want to delete "{{
                    articleData[0].title
                }}" article?</template
            >
            <template #buttonForArticleDelete>
                <article-delete-button
                    @click.native="deleteArticle(articleData[0].id)"
                ></article-delete-button>
            </template>
        </notification-modal>
        <article-delete-button
            @click.native="isModalVisible = true"
        ></article-delete-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            articleData: null,
            articleDate: null,
            authorsData: [],
            authorName: "",
            isModalVisible: false,
        };
    },
    methods: {
        displayDate() {
            const dateObject = {
                created: this.articleData[0].created_at,
                updated: this.articleData[0].updated_at,
            };
            this.$store.dispatch("showCreatedOrEditedDate", dateObject);
            this.articleDate = this.$store.getters.articleDateGetter;
        },
        deleteArticle(id) {
            this.$store.dispatch("deleteArticleAction", id);
            this.$router.push({ path: "/" });
        },
    },
    created() {
        this.$store.dispatch("fetchArticlesData").then(() => {
            const postId = this.$route.params.id;
            this.articleData = this.$store.getters.articlesGetter.filter(
                (article) => {
                    return article.id == postId;
                }
            );

            this.displayDate();

            this.$store.dispatch("fetchAuthorsData").then(() => {
                this.authorsData = this.$store.getters.authorsGetter;
                this.$store
                    .dispatch("authorName", this.articleData[0].authorId)
                    .then(() => {
                        this.authorName = this.$store.getters.authorNameGetter;
                    });
            });
        });
    },
};
</script>
