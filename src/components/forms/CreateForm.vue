<template>
    <form class="column is-full" @submit.prevent="submitForm">
        <h1 class="title is-4 has-text-centered">Create a new article</h1>
        <div class="field">
            <label class="label">Title</label>
            <div class="control">
                <input
                    class="input"
                    type="text"
                    placeholder="Text input"
                    v-model="title"
                />
            </div>
        </div>

        <div class="field">
            <label class="label">Authors</label>
            <div class="control">
                <div class="select">
                    <select name="author" id="author" v-model="author">
                        <option disabled value="">Please select one</option>
                        <option
                            v-for="author in allAuthors"
                            :key="author.id"
                            :value="author.id"
                        >
                            {{ author.name }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <div class="field">
            <label class="label">Content</label>
            <div class="control">
                <textarea
                    class="textarea"
                    placeholder="Textarea"
                    v-model="content"
                ></textarea>
            </div>
        </div>
        <button class="button is-success is-light">Submit</button>
        <p v-if="errors.length" class="pt-5 is-flex is-flex-direction-column is-align-items-center">
            <b class="has-text-danger">Please correct the following error(s):</b>
            <ul>
            <li v-for="error in errors" :key="error" class="has-text-danger">{{ error }}</li>
            </ul>
        </p>
    </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            title: "",
            author: "",
            content: "",
            errors: [],
        };
    },
    methods: {
        ...mapActions([
            "postNewArticle",
            "fetchArticlesData",
            "closeModalAction",
        ]),
        async submitForm() {
    this.errors = [];

           if (!this.title.trim()) {
            this.errors.push("The title field is empty.")
           }

           if (this.title.trim().length > 50) {
            this.errors.push("The title must not exceed 50 characters.")
           }

           if (!this.author) {
            this.errors.push("Author is not selected.")
           }

           if (!this.content.trim()) {
            this.errors.push("The content field is empty.")
           }

           if(this.errors.length > 0) {
            return
           }

            const newArticle = {
                id: Date.now(),
                title: this.title,
                body: this.content,
                authorId: this.author,
                created_at: new Date().toLocaleString("lt-LT").slice(0, 11),
                updated_at: new Date().toLocaleString("lt-LT").slice(0, 11),
                author: this.allAuthors.find((author) => author.id === this.author)
            };
            await this.postNewArticle(newArticle);
            this.closeModalAction();
            
         

        },
    },
    computed: {
        ...mapGetters(["allAuthors"]),
    },
};
</script>
