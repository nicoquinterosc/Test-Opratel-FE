<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark fixed-top">
        <div class="container">
            <router-link to="/" class="navbar-brand">Home</router-link>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto" v-if="!firstName">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Menus</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Users</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link">Login</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto" v-if="firstName">
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link">Menus</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Users</router-link>
                    </li>
                    <li class="nav-item">
                        <a href="/login" v-on:click="handleClick" to="/" class="nav-link">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    name: 'Nav',
    methods: {
        handleClick() {
            localStorage.removeItem('token');
            this.$store.dispatch('firstName', null);
            this.$store.dispatch('lastName', null);
            this.$router.push('/');
        }
    },
    computed: {
        ...mapGetters(['firstName', 'lastName'])
    }
}
</script>