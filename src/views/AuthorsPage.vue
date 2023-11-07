<template>
    <div class="mt-4">
        <div class="is-flex is-justify-content-center">
            <button class="button is-info is-light m-4" @click="showModal">
                Create author
            </button>
        </div>
        <Pagination
            :currentPage="currentAuthorsPage"
            :pageSize="authorsPageSize"
            :totalArticlesNumber="totalAuthorsNumber"
            :updatePage="updateAuthorsPage"
            @pageUpdate="pageUpdate"
        ></Pagination>
        <div v-if="allAuthors && allAuthors.length > 0">
            <Author
                v-for="author in allAuthors"
                :key="author.id"
                :id="author.id"
                :name="author.name"
                :createdDate="author.created_at"
                :updatedDate="author.updated_at"
            ></Author>
        </div>
        <div v-else-if="allAuthors && allAuthors.length === 0" class="mt-6">
            <h1 class="title is-3 has-text-centered">There are no authors</h1>
        </div>
    </div>
</template>

<script>
import Author from "../components/Author.vue";
import Pagination from "../components/Pagination.vue";
import { mapGetters, mapActions } from "vuex";

export default {
    components: {
        Author,
        Pagination,
    },
    computed: {
        ...mapGetters([
            "allAuthors",
            "currentAuthorsPage",
            "authorsPageSize",
            "totalAuthorsNumber",
        ]),
    },
    methods: {
        ...mapActions(["fetchAuthorsData", "updateAuthorsPage", "modalAction"]),
        pageUpdate(pageNumber) {
            this.updateAuthorsPage(pageNumber);
        },
        showModal() {
            console.log("create new author");
            this.modalAction({
                component: "CreateAuthorForm",
                isVisible: true,
            });
        },
    },
    async created() {
        await this.fetchAuthorsData(true);
    },
};
</script>
