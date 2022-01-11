<template>
    <div class="list row">
        <div class="col-md-6">
            <h4>Session List</h4>
            <ul class="list-group">
                <li
                class="list-group-item"
                :class="{ active: index == currentIndex }"
                v-for="(session, index) in sessions"
                :key="index"
                @click="setActiveSession(session, index)"
                >
                    <img :src="session.blason" class="img-fluid mb-3 img-thumbnail">
                    {{ session.nom }} 
                    <small>{{ session.nbStagiaires }} stagiaires inscrits</small>
                    
                </li>
            </ul>
            <button class="m-3 btn btn-sm btn-danger" @click="removeAllSessions">
                Tout Supprimer
            </button>
        </div>
        <div class="col-md-6">
            <div v-if="currentSession">
                <session-details :session="currentSession" @refreshList="refreshList" />
            </div>
            <div v-else>
                <br>
                <p>Veuillez choisir une Session...</p>
            </div>
        </div>
    </div>
</template>

<script>
    import SessionDataService from '../services/SessionDataService';
    import SessionDetails from './Session.vue';

    export default {
        name: "sessions-list",
        components: { SessionDetails },
        data() {
            return {
                sessions: [],
                currentSession: null,
                currentIndex: -1
            };
        },
        methods: {
            onDataChange(items) {
                let _sessions = [];
                items.forEach(
                    (item) => {
                        let key = item.key;
                        let data = item.val();
                        _sessions.push({
                            key: key,
                            nom: data.nom,
                            nbStagiaires: data.nbStagiaires,
                            dateDebut: data.dateDebut,
                            dateFin: data.dateFin,
                            blason: data.blason
                        });
                    } 
                );
                this.sessions = _sessions;
            },
            refreshList() {
                this.currentSession = null;
                this.currentIndex = -1; 
            },
            setActiveSession(session, index) {
                this.currentSession = session;
                this.currentIndex = index;
            },
            removeAllSessions() {
                SessionDataService.deleteAll().then(
                    () => this.refreshList()
                ).catch(
                    (error) => console.log(error)
                );
            }
            
        },
        mounted() {
            SessionDataService.getAll().on("value", this.onDataChange);
        },
        beforeUnmount() {
            SessionDataService.getAll().off("value", this.onDataChange);
        }
    }
</script>
