import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import ("./views/Home.vue")
    },
    {
        path: "/articles",
        name: "articles",
        component:  () => import ("./components/ArticlesList.vue")
    },
    {
        path: "/articles/add",
        name: "add-articles",
        component: () => import ("./components/AddArticle.vue")
    },
    {
        alias: "/stagiaires",
        name: "stagiaires",
        component:  () => import ("./components/StagiaireList")
    },
    {
        path: "/stagiaires/add",
        name: "add-stagiaires",
        component:  () => import ("./components/AddStagiaire")
    },
    {
        alias: "/sessions",
        name: "sessions",
        component:  () => import ("./components/SessionsList")
    },
    {
        path: "/sessions/add",
        name: "add-sessions",
        component:  () => import ("./components/AddSession")
    }
];

const router = createRouter({ 
    history: createWebHistory(),
    routes
});

export default router;