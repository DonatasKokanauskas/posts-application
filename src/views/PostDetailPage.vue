<template>
    <div v-if="articleData">
        <h1>More details about article</h1>
        <h2>Title: {{ articleData[0].title }}</h2>
        <h2>Author: {{ authorName }}</h2>
        <h2>Article content: {{ articleData[0].body }}</h2>
        <h2>Date: {{ articleDate }}</h2>
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
