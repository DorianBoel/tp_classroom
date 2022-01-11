<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="title">Nom</label>
                <input
                type="text"
                class="form-control"
                id="nom"
                required
                name="nom"
                v-model="session.nom"
                />
            </div>
            <div class="form-group">
                <label for="nbStagiaires">Nombre de stagiaires</label>
                <input
                type="number"
                class="form-control"
                id="nbStagiaires"
                required
                name="nbStagiaires"
                v-model="session.nbStagiaires"
                />
            </div>
            <div class="form-group">
                <label for="dateDebut">Date de début</label>
                <input
                class="form-control"
                id="dateDebut"
                type="date"
                required
                name="dateDebut"
                v-model="session.dateDebut"
                />
            </div>
            <div class="form-group">
                <label for="dateFin">Date de fin</label>
                <input
                class="form-control"
                id="dateFin"
                type="date"
                required
                name="dateFin"
                v-model="session.dateFin"
                />
            </div>
            <div class="form-group">
                <label for="blason">Image du blason</label>
                <input
                class="form-control"
                id="blason"
                type="text"
                name="blason"
                v-model="session.blason"
                />
            </div>
        <button class="btn btn-success" @click="saveSession">Ajouter</button>
        </div>
        <div v-else>
            <h4>Session ajoutée en BDD avec Succès</h4>
            <button class="btn btn-success" @click="newSession">Ajouter une autre session</button>
        </div>
    </div>
</template>

<script>
    import SessionDataService from '../services/SessionDataService';

    export default {
        name: "add-session",
        data() {
            return {
                session: {
                    nom: "",
                    nbStagiaires: "",
                    dateDebut:  "",
                    dateFin: "",
                    blason: ""
                },
                submitted: false,
            };
        },
        methods: {
            saveSession() {
                let data = {
                    nom: this.session.nom,
                    nbStagiaires: this.session.nbStagiaires,
                    dateDebut:  this.session.dateDebut,
                    dateFin: this.session.dateFin,
                    blason: this.session.blason
                };
                SessionDataService.create(data).then(
                    () => {
                        console.log("Session créée avec succès");
                        this.submitted = true;
                    }
                ).catch(
                    (error) => console.log(error)
                );
            },
            newSession() {
                this.submitted = false;
                this.session = {
                    nom: "",
                    nbStagiaires: "",
                    dateDebut:  "",
                    dateFin: "",
                    blason: ""
                };
            }
        }
    }
</script>
