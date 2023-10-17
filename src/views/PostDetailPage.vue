<template>
    <div>
        <div v-if="articleData">
            <h1>More details about article</h1>
            <h2>Title: {{ articleData[0].title }}</h2>
            <h2>Author: {{ authorName }}</h2>
            <h2>Article content: {{ articleData[0].body }}</h2>
            <h2>Date: {{ articleDate }}</h2>
            <article-delete-button
                @click.native="isModalVisible = true"
            ></article-delete-button>
            <delete-verification-modal
                v-if="isModalVisible"
                @closeModal="isModalVisible = false"
                :id="articleData[0].id"
                >{{ articleData[0].title }}</delete-verification-modal
            >
        </div>
        <div v-else>
            <h1>There are no article data</h1>
            <popup-notification v-if="showNotification" class="error"
                >There was a problem getting the data. Please try again
                later.</popup-notification
            >
        </div>
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
    },
    computed: {
        showNotification() {
            return this.$store.getters.notificationGetter;
        },
    },
    created() {
        this.$store.dispatch("fetchArticlesData").then(() => {
            const postId = this.$route.params.id;
            if (!this.$store.getters.articlesGetter) {
                this.$store.dispatch("notificationAction");
            }
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
