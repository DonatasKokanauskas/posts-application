<template>
    <div class="field has-addons is-flex is-justify-content-center">
        <div class="control">
            <input
                class="input"
                type="text"
                placeholder="Find a article"
                v-model="searchInputValue"
            />
        </div>
        <div class="control">
            <a class="button is-info"> Search </a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchInputValue: "",
        };
    },
};
</script>
