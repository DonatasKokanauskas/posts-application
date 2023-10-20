<template>
    <div class="notification">
        <h3 class="title is-5"><slot></slot></h3>
    </div>
</template>

<style scoped>
.notification {
    width: 60vw;
    max-width: 700px;
    height: 7vh;
    max-height: 60px;
    position: fixed;
    bottom: 30px;
    left: 25vw;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 5px;
}
</style>
