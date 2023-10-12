<template>
    <li>
        <h3>Title: {{ title }}</h3>
        <h3>Author: {{ author }}</h3>
        <h3>Date: {{ articleDate }}</h3>
        <button @click="navigateToDetailPage">More details</button>
    </li>
</template>

<script>
export default {
    props: ["title", "author", "createdDate", "updatedDate", "id"],
    data() {
        return {
            articleDate: null,
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
    },
};
</script>

<style>
li {
    list-style: none;
    border: 1px solid black;
}
</style>
