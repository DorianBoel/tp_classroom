<template>
    <div class="list row">
        <div class="col-md-6">
            <h4>Liste des stagiares</h4>
                <div class="container">
                    <div class="row text-center">
                                <!-- {{index}} {{ stagiaire.prenom }} {{ stagiaire.nom}}
                                <img :src="stagiaire.image" style="width: 120px; height: 120px; object-fit: cover; border-radius: 50%;"> -->
                        <div class="col-xl-6 col-sm-6 mb-5" :class="{ active: index == currentIndex }"
                        v-for="(stagiaire, index) in stagiaires"
                        :key="stagiaire"
                        @click="setActiveStagiaire(stagiaire, index)">
                            <div class="bg-white rounded shadow-sm py-5 px-4"><img :src="stagiaire.image" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
                                <h5 class="mb-0">{{index}} - {{stagiaire.prenom}} {{stagiaire.nom}}</h5><span class="small text-lowercase text-muted">{{stagiaire.email}}</span>
                                <ul class="social mb-0 list-inline mt-3">
                                    <li class="list-inline-item"><a :href="stagiaire.discord" class="social-link"><img src="../../public/img/discord-brands.svg"></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
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
