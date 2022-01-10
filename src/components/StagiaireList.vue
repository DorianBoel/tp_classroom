<template>
    <div class="list row">
        <div class="col-md-6">
            <h4>Liste des stagiares</h4>
            <ul class="list-group">
                <li
                class="list-group-item"
                :class="{ active: index == currentIndex }"
                v-for="(stagiaire, index) in stagiaires"
                :key="stagiaire"
                @click="setActiveStagiaire(stagiaire, index)"
                >
                    {{index}} {{ stagiaire.prenom }} {{ stagiaire.nom}}
                    <img :src="stagiaire.image" style="width: 120px; height: 120px; object-fit: cover; border-radius: 50%;">
                </li>
            </ul>
            <button class="m-3 btn btn-sm btn-danger" @click="removeAllStagiaires">
                Tout Supprimer
            </button>
        </div>
        <div class="col-md-6">
            <div v-if="currentStagiaire">
                <stagiaire-details :stagiaire="currentStagiaire" @refreshList="refreshList" />
            </div>
            <div v-else>
                <br>
                <p>Sélectionnez un profil...</p>
            </div>
        </div>
    </div>
</template>

<script>
    import StagiaireDataService from '../services/StagiaireDataService';
    import StagiaireDetails from './Stagiaire.vue';

    export default {
        name: "stagiaires-list",
        components: { StagiaireDetails },
        data() {
            return {
                stagiaires: [],
                currentStagiaire: null,
                currentIndex: -1
            };
        },
        methods: {
            onDataChange(items) {
                let _stagiaires = [];
                items.forEach(
                    (item) => {
                        let key = item.key;
                        let data = item.val();
                        _stagiaires.push({
                            key: key,
                            prenom: data.prenom,
                            nom: data.nom,
                            born:  data.born,
                            image: data.image,
                            email: data.email,
                            discord: data.discord
                        });
                    } 
                );
                this.stagiaires = _stagiaires;
            },
            refreshList() {
                this.currentStagiaire = null;
                this.currentIndex = -1; 
            },
            setActiveStagiaire(stagiaire, index) {
                this.currentStagiaire = stagiaire;
                this.currentIndex = index;
            },
            removeAllStagiaires() {
                StagiaireDataService.deleteAll().then(
                    () => this.refreshList()
                ).catch(
                    (error) => console.log(error)
                );
            }
            
        },
        mounted() {
            StagiaireDataService.getAll().on("value", this.onDataChange);
        },
        beforeUnmount() {
            StagiaireDataService.getAll().off("value", this.onDataChange);
        }
    }
    
</script>
