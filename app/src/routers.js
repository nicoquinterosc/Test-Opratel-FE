import VueRouter from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import Menus from './components/Menus.vue';
import Users from './components/Users.vue';

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
    },
    {
        name: 'Menus',
        component: Menus,
        path: '/menus'
    },
    {
        name: 'Users',
        component: Users,
        path: '/users'
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
