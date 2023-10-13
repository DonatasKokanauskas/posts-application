<template>
    <div class="notification">
        <div class="notification__window">
            <button
                class="notification__window__close-button"
                @click="closeModal"
            >
                X
            </button>
            <h1><slot name="message"></slot></h1>
            <slot name="buttonForArticleDelete"></slot>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        closeModal() {
            this.$emit("closeModal");
        },
    },
};
</script>

<style scoped>
.notification {
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
}
.notification__window {
    position: relative;
    width: 500px;
    height: 350px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.65) 0px 5px 15px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.notification__window .delete-button {
    background-color: rgb(199, 0, 0);
    border: none;
    border-radius: 5px;
    padding: 7px 15px;
    color: white;
    font-weight: bold;
}

.notification__window .delete-button:hover {
    background-color: rgb(140, 0, 0);
}

.notification__window__close-button {
    position: absolute;
    right: 15px;
    top: 15px;
    font-weight: bold;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid rgb(226, 226, 226);
    background-color: white;
}
.notification__window__close-button:hover {
    border: 1px solid white;
    background-color: rgb(226, 226, 226);
}
</style>
