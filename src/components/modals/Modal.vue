<template>
    <div v-if="modalDataGetter.isVisible" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="notification">
                <component
                    v-if="modalDataGetter.isVisible"
                    :is="modalDataGetter.component"
                ></component>
            </div>
        </div>
        <button
            @click="closeModal"
            class="modal-close button"
            aria-label="close"
        ></button>
    </div>
</template>

<script>
import DeleteVerification from "../DeleteVerification.vue";
import { mapGetters, mapActions } from "vuex";

export default {
    components: {
        DeleteVerification: DeleteVerification,
    },
    computed: {
        ...mapGetters(["modalDataGetter"]),
    },
    methods: {
        ...mapActions(["closeModalAction"]),
        closeModal() {
            this.closeModalAction();
        },
    },
};
</script>

<style scoped>
@import "bulma/css/bulma.min.css";
.notification {
    height: 350px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
