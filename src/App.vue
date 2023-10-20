<template>
    <div id="app">
        <router-link to="/"
            ><button type="button" class="button m-4 mb-6">
                Home
            </button></router-link
        >
        <router-view></router-view>

        <popup-notification
            v-if="notificationGetter.type"
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
        PopupNotification,
        Modal,
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
    width: 50vw;
    margin: 20px auto;
    width: 100vw;
}
a {
    text-decoration: none;
}
button {
    cursor: pointer;
}
.success {
    background-color: green;
}
.error {
    background-color: rgb(184, 0, 0);
}
</style>
