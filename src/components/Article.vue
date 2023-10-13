<template>
    <li>
        <div>
            <h3>Title: {{ title }}</h3>
            <h3>Author: {{ authorName }}</h3>
            <h3>Date: {{ articleDate }}</h3>
            <button @click="navigateToDetailPage">More details</button>
        </div>
        <notification-modal
            v-if="isModalVisible"
            @closeModal="isModalVisible = false"
        >
            <template #message
                >Are you sure that you want to delete "{{ title }}"
                article?</template
            >
            <template #buttonForArticleDelete>
                <article-delete-button
                    @click.native="deleteArticle(id)"
                ></article-delete-button>
            </template>
        </notification-modal>
        <article-delete-button
            @click.native="isModalVisible = true"
        ></article-delete-button>
    </li>
</template>

<script>
export default {
    props: [
        "title",
        "authorId",
        "createdDate",
        "updatedDate",
        "id",
        "articles",
    ],
    data() {
        return {
            articleDate: null,
            authorName: "",
            isModalVisible: false,
        };
    },
    methods: {
        navigateToDetailPage() {
            this.$router.push({ path: "/postsDetailPage/" + this.id });
        },
        deleteArticle(id) {
            this.$store.dispatch("deleteArticleAction", id);
            this.$emit("updateArticlesList");
            this.isModalVisible = false;
        },
    },
    created() {
        const dateObject = {
            created: this.createdDate,
            updated: this.updatedDate,
        };

        this.$store.dispatch("showCreatedOrEditedDate", dateObject);
        this.articleDate = this.$store.getters.articleDateGetter;

        this.$store.dispatch("authorName", this.authorId);
        this.authorName = this.$store.getters.authorNameGetter;
    },
};
</script>

<style>
li {
    list-style: none;
    border: 1px solid black;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px 100px 10px 100px;
    margin-bottom: 10px;
}
</style>
