<template>
    <div class="notification">
        <div class="notification__window">
            <button
                class="notification__window__close-button"
                @click="closeModal"
            >
                X
            </button>
            <h1>
                Are you sure that you want to delete "<slot></slot>" article?
            </h1>
            <article-delete-button
                @click.native="deleteArticle(id)"
            ></article-delete-button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["id"],
    methods: {
        closeModal() {
            this.$emit("closeModal");
        },
        deleteArticle(id) {
            this.$store.dispatch("deleteArticleAction", id);
            this.$store.dispatch("fetchArticlesData");

            if (this.$router.currentRoute.fullPath !== "/") {
                this.$router.push({ path: "/" });
            }
            const successNotification = {
                type: "success",
                message: "You have successfully deleted the article",
            };
            this.$store.dispatch("notificationAction", successNotification);
        },
    },
    computed: {},
};
</script>

<style scoped>
.notification {
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
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
    padding: 0 30px;
}
.notification__window h1 {
    margin: 40px 0;
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
