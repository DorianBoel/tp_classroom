<template>
    <div  class="edit-form" v-if="currentSession">
        <h4>Session</h4>
        <form>
            <div class="form-group">
                <label for="nom">Nom de la session</label>
                <input
                    type="text"
                    class="form-control"
                    id="nom"
                    v-model="currentSession.nom"
                />
            </div>
            <div class="form-group">
                <label for="nbStagiaires">nbStagiaires</label>
                <input
                    type="number"
                    class="form-control"
                    id="nbStagiaires"
                    v-model="currentSession.nbStagiaires"
                />
            </div>
            <div class="form-group">
                <label for="dateDebut">Date de début de la session</label>
                <input
                    type="date"
                    class="form-control"
                    id="dateDebut"
                    v-model="currentSession.dateDebut"
                />
            </div>
            <div class="form-group">
                <label for="dateFin">Date de fin de la session</label>
                <input
                    type="date"
                    class="form-control"
                    id="dateFin"
                    v-model="currentSession.dateFin"
                />
            </div>
            <div class="form-group">
                <label for="blason">Image du blason</label>
                <input
                    type="blason"
                    class="form-control"
                    id="blason"
                    v-model="currentSession.blason"
                />
            </div>
            <div class="form-group">
                <label><strong>Status: {{currentSession.published ? "publié" : "en attente"}}</strong></label>
            </div>
        </form>
        <button class="badge badge-danger mr-2" @click="deleteSession">
            Delete
        </button>
        <button type="submit" class="badge badge-success" @click="updateSession">
            Update
        </button>
        <p>{{message}}</p>
    </div>
    <div v-else>
        <br>
        <p>Cliquez sur un session Por Favor</p>
    </div>
</template>

<script>
    import SessionDataService from '../services/SessionDataService';

    export default {
        name: "session",
        props: ["session"],
        data() {
            return {
                currentSession: null,
                message: "",
            };
        },
        watch: {
            session: function(session) {
                this.currentSession = { ...session };
                this.message = "";
            }
        },
        methods: { 
            updatePublished(status) {
                SessionDataService.update(this.currentSession.key, { published: status }).then(
                    () => {
                        this.currentSession.published = status;
                        this.message = "Le status a bien été MÀJ."
                    }
                ).catch(
                    (error) => console.log(error)
                );
            },
            updateSession() {
                const data = {
                    nom: this.currentSession.nom,
                    nbStagiaires: this.currentSession.nbStagiaires,
                    dateDebut: this.currentSession.dateDebut,
                    dateFin: this.currentSession.dateFin,
                    blason: this.currentSession.blason
                };
                SessionDataService.update(this.currentSession.key, data).then(
                    () => {
                        this.message = "La session a bien été MÀJ.";
                    }
                ).catch(
                    (error) => console.log(error)
                );
            },
            deleteSession() {
                SessionDataService.delete(this.currentSession.key).then(
                    () => this.$emit("refreshList")
                ).catch(
                    (error) => console.log(error)
                );
            }
        },
        mounted() {
            this.message = "";
            this.currentSession = {...this.session};
        }
    }
</script>