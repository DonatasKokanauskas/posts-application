<template>
    <div class="container">
        <div class="card">
            <div class="card-content">
                <div class="content">
                    <div v-if="articleGetter">
                        <div class="mb-6">
                            <h1>More details about article</h1>
                            <h2>Title: {{ articleGetter.title }}</h2>
                            <h2>Author: {{ articleGetter.author.name }}</h2>
                            <h2>Article content: {{ articleGetter.body }}</h2>
                            <h2>
                                Date:
                                {{
                                    showCreatedOrEditedDate(
                                        this.articleGetter.created_at,
                                        this.articleGetter.updated_at
                                    )
                                }}
                            </h2>
                        </div>

                        <article-delete-button
                            @click.native="showModal"
                        ></article-delete-button>
                    </div>
                    <div v-else>
                        <h1>There are no article data</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dateMixin from "../mixins/dateMixin.js";
import { mapGetters, mapActions } from "vuex";
export default {
    mixins: [dateMixin],
    methods: {
        ...mapActions(["fetchArticleData", "modalAction"]),
        showModal() {
            this.modalAction({
                component: "DeleteVerification",
                isVisible: true,
                id: this.articleGetter.id,
                title: this.articleGetter.title,
            });
        },
    },
    computed: {
        ...mapGetters(["articleGetter"]),
    },
    async created() {
        const postId = this.$route.params.id;
        await this.fetchArticleData(postId);
    },
};
</script>

<style>
.container {
    width: 100vw;
}
.card {
}
</style>
