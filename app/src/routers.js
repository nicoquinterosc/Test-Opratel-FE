import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/Login.vue';

const routes = [
    {
        name: 'Home',
        component: Home,
        path: '/'
    },
    {
        name: 'Login',
        component: Login,
        path: '/login'
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
