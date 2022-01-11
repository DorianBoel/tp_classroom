<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="title">Prénom</label>
                <input
                type="text"
                class="form-control"
                id="prenom"
                required
                name="prenom"
                v-model="stagiaire.prenom"
                />
            </div>
            <div class="form-group">
                <label for="nom">Nom</label>
                <input
                class="form-control"
                id="nom"
                required
                name="nom"
                v-model="stagiaire.nom"
                />
            </div>
            <div class="form-group">
                <label for="born">Date de naissance</label>
                <input
                class="form-control"
                id="born"
                type="date"
                required
                name="born"
                v-model="stagiaire.born"
                />
            </div>
            <div class="form-group">
                <label for="image">Image</label>
                <input
                class="form-control"
                id="image"
                name="image"
                v-model="stagiaire.image"
                />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input
                class="form-control"
                id="email"
                type="email"
                name="email"
                v-model="stagiaire.email"
                />
            </div>
            <div class="form-group">
                <label for="discord">Discord</label>
                <input
                class="form-control"
                id="discord"
                name="discord"
                v-model="stagiaire.discord"
                />
            </div>
        <button class="btn btn-success" @click="saveStagiaire">Ajouter</button>
        </div>
        <div v-else>
            <h4>Profil de stagiare ajouté en BDD avec Succès</h4>
            <button class="btn btn-success" @click="newStagiaire">Ajouter un autre profil</button>
        </div>
    </div>
</template>

<script>
    import StagiaireDataService from '../services/StagiaireDataService';

    export default {
        name: "add-stagiaire",
        data() {
            return {
                stagiaire: {
                    prenom: "",
                    nom: "",
                    born:  "",
                    image: "",
                    email: "",
                    discord: ""
                },
                submitted: false,
            };
        },
        methods: {
            saveStagiaire() {
                let data = {
                    prenom: this.stagiaire.prenom,
                    nom: this.stagiaire.nom,
                    born:  this.stagiaire.born,
                    image: this.stagiaire.image,
                    email: this.stagiaire.email,
                    discord:this.stagiaire.discord
                };
                StagiaireDataService.create(data).then(
                    () => {
                        console.log("Stagiaire créé avec succès");
                        this.submitted = true;
                    }
                ).catch(
                    (error) => console.log(error)
                );
            },
            newStagiaire() {
                this.submitted = false;
                this.stagiaire = {
                    prenom: "",
                    nom: "",
                    born:  "",
                    image: "",
                    email: "",
                    discord: ""
                };
            }
        }
    }
</script>
