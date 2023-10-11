<template>
    <li>
        <h3>Title: {{ title }}</h3>
        <h3>Author: {{ author }}</h3>
        <h3>Date: {{ showCreatedOrEditedDate }}</h3>
    </li>
</template>

<script>
export default {
    props: ["title", "author", "createdDate", "updatedDate"],
    computed: {
        showCreatedOrEditedDate() {
            const date1 = new Date(this.createdDate).getTime();
            const date2 = new Date(this.updatedDate).getTime();

            if (date1 > date2) {
                return new Date(date1).toLocaleString("en-US").slice(0, 11);
            } else {
                return new Date(date2).toLocaleString("lt-LT").slice(0, 11);
            }
        },
    },
};
</script>

<style>
li {
    list-style: none;
    border: 1px solid black;
}
</style>
