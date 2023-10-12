<template>
    <div v-if="articleData">
        <h1>More details about article</h1>
        <h2>Title: {{ articleData[0].title }}</h2>
        <h2>Author: {{ authorName(articleData[0].authorId) }}</h2>
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
            authorsData: null,
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
            console.log(this.articleDate);
        },
        authorName(authorId) {
            const name = this.authorsData.filter((author) => {
                return author.id === authorId;
            });
            return name[0].name;
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
            console.log(postId);
            console.log(this.articleData[0]);

            this.displayDate();
        });

        this.$store.dispatch("fetchAuthorsData").then(() => {
            this.authorsData = this.$store.getters.authorsGetter;
        });
    },
};
</script>
