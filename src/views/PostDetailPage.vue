<template>
    <div class="container mt-6">
        <div class="card">
            <div class="card-content">
                <div class="content">
                    <div v-if="specificArticle">
                        <div class="mb-6">
                            <h1 class="title is-3 has-text-centered">
                                More details about article
                            </h1>
                            <h2>Title: {{ specificArticle.title }}</h2>
                            <h2>Author: {{ specificArticle.author.name }}</h2>
                            <h2>Article content: {{ specificArticle.body }}</h2>
                            <h2>
                                Date:
                                {{
                                    showCreatedOrEditedDate(
                                        this.specificArticle.created_at,
                                        this.specificArticle.updated_at
                                    )
                                }}
                            </h2>
                        </div>
                        <div class="is-flex is-justify-content-center">
                            <article-delete-button
                                @click.native="showModal"
                            ></article-delete-button>
                            <button
                                class="button ml-3"
                                @click="showEditFormModal"
                            >
                                Edit article
                            </button>
                        </div>
                    </div>
                    <div v-else>
                        <h1 class="has-text-centered">
                            There is no article data
                        </h1>
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
                id: this.specificArticle.id,
                title: this.specificArticle.title,
            });
        },
        showEditFormModal() {
            this.modalAction({
                component: "EditForm",
                isVisible: true,
                id: this.specificArticle.id,
            });
        },
    },
    computed: {
        ...mapGetters(["specificArticle"]),
    },
    async created() {
        const postId = this.$route.params.id;
        await this.fetchArticleData(postId);
    },
};
</script>
