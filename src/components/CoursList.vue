<template>
    <div class="list row">
        <div class="col-md-6">
            <h4>Cours List</h4>
            <ul class="list-group">
                <li
                class="list-group-item"
                :class="{ active: index == currentIndex }"
                v-for="(cours, index) in listeCours"
                :key="index"
                @click="setActiveCours(cours, index)"
                >
                    <img :src="cours.image" class="img-fluid mb-3 img-thumbnail">
                    {{ cours.texte }}
                    <iframe height="300" style="width: 100%;" scrolling="no" title="Skeuomorphic Buttons (Realistic 3D effect)" :src="cours.codeSource" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true"></iframe>
                    <small>{{ cours.categorie }}</small><br>
                    <small>{{ cours.author }}</small>
                </li>
            </ul>
            <button class="m-3 btn btn-sm btn-danger" @click="removeAllCours">
                Tout Supprimer
            </button>
        </div>
        <div class="col-md-6">
            <div v-if="currentCours">
                <cours-details :cours="currentCours" @refreshList="refreshList" />
            </div>
            <div v-else>
                <br>
                <p>Veuillez choisir un Cours...</p>
            </div>
        </div>
    </div>
</template>

<script>
    import CoursDataService from '../services/CoursDataService';
    import CoursDetails from './Cours.vue';

    export default {
        name: "listeCours-list",
        components: { CoursDetails },
        data() {
            return {
                listeCours: [],
                currentCours: null,
                currentIndex: -1
            };
        },
        methods: {
            onDataChange(items) {
                let _cours = [];
                items.forEach(
                    (item) => {
                        let key = item.key;
                        let data = item.val();
                        _cours.push({
                            key: key,
                            image: data.image,
                            codeSource: data.codeSource,
                            texte: data.texte,
                            author: data.author,
                            categorie: data.categorie
                        });
                    } 
                );
                this.listeCours = _cours;
            },
            refreshList() {
                this.currentCours = null;
                this.currentIndex = -1; 
            },
            setActiveCours(cours, index) {
                this.currentCours = cours;
                this.currentIndex = index;
            },
            removeAllCours() {
                CoursDataService.deleteAll().then(
                    () => this.refreshList()
                ).catch(
                    (error) => console.log(error)
                );
            }
            
        },
        mounted() {
            CoursDataService.getAll().on("value", this.onDataChange);
        },
        beforeUnmount() {
            CoursDataService.getAll().off("value", this.onDataChange);
        }
    }
</script>
