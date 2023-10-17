<template>
    <div id="app">
        <router-link to="/"><button type="button">Home</button></router-link>
        <router-view></router-view>
        <popup-notification
            v-if="showErrorNotification"
            :class="showErrorNotification.type"
            >{{ showErrorNotification.message }}</popup-notification
        >
        <popup-notification
            v-if="showSuccessNotification"
            :class="showSuccessNotification.type"
            >{{ showSuccessNotification.message }}</popup-notification
        >
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    components: {},
    methods: {},
    computed: {
        showErrorNotification() {
            return this.$store.getters.errorNotificationGetter;
        },
        showSuccessNotification() {
            return this.$store.getters.successNotificationGetter;
        },
    },
};
</script>

<style>
body {
    font-family: sans-serif;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    width: 50vw;
    margin: 20px auto;
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
