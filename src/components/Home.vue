<template>
    <div>
        <Navbar></Navbar>
        <App></App>
        <popup-notification
            v-if="notificationGetter.isVisible"
            :class="notificationGetter.type"
            >{{ notificationGetter.message }}</popup-notification
        >

        <Modal></Modal>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import App from "../App.vue";
import Navbar from "./Navbar.vue";
import Modal from "./modals/Modal.vue";
import PopupNotification from "./PopupNotification.vue";
export default {
    components: {
        App,
        Navbar,
        Modal,
        PopupNotification,
    },
    computed: {
        ...mapGetters(["notificationGetter"]),
    },
};
</script>
