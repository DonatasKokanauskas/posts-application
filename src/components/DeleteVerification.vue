<template>
    <div
        class="container is-flex is-align-items-center is-justify-content-center"
    >
        <h1 class="title is-4 mb-6 mr-3 ml-5 has-text-centered">
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
        ...mapActions(["deleteArticleAction", "closeModalAction"]),
        async deleteArticle() {
            await this.deleteArticleAction(this.modalDataGetter.id);

            if (this.$router.currentRoute.fullPath !== "/") {
                this.$router.push({ path: "/" });
            }

            this.closeModalAction();
        },
    },
};
</script>

<style scoped>
@import "bulma/css/bulma.min.css";
.container {
    flex-direction: column;
}
.notification h1 {
    margin: 40px 0;
}
</style>
