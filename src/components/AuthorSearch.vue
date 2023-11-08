<template>
    <div
        class="field has-addons is-flex is-justify-content-center is-flex-direction-column"
    >
        <div class="is-flex is-justify-content-center">
            <div class="control">
                <input
                    class="input"
                    type="text"
                    placeholder="Find an author"
                    v-model="inputValue"
                    v-debounce:700ms="searchAuthor"
                />
            </div>
        </div>

        <h3 v-if="authorSearchInputValue" class="has-text-centered pt-4">
            Author(s) by search term "{{ authorSearchInputValue }}"
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
        ...mapActions(["getAuthorSearchInputValue", "updateAuthorsPage"]),
        async searchAuthor() {
            this.getAuthorSearchInputValue(this.inputValue);
            await this.updateAuthorsPage(1);
        },
    },
    computed: {
        ...mapGetters(["authorSearchInputValue"]),
    },
};
</script>
