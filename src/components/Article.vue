<template>
    <div class="card mb-2">
        <div class="card-content">
            <div
                class="content is-flex is-align-items-center is-justify-content-space-between"
            >
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

                <div class="is-flex is-flex-direction-column">
                    <button class="button is-danger" @click="showModal">
                        Delete article
                    </button>
                    <button class="button mt-2" @click="showEditFormModal">
                        Edit article
                    </button>
                </div>
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
                target: "article",
            });
        },
        showEditFormModal() {
            this.modalAction({
                component: "EditForm",
                isVisible: true,
                id: this.id,
            });
        },
    },
};
</script>
