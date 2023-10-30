<template>
    <div
        class="field has-addons is-flex is-justify-content-center is-flex-direction-column"
    >
        <div class="is-flex is-justify-content-center">
            <div class="control">
                <input
                    class="input"
                    type="text"
                    placeholder="Find a article"
                    v-model="inputValue"
                />
            </div>
            <div class="control" @click="searchArticle">
                <a class="button is-info"> Search </a>
            </div>
        </div>

        <h3 v-if="searchInputValue" class="has-text-centered pt-4">
            Article(s) by search term "{{ searchInputValue }}"
        </h3>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    data() {
        return {
            inputValue: "",
        };
    },
    methods: {
        ...mapActions(["getSearchInputValue", "updatePage"]),
        async searchArticle() {
            this.getSearchInputValue(this.inputValue);
            await this.updatePage(1);
        },
    },
    computed: {
        ...mapGetters(["searchInputValue"]),
    },
};
</script>
