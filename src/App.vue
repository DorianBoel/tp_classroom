<template>
    <div id="app">
        <nav class="navbar navbar-expand navbar-dark bg-primary">
        <router-link to="/" class="navbar-brand">Le super BLOG</router-link>
        <div class="navbar-nav mr-auto">
            <li class="nav-item">
                <router-link to="/articles" class="nav-link">Articles</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/stagiaires" class="nav-link">Stagiaires</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/sessions" class="nav-link">Session</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/articles/add" class="nav-link">Ajouter article</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/stagiaires/add" class="nav-link">Ajouter stagiaire</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/sessions/add" class="nav-link">Ajouter session</router-link>
            </li>
        </div>
        </nav>
        <div class="container mt-3">
        <h2>Vue + Firebase</h2>
        <router-view />
        </div>
    </div>
</template>

<script>
export default {
    name: "app"
};
</script>

<style scoped>
.container h2 {
    text-align: center;
    margin: 25px auto; 
}
</style>
