<template>
    <div class="list row">
        <div class="col-md-6">
            <h4>Articles List</h4>
            <ul class="list-group">
                <li
                class="list-group-item"
                :class="{ active: index == currentIndex }"
                v-for="(article, index) in articles"
                :key="index"
                @click="setActiveArticle(article, index)"
                >
                    {{ article.title }}
                </li>
            </ul>
            <button class="m-3 btn btn-sm btn-danger" @click="removeAllArticles">
                Tout Supprimer
            </button>
        </div>
        <div class="col-md-6">
            <div v-if="currentArticle">
                <article-details :article="currentArticle" @refreshList="refreshList" />
            </div>
            <div v-else>
                <br>
                <p>Veuillez choisir un Article...</p>
            </div>
        </div>
    </div>
</template>

<script>
    import ArticleDataService from '../services/ArticleDataService';
    import ArticleDetails from './Article.vue';

    export default {
        name: "articles-list",
        components: { ArticleDetails },
        data() {
            return {
                articles: [],
                currentArticle: null,
                currentIndex: -1
            };
        },
        methods: {
            onDataChange(items) {
                let _articles = [];
                items.forEach(
                    (item) => {
                        let key = item.key;
                        let data = item.val();
                        _articles.push({
                            key: key,
                            title: data.title,
                            description: data.description,
                            published: data.published
                        });
                    } 
                );
                this.articles = _articles;
            },
            refreshList() {
                this.currentArticle = null;
                this.currentIndex = -1; 
            },
            setActiveArticle(article, index) {
                this.currentArticle = article;
                this.currentIndex = index;
            },
            removeAllArticles() {
                ArticleDataService.deleteAll().then(
                    () => this.refreshList()
                ).catch(
                    (error) => console.log(error)
                );
            }
            
        },
        mounted() {
            ArticleDataService.getAll().on("value", this.onDataChange);
        },
        beforeUnmount() {
            ArticleDataService.getAll().off("value", this.onDataChange);
        }
    }
    
</script>
