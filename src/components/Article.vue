<template>
    <li>
        <h3>Title: {{ title }}</h3>
        <h3>Author: {{ authorName }}</h3>
        <h3>Date: {{ articleDate }}</h3>
        <button @click="navigateToDetailPage">More details</button>
    </li>
</template>

<script>
export default {
    props: ["title", "authorId", "createdDate", "updatedDate", "id"],
    data() {
        return {
            articleDate: null,
            authorName: "",
        };
    },
    methods: {
        navigateToDetailPage() {
            this.$router.push({ path: "/postsDetailPage/" + this.id });
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
}
</style>
