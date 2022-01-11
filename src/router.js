import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        alias: "/article",
        name: "articles",
        component: () => import ("./components/ArticlesList")
    },
    {
        path: "/add/article",
        name: "add-articles",
        component:  () => import ("./components/AddArticle")
    },
    {
        path: "/",
        alias: "/stagiaires",
        name: "stagiaires",
        component:  () => import ("./components/StagiaireList")
    },
    {
        path: "/add/stagiaires",
        name: "add-stagiaires",
        component:  () => import ("./components/AddStagiaire")
    },
    {
        path: "/add/session",
        name: "add-session",
        component:  () => import ("./components/AddSession")
    },

];

const router = createRouter({ 
    history: createWebHistory(),
    routes
});

export default router;
