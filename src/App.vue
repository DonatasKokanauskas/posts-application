<template>
    <div id="app">
        <router-view></router-view>

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
import PopupNotification from "./components/PopupNotification.vue";
import Modal from "./components/modals/Modal.vue";

export default {
    components: {
        Modal,
        PopupNotification,
    },
    computed: {
        ...mapGetters(["notificationGetter"]),
    },
};
</script>

<style>
@import "bulma/css/bulma.min.css";
body {
    font-family: sans-serif;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
#app {
    width: 70vw;
    margin: 0 auto;
}
.success {
    background-color: green;
}
.error {
    background-color: rgb(184, 0, 0);
}
</style>
