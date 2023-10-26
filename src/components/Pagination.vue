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
                    :class="{ 'is-current': currentPage === index }"
                    @click="goToLink"
                    :value="index"
                    >{{ index }}</a
                >
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: {
        currentPage: {
            type: Number,
        },
        pageSize: {
            type: Number,
        },
        totalArticlesNumber: {
            type: Number,
        },
    },

    methods: {
        pageUpdate(pageNumber) {
            if (pageNumber > this.totalPages()) {
                return;
            }
            if (pageNumber === 0) {
                return;
            }
            this.$emit("pageUpdate", pageNumber);
        },
        totalPages() {
            return Math.ceil(this.totalArticlesNumber / this.pageSize);
        },
        disablePreviousLink() {
            return this.currentPage === 1 ? true : false;
        },
        disableNextLink() {
            return this.currentPage === this.totalPages() ? true : false;
        },
        goToLink(event) {
            this.$emit(
                "pageUpdate",
                parseInt(event.target.getAttribute("value"))
            );
        },
    },
};
</script>
