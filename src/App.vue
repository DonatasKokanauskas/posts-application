<template>
    <div id="app">
        <router-link to="/"><button type="button">Home</button></router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    components: {},
    methods: {},
};
</script>

<style>
body {
    font-family: sans-serif;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
a {
    text-decoration: none;
}
button {
    cursor: pointer;
}
</style>
