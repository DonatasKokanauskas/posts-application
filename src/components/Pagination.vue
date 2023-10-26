<template>
    <nav class="pagination" role="navigation" aria-label="pagination">
        <a
            class="pagination-previous"
            @click="pageUpdate(currentPage - 1)"
            :disabled="disablePreviousLink()"
            >Previous</a
        >
        <a
            class="pagination-next"
            @click="pageUpdate(currentPage + 1)"
            :disabled="disableNextLink()"
            >Next page</a
        >
        <ul class="pagination-list">
            <li v-for="index in totalPages()">
                <a
                    class="pagination-link"
                    :class="{ 'is-current': currentPage + 1 === index }"
                    @click="goToLink"
                    :value="index"
                    >{{ index }}</a
                >
            </li>
        </ul>
    </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    computed: {
        ...mapGetters(["allArticles", "currentPage", "pageSize"]),
    },
    methods: {
        ...mapActions(["updatePage"]),
        pageUpdate(pageNumber) {
            if (pageNumber > this.totalPages() - 1) {
                return;
            }
            if (pageNumber === -1) {
                return;
            }
            this.updatePage(pageNumber);
        },
        totalPages() {
            return Math.ceil(this.allArticles.length / this.pageSize);
        },
        disablePreviousLink() {
            return this.currentPage === 0 ? true : false;
        },
        disableNextLink() {
            return this.currentPage === this.totalPages() - 1 ? true : false;
        },
        goToLink(event) {
            this.updatePage(event.target.getAttribute("value") - 1);
        },
    },
};
</script>
