<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="image">Image</label>
                <input
                type="text"
                class="form-control"
                id="image"
                required
                name="image"
                v-model="cours.image"
                />
            </div>
            <div class="form-group">
                <label for="codeSource">Demo</label>
                <input
                class="form-control"
                id="codeSource"
                required
                name="codeSource"
                v-model="cours.codeSource"
                />
            </div>
            <div class="form-group">
                <label for="texte">Texte</label>
                <input
                class="form-control"
                id="texte"
                required
                name="texte"
                v-model="cours.texte"
                />
            </div>
            <div class="form-group">
                <label for="author">Auteur</label>
                <input
                class="form-control"
                id="author"
                required
                name="author"
                v-model="cours.author"
                />
            </div>
            <div class="form-group">
                <label for="categorie">Catégorie</label>
                <input
                class="form-control"
                id="categorie"
                required
                name="categorie"
                v-model="cours.categorie"
                />
            </div>
        <button class="btn btn-success" @click="saveCours">Ajouter</button>
        </div>
        <div v-else>
            <h4>Cours ajouté en BDD avec Succès</h4>
            <button class="btn btn-success" @click="newCours">Add</button>
        </div>
    </div>
</template>

<script>
    import CoursDataService from '../services/CoursDataService';

    export default {
        name: "add-cours",
        data() {
            return {
                cours: {
                    image: "",
                    codeSource: "",
                    texte: "",
                    author: "",
                    categorie: ""
                },
                submitted: false,
            };
        },
        methods: {
            saveCours() {
                let data = {
                    image: this.cours.image,
                    codeSource: this.cours.codeSource,
                    texte: this.cours.texte,
                    author: this.cours.author,
                    categorie: this.cours.categorie
                };
                CoursDataService.create(data).then(
                    () => {
                        console.log("Cours créé avec succès");
                        this.submitted = true;
                    }
                ).catch(
                    (error) => console.log(error)
                );
            },
            newCours() {
                this.submitted = false;
                this.cours = {
                    image: "",
                    codeSource: "",
                    texte: "",
                    author: "",
                    categorie: ""
                };
            }
        }
    }
</script>
