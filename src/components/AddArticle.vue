<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="title">Titre</label>
                <input
                type="text"
                class="form-control"
                id="title"
                required
                name="title"
                v-model="article.title"
                />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input
                class="form-control"
                id="description"
                required
                name="description"
                v-model="article.description"
                />
            </div>
            <div class="form-group">
                <label for="image">Image</label>
                <input
                class="form-control"
                id="image"
                required
                name="image"
                v-model="article.image"
                />
            </div>
            <div class="form-group">
                <label for="author">Auteur</label>
                <input
                class="form-control"
                id="author"
                required
                name="author"
                v-model="article.author"
                />
            </div>
        <button class="btn btn-success" @click="saveArticle">Ajouter</button>
        </div>
        <div v-else>
            <h4>Article ajouté en BDD avec Succès</h4>
            <button class="btn btn-success" @click="newArticle">Add</button>
        </div>
    </div>
</template>

<script>
    import ArticleDataService from '../services/ArticleDataService';

    export default {
        name: "add-article",
        data() {
            return {
                article: {
                    title: "",
                    description: "",
                    image: "",
                    author: "",
                    published:  false
                },
                submitted: false,
            };
        },
        methods: {
            saveArticle() {
                let data = {
                    title: this.article.title,
                    description: this.article.description,
                    image: this.article.image,
                    author: this.article.author,
                    date: new Date(Date.now()).toLocaleDateString(),
                    published: false
                };
                ArticleDataService.create(data).then(
                    () => {
                        console.log("Article créé avec succès");
                        this.submitted = true;
                    }
                ).catch(
                    (error) => console.log(error)
                );
            },
            newArticle() {
                this.submitted = false;
                this.article = {
                    title: "",
                    description: "",
                    published: false
                };
            }
        }
    }
</script>
