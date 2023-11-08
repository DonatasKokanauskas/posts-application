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
            <li v-for="(page, index) in pages" :key="page + '-' + index">
                <a
                    class="pagination-link"
                    :class="{ 'is-current': currentPage === page }"
                    @click="goToLink"
                    :value="page"
                    >{{ page }}</a
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
    computed: {
        totalPages() {
            return Math.ceil(this.totalArticlesNumber / this.pageSize);
        },
        pages() {
            const startPage = Math.max(1, this.currentPage - 2);
            const endPage = Math.min(this.totalPages, this.currentPage + 2);

            let pagesArray = [];

            if (startPage > 1) {
                pagesArray.push(1);
                if (startPage > 2) {
                    pagesArray.push("...");
                }
            }

            for (let page = startPage; page <= endPage; page++) {
                pagesArray.push(page);
            }

            if (endPage < this.totalPages) {
                if (endPage < this.totalPages - 1) {
                    pagesArray.push("...");
                }
                pagesArray.push(this.totalPages);
            }

            return pagesArray;
        },
    },
    methods: {
        pageUpdate(pageNumber) {
            if (pageNumber > this.totalPages) {
                return;
            }
            if (pageNumber === 0) {
                return;
            }
            this.$emit("pageUpdate", pageNumber);
        },
        disablePreviousLink() {
            if (this.totalArticlesNumber === 0 || !this.totalArticlesNumber) {
                return true;
            }
            if (this.currentPage === 1) {
                return true;
            }
        },
        disableNextLink() {
            if (this.totalArticlesNumber === 0 || !this.totalArticlesNumber) {
                return true;
            }
            if (this.currentPage === this.totalPages) {
                return true;
            }
        },
        goToLink(event) {
            if (event.target.getAttribute("value") === "...") return;
            this.$emit(
                "pageUpdate",
                parseInt(event.target.getAttribute("value"))
            );
        },
    },
};
</script>
