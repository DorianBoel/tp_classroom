<template>
    <div  class="edit-form" v-if="currentStagiaire">
        <h4>Stagiaire</h4>
        <form>
            <div class="form-group">
                <label for="title">Prénom</label>
                <input
                type="text"
                class="form-control"
                id="prenom"
                v-model="currentStagiaire.prenom"
                />
            </div>
            <div class="form-group">
                <label for="nom">Nom</label>
                <input
                class="form-control"
                id="nom"
                v-model="currentStagiaire.nom"
                />
            </div>
            <div class="form-group">
                <label for="born">Date de naissance</label>
                <input
                class="form-control"
                id="born"
                type="date"
                
                name="born"
                v-model="currentStagiaire.born"
                />
            </div>
            <div class="form-group">
                <label for="image">Image</label>
                <input
                class="form-control"
                id="image"
                v-model="currentStagiaire.image"
                />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input
                class="form-control"
                id="email"
                type="email"
                v-model="currentStagiaire.email"
                />
            </div>
            <div class="form-group">
                <label for="discord">Discord</label>
                <input
                class="form-control"
                id="discord"
                v-model="currentStagiaire.discord"
                />
            </div>
            <!-- <div class="form-group">
                <label><strong>Status: {{currentStagiaire.published ? "publié" : "en attente"}}</strong></label>
            </div> -->
        </form>
        <!-- <button class="badge badge-primary mr-2" v-if="currentStagiaire.published" @click="updatePublished(false)">
            Dépublier
        </button>
        <button class="badge badge-primary mr-2" v-else @click="updatePublished(true)">
            Publier
        </button> -->
        <button class="badge badge-danger mr-2" @click="deleteStagiaire">
            Supprimer
        </button>
        <button type="submit" class="badge badge-success" @click="updateStagiaire">
            Mettre à jour
        </button>
        <p>{{message}}</p>
    </div>
    <div v-else>
        <br>
        <p>Cliquez sur un Stagiaire Por Favor</p>
    </div>
</template>

<script>
    import StagiaireDataService from '../services/StagiaireDataService';

    export default {
        name: "stagiaire",
        props: ["stagiaire"],
        data() {
            return {
                currentStagiaire: null,
                message: "",
            };
        },
        watch: {
            stagiaire: function(stagiaire) {
                this.currentStagiaire = { ...stagiaire };
                this.message = "";
            }
        },
        methods: { 
            updatePublished(status) {
                StagiaireDataService.update(this.currentStagiaire.key, { published: status }).then(
                    () => {
                        this.currentStagiaire.published = status;
                        this.message = "Le status a bien été MÀJ."
                    }
                ).catch(
                    (error) => console.log(error)
                );
            },
            updateStagiaire() {
                const data = {
                    prenom: this.currentStagiaire.prenom,
                    nom: this.currentStagiaire.nom,
                    born:  this.currentStagiaire.born,
                    image: this.currentStagiaire.image,
                    email: this.currentStagiaire.email,
                    discord:this.currentStagiaire.discord
                };
                StagiaireDataService.update(this.currentStagiaire.key, data).then(
                    () => {
                        this.message = "L'Stagiaire a bien été MÀJ.";
                    }
                ).catch(
                    (error) => console.log(error)
                );
            },
            deleteStagiaire() {
                StagiaireDataService.delete(this.currentStagiaire.key).then(
                    () => this.$emit("refreshList")
                ).catch(
                    (error) => console.log(error)
                );
            }
        },
        mounted() {
            this.message = "";
            this.currentStagiaire = {...this.Stag};
        }
    }
</script>