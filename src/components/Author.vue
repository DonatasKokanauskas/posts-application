<template>
    <div class="card mb-2">
        <div class="card-content">
            <div
                class="content is-flex is-align-items-center is-justify-content-space-between"
            >
                <div>
                    <h3>Author: {{ name }}</h3>
                </div>

                <div class="is-flex">
                    <button class="button mr-3" @click="showEditFormModal">
                        Edit article
                    </button>
                    <button class="button is-danger" @click="showModal">
                        Delete author
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    props: {
        name: {
            type: String,
        },
        createdDate: {
            type: String,
        },
        id: {
            type: Number,
        },
    },
    methods: {
        ...mapActions(["modalAction"]),
        showModal() {
            this.modalAction({
                component: "DeleteVerification",
                isVisible: true,
                id: this.id,
                title: this.name,
                target: "author",
            });
        },
        showEditFormModal() {
            this.modalAction({
                component: "EditAuthorForm",
                isVisible: true,
                id: this.id,
                name: this.name,
                created_at: this.createdDate,
            });
        },
    },
};
</script>
