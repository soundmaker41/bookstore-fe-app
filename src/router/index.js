import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import BookStoreBrowser from '../views/BookStoreBrowser.vue';
import BookDetails from '../views/BookDetails.vue';
import AddBook from '../views/AddBook.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/bookstore',
        name: 'BookStoreBrowser',
        component: BookStoreBrowser
    },
    {
        path: '/book-details/:id',
        name: 'BookDetails',
        component: BookDetails,
        props: true
    },
    {
        path: '/add-book',
        name: 'AddBook',
        component: AddBook
    },
    //redirect
    {
        path:'/browse-bookstore',
        redirect: '/bookstore'
    },
    //Catch All
    {
        path:'/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;