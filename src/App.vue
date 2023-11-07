<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

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
