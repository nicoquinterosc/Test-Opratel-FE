<template>
    <div id="app">
        <div class="container">
            <div class="list">
                <h3 v-if="firstName">Welcome, {{ firstName }} {{ lastName }}</h3>
                <h3 v-if="!firstName">You are not logged in!</h3>
                <br>
                <h4>Menus</h4>
                <br>
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Filter menu" aria-label="Filter menu"
                        aria-describedby="basic-addon2" v-model="filter">
                    <div class="input-group-append">
                        <button @click="getMenus(filter)" class="btn btn-outline-secondary" type="button">Filter</button>
                    </div>
                </div>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Parent ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(menu, i) in menus" :key="i">
                            <th scope="row">{{ menu.id }}</th>
                            <td>{{ menu.name }}</td>
                            <td>{{ menu.parentId }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
    name: 'Home',
    data() {
        return {
            menus: null,
            filter: ''
        }
    },
    computed: {
        ...mapGetters(['firstName', 'lastName'])
    },
    methods: {
        async getMenus(filter) {
            let url = '';
            if (filter) {
                url = `menus/all?filter=${filter}`;
            } else {
                url = 'menus/all';
            }
            try {
                const response = await axios.get(url);
                this.menus = response.data.menus;
            } catch (e) {
                console.error(`Error to fetch: ${e.message}`)
            }
        },
    },
    async created() {
        this.getMenus();
    }
}
</script>

<style>
.container {
    padding-top: 2%;
}

.nav-link {
    color: white;
}

h2,
h6 {
    text-align: left;
}

.list h3 {
    text-align: left;
}
</style>