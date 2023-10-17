<template>
    <li>
        <div>
            <h3>Title: {{ title }}</h3>
            <h3>Author: {{ authorName }}</h3>
            <h3>Date: {{ articleDate }}</h3>
            <button @click="navigateToDetailPage">More details</button>
        </div>
        <delete-verification-modal
            v-if="isModalVisible"
            @closeModal="isModalVisible = false"
            :id="id"
            >{{ title }}
        </delete-verification-modal>
        <article-delete-button
            @click.native="isModalVisible = true"
        ></article-delete-button>
    </li>
</template>

<script>
export default {
    props: ["title", "authorId", "createdDate", "updatedDate", "id"],
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
    },
    computed: {},
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
