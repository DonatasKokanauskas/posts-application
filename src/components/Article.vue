<template>
    <div class="card">
        <div class="card-content">
            <div class="content">
                <div>
                    <h3>Title: {{ title }}</h3>
                    <h3>Author: {{ authorName }}</h3>
                    <h3>
                        Date:
                        {{ showCreatedOrEditedDate(createdDate, updatedDate) }}
                    </h3>
                    <button
                        @click="navigateToDetailPage"
                        class="button is-small"
                    >
                        More details
                    </button>
                </div>

                <article-delete-button
                    @click.native="showModal"
                ></article-delete-button>
            </div>
        </div>
    </div>
</template>

<script>
import dateMixin from "../mixins/dateMixin.js";
import { mapActions } from "vuex";

export default {
    props: {
        title: {
            type: String,
        },
        createdDate: {
            type: String,
        },
        updatedDate: {
            type: String,
        },
        id: {
            type: Number,
        },
        authorName: {
            type: String,
        },
    },
    mixins: [dateMixin],
    methods: {
        ...mapActions(["modalAction"]),
        navigateToDetailPage() {
            this.$router.push({ path: "/postsDetailPage/" + this.id });
        },
        showModal() {
            this.modalAction({
                component: "DeleteVerification",
                isVisible: true,
                id: this.id,
                title: this.title,
            });
        },
    },
};
</script>

<style scoped>
.card {
    width: 70vw;
    margin: 0 auto 10px auto;
}

.content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
