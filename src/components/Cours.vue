<template>
    <div  class="edit-form" v-if="currentCours">
        <h4>Cours</h4>
        <form>
            <div class="form-group">
                <label for="image">Image du cours</label>
                <input
                    type="text"
                    class="form-control"
                    id="image"
                    v-model="currentCours.image"
                />
            </div>
            <div class="form-group">
                <label for="codeSource">Demo</label>
                <input
                    type="text"
                    class="form-control"
                    id="codeSource"
                    v-model="currentCours.codeSource"
                />
            </div>
            <div class="form-group">
                <label for="texte">Contenu du cours</label>
                <input
                    type="text"
                    class="form-control"
                    id="texte"
                    v-model="currentCours.texte"
                />
            </div>
            <div class="form-group">
                <label for="author">Auteur</label>
                <input
                    type="text"
                    class="form-control"
                    id="author"
                    v-model="currentCours.author"
                />
            </div>
            <div class="form-group">
                <label for="categorie">Categorie</label>
                <input
                    type="text"
                    class="form-control"
                    id="categorie"
                    v-model="currentCours.categorie"
                />
            </div>
        </form>
        <button class="badge badge-danger mr-2" @click="deleteCours">
            Delete
        </button>
        <button type="submit" class="badge badge-success" @click="updateCours">
            Update
        </button>
        <p>{{message}}</p>
    </div>
    <div v-else>
        <br>
        <p>Cliquez sur un cours Por Favor</p>
    </div>
</template>

<script>
    import CoursDataService from '../services/CoursDataService';

    export default {
        name: "cours",
        props: ["cours"],
        data() {
            return {
                currentCours: null,
                message: "",
            };
        },
        watch: {
            cours: function(cours) {
                this.currentCours = { ...cours };
                this.message = "";
            }
        },
        methods: { 
            updateCours() {
                const data = {
                    image: this.currentCours.image,
                    codeSource: this.currentCours.codeSource,
                    texte: this.currentCours.texte,
                    author: this.currentCours.author,
                    categorie: this.currentCours.categorie
                };
                CoursDataService.update(this.currentCours.key, data).then(
                    () => {
                        this.message = "La cours a bien été MÀJ.";
                    }
                ).catch(
                    (error) => console.log(error)
                );
            },
            deleteCours() {
                CoursDataService.delete(this.currentCours.key).then(
                    () => this.$emit("refreshList")
                ).catch(
                    (error) => console.log(error)
                );
            }
        },
        mounted() {
            this.message = "";
            this.currentCours = {...this.cours};
        }
    }
</script>