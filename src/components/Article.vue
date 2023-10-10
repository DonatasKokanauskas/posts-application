<template>
    <div>
        <h3>Title: {{ title }}</h3>
        <h3>Author: {{ author }}</h3>
        <h3>Date: {{ showCreatedOrEditedDate }}</h3>
    </div>
</template>

<script>
export default {
    props: ["title", "author", "createdDate", "updatedDate"],
    computed: {
        showCreatedOrEditedDate() {
            const date1 = new Date(this.createdDate).getTime();
            const date2 = new Date(this.createdDate).getTime();

            if (date1 > date2) {
                return date1;
            } else {
                return date2;
            }
        },
    },
};
</script>
