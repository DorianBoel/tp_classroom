<template>
    <div  class="edit-form" v-if="currentArticle">
        <h4>Article</h4>
        <form>
            <div class="form-group">
                <label for="title">Titre</label>
                <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="currentArticle.title"
                />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input
                    type="text"
                    class="form-control"
                    id="description"
                    v-model="currentArticle.description"
                />
            </div>
            <div class="form-group">
                <label><strong>Status: {{currentArticle.published ? "publié" : "en attente"}}</strong></label>
            </div>
        </form>
        <button class="badge badge-primary mr-2" v-if="currentArticle.published" @click="updatePublished(false)">
            Dépublier
        </button>
        <button class="badge badge-primary mr-2" v-else @click="updatePublished(true)">
            Publier
        </button>
        <button class="badge badge-danger mr-2" @click="deleteArticle">
            Delete
        </button>
        <button type="submit" class="badge badge-success" @click="updateArticle">
            Update
        </button>
        <p>{{message}}</p>
    </div>
    <div v-else>
        <br>
        <p>Cliquez sur un article Por Favor</p>
    </div>
</template>

<script>
    import ArticleDataService from '../services/ArticleDataService';

    export default {
        name: "article",
        props: ["article"],
        data() {
            return {
                currentArticle: null,
                message: "",
            };
        },
        watch: {
            article: function(article) {
                this.currentArticle = { ...article };
                this.message = "";
            }
        },
        methods: { 
            updatePublished(status) {
                ArticleDataService.update(this.currentArticle.key, { published: status }).then(
                    () => {
                        this.currentArticle.published = status;
                        this.message = "Le status a bien été MÀJ."
                    }
                ).catch(
                    (error) => console.log(error)
                );
            },
            updateArticle() {
                const data = {
                    title: this.currentArticle.title,
                    description: this.currentArticle.description
                };
                ArticleDataService.update(this.currentArticle.key, data).then(
                    () => {
                        this.message = "L'article a bien été MÀJ.";
                    }
                ).catch(
                    (error) => console.log(error)
                );
            },
            deleteArticle() {
                ArticleDataService.delete(this.currentArticle.key).then(
                    () => this.$emit("refreshList")
                ).catch(
                    (error) => console.log(error)
                );
            }
        },
        mounted() {
            this.message = "";
            this.currentArticle = {...this.article};
        }
    }
</script>