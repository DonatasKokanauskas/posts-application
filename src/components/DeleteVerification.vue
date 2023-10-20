<template>
    <div class="container">
        <h1 class="title is-4 mb-6 mr-3 ml-5">
            Are you sure that you want to delete "{{ modalDataGetter.title }}"
            article?
        </h1>
        <article-delete-button
            @click.native="deleteArticle()"
        ></article-delete-button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    computed: {
        ...mapGetters(["modalDataGetter"]),
    },
    methods: {
        ...mapActions([
            "deleteArticleAction",
            "fetchArticlesData",
            "closeModalAction",
            "notificationAction",
        ]),
        deleteArticle() {
            this.deleteArticleAction(this.modalDataGetter.id);
            this.fetchArticlesData();

            if (this.$router.currentRoute.fullPath !== "/") {
                this.$router.push({ path: "/" });
            }

            const successNotification = {
                type: "success",
                message: "You have successfully deleted the article",
            };
            this.notificationAction(successNotification);

            this.closeModalAction();
        },
    },
};
</script>

<style scoped>
@import "bulma/css/bulma.min.css";
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.notification h1 {
    margin: 40px 0;
}
</style>
